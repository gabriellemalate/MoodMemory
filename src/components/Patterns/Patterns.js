import React, { useState, useEffect } from 'react';
import './Patterns.scss';
import { db, auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, where, getDocs  } from 'firebase/firestore';

function Patterns() {
    const [user] = useAuthState(auth);
    const [elevationCount, setElevationCount] = useState(0);
    const [depressionCount, setDepressionCount] = useState(0);
    const [currentUserUid, setCurrentUserUid] = useState(null);

    // useEffect(() => {
    //     const fetchMoodLogs = async () => {
    //         try {
    //             const q = query(collection(db, 'moodlogs'), where('uid', '==', currentUserUid));
    //             const moodLogsSnapshot = await getDocs(q);
    //             const moodLogs = moodLogsSnapshot.docs.map(doc => doc.data());

    //             // if (moodLogs.length < 12) {
    //             //     setElevationCount('Not enough data');
    //             //     setDepressionCount('Not enough data');
    //             //     return;
    //             // }

    //             let consecutiveElevationCount = 0;
    //             let consecutiveDepressionCount = 0;
    //             let prevLogState = null;

    //             moodLogs.forEach(log => {
    //                 if (log.state === 'Elevated') {
    //                     if (prevLogState === 'Elevated') {
    //                         consecutiveElevationCount++;
    //                     } else {
    //                         consecutiveElevationCount = 1;
    //                     }
    //                     prevLogState = 'Elevated';
    //                 } else if (log.state === 'Depressed') {
    //                     if (prevLogState === 'Depressed') {
    //                         consecutiveDepressionCount++;
    //                     } else {
    //                         consecutiveDepressionCount = 1;
    //                     }
    //                     prevLogState = 'Depressed';
    //                 } else {
    //                     consecutiveElevationCount = 0;
    //                     consecutiveDepressionCount = 0;
    //                     prevLogState = null;
    //                 }
    //             });

    //             setElevationCount(consecutiveElevationCount);
    //             setDepressionCount(consecutiveDepressionCount);
    //         } catch (error) {
    //             console.error('Error fetching mood logs:', error);
    //         }
    //     };

    //     fetchMoodLogs();

    // }, [currentUserUid]);

    // Function to check if two dates are consecutive days
    
    useEffect(() => {
        // Fetch the current user's UID
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUserUid(user.uid);
            }
        });

        return () => unsubscribe();

    }, []);

    useEffect(() => {
        const fetchMoodLogs = async () => {
            try {
                if (!currentUserUid) return;

                const q = query(collection(db, 'moodlogs'), where('uid', '==', currentUserUid));
                const moodLogsSnapshot = await getDocs(q);
                const moodLogs = moodLogsSnapshot.docs.map(doc => doc.data());

                if (moodLogs.length < 12) {
                    // If less than 12 logs, set counts to "Not enough data"
                    setElevationCount('Not enough data');
                    setDepressionCount('Not enough data');
                    return;
                }

                let consecutiveElevationCount = 0;
                let consecutiveDepressionCount = 0;
                let prevDate = null;

                moodLogs.forEach(log => {
                    const currentDate = new Date(log.date.toDate());

                    // Check if the log state is "Elevated" or "Depressed"
                    if (log.state === 'Elevated' || log.state === 'Depressed') {
                        if (prevDate && isConsecutiveDays(prevDate, currentDate)) {
                            if (log.state === 'Elevated') {
                                consecutiveElevationCount++;
                            } else if (log.state === 'Depressed') {
                                consecutiveDepressionCount++;
                            }
                        } else {
                            consecutiveElevationCount = log.state === 'Elevated' ? 1 : 0;
                            consecutiveDepressionCount = log.state === 'Depressed' ? 1 : 0;
                        }
                    }

                    prevDate = currentDate;
                });

                setElevationCount(consecutiveElevationCount);
                setDepressionCount(consecutiveDepressionCount);
            } catch (error) {
                console.error('Error fetching mood logs:', error);
            }
        };

        fetchMoodLogs();

    }, [currentUserUid]);

    // Function to check if two dates are consecutive days
    const isConsecutiveDays = (prevDate, currentDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffInDays = Math.round(Math.abs((prevDate - currentDate) / oneDay));
        return diffInDays === 1;
    };

    return (
        <>
            <section className='patterns'>
            <h2 className='maps__mood-head'>{user ? user.displayName.split(' ')[0] : ''}'s Patterns</h2>
                <article className='patterns__pattern patterns__pattern-duration'>
                    <h5 className='patterns__pattern-head'>typical duration of elevation~</h5> 
                    <p className='patterns__pattern-data'><b className='patterns__pattern-number'>
                        {elevationCount}
                    </b> day{elevationCount !== 1 ? 's' : ''}</p>

                </article>
                <article className='patterns__pattern patterns__pattern-duration'>
                    <h5 className='patterns__pattern-head'>typical duration of depression~ </h5>
                    <p className='patterns__pattern-data'><b className='patterns__pattern-number'>
                        {depressionCount}
                    </b> day{depressionCount !== 1 ? 's' : ''}</p>
                </article>
                <article className='patterns__pattern'>
                    <h5 className='patterns__pattern-head'>events that incite a spike⤴ in mood</h5>
                    <div className='patterns__pattern-keys'>keywords from your notes, comments and titles~</div>
                </article>
                <article className='patterns__pattern'>
                    <h5 className='patterns__pattern-head'>events that incite a dip⤵ in mood</h5> 
                    <div className='patterns__pattern-keys'>keywords from your notes, comments and titles~</div>
                </article>
            </section>
        </>
    )
}

export default Patterns;
