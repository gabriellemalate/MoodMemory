import React, { useState, useEffect } from 'react';
import './MoodLogsPage.scss';
import Logged from '../../components/Logged/Logged';
import MagnifyingGlass from "../../assets/search.svg"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { db, auth } from '../../firebase';
import { query, collection, orderBy, onSnapshot, getFirestore, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import SampleLog from '../../components/SampleLog/SampleLog';
import { useAuthState } from "react-firebase-hooks/auth";

function MoodLogsPage() {
    const [logData, setLogData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByDateAscending, setSortByDateAscending] = useState(false);
    const [userUid, setUserUid] = useState(null);
    const [user] = useAuthState(auth);
    const [streak, setStreak] = useState(1);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUserUid(currentUser.uid);
        }


        const q = query(
            collection(db, 'moodlogs'),
            where('uid', '==', currentUser.uid),
            orderBy('date', sortByDateAscending ? 'asc' : 'desc')); // Order logs by date
        console.log(currentUser.uid)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setLogData(data);
        });

        return () => unsubscribe();
    }, [sortByDateAscending]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortByDateAscending(!sortByDateAscending);
    };

    useEffect(() => {
        const calculateStreak = async () => {
            try {
                const db = getFirestore();
                const logsCollection = collection(db, 'moodlogs');
                const logsQuery = query(logsCollection, where('uid', '==', user.uid), orderBy('date', 'desc'));
                const logsSnapshot = await getDocs(logsQuery);
                const logsData = logsSnapshot.docs.map(doc => doc.data());
    
                let currentStreak = 0;
                let lastLogDate = null;
    
                if (logsData.length === 0) {
                    setStreak(0);
                    return;
                }
    
                const currentDate = new Date();
                const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Reset time to midnight
    

                // Iterate through logs to find consecutive days
                for (let i = 0; i < logsData.length; i++) {
                    const logDate = new Date(logsData[i].date.toDate());
                    const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());
    
                    // Check if the log is from the current streak day or the day before
                    if (today - logDay <= currentStreak * 24 * 60 * 60 * 1000) {
                        // Check if the log is from the same date as the previous log
                        if (!lastLogDate || logDay.getTime() !== lastLogDate.getTime()) {
                            currentStreak++;
                        }
                    } else {
                        break; // Streak broken
                    }
    
                    lastLogDate = logDay; // Update last log date
                }
    
                setStreak(currentStreak);
            } catch (error) {
                console.error("Error calculating streak:", error);
            }
        };
    
        if (user) {
            calculateStreak();
        }
    }, [user]);
    

    return (
        <>
            <Header />
            <main className='all-logs'>
                <div className='all-logs__eq'>
                    <div className='top-eq'>
                        <h1 className='all-logs__head'>Log Library</h1>
                        <div className='top-eq-streak'>
                            <div className='streak'>
                                STREAK ❤️‍🔥 : {streak}</div>
                        </div>
                    </div>
                    <div className='all-logs__top'>
                        <form className="all-logs__search" action="" method="">
                            <textarea
                                className="all-logs__search-bar"
                                type="search"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button type="button" className="all-logs__search-button">
                                <img className="all-logs__search-button-magnifying-glass" src={MagnifyingGlass} alt="Search" />
                            </button>
                        </form>
                        <button className="all-logs__sort-button" onClick={toggleSortOrder}>
                            <span>Sort by:</span> <span>{sortByDateAscending ? 'Oldest First' : 'Newest First'}</span>
                        </button>
                    </div>
                    <section className='all-logs__logs'>
                        {logData.map((log) => (
                            <Logged key={log.id} logData={log} searchTerm={searchTerm} />
                        ))}
                        <SampleLog />
                    </section>
                </div>
            </main>
            <MobileNav />
        </>
    );
}

export default MoodLogsPage;