import './MoodMapsPage.scss';
import React, { useState, useEffect } from 'react';
import MoodMap from "../../components/MoodMap/MoodMap"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import Footer from "../../components/Footer/Footer";
import SleepMap from '../../components/SleepMap/SleepMap';
import { db, auth } from '../../firebase';
import { query, collection, orderBy, onSnapshot, getFirestore, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import SampleLog from '../../components/SampleLog/SampleLog';
import { useAuthState } from "react-firebase-hooks/auth";
import Patterns from '../../components/Patterns/Patterns';
import FoodMap from '../../components/FoodMap/FoodMap';
import EmotionMap from '../../components/EmotionMap/EmotionMap';

const MoodMapsPage = () => {
    const [user] = useAuthState(auth);
    const [streak, setStreak] = useState(1);
    const [moodLogs, setMoodLogs] = useState([]); 
    const currentUserUid = user ? user.uid : null;

    useEffect(() => {
        const fetchMoodLogs = async () => {
            try {
                const logsCollection = collection(db, 'moodlogs');
                const logsQuery = query(logsCollection, where('uid', '==', user.uid), orderBy('date', 'desc'));
                const logsSnapshot = await getDocs(logsQuery);
                const logsData = logsSnapshot.docs.map(doc => doc.data());
                setMoodLogs(logsData);
            } catch (error) {
                console.error("Error fetching mood logs:", error);
            }
        };

        if (user) {
            fetchMoodLogs();
        }
    }, [user]);

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
            <main className='maps'>
                <div className='maps__eq'>
                    <article className='maps__top'>
                        <h1 className='maps__head'>Maps</h1>
                        <div className='top-streak'>
                            <div className='streak'>
                                STREAK ❤️‍🔥 : {streak}</div>
                        </div>
                    </article>
                    <article className='blob-wrap'>
                        <div className="blobs blobs_map-1" />
                        <div className="blobs blobs_map-2" />
                        <div className="blobs blobs_map-3" />

                    </article>

                    <section className='maps__mood'>
                        <h2 className='maps__mood-head'>Mood Map</h2>
                        <MoodMap />
                    </section>

                    <section className='maps__mood'>
                        {/* <h2 className='maps__mood-head'>{user ? user.displayName.split(' ')[0] : ''}'s Patterns</h2> */}
                        <Patterns currentUserUid={currentUserUid} />
                    </section>

                    <section className='maps__mood'>
                        <h2 className='maps__mood-head'>Emotions Map</h2>
                        <EmotionMap moodLogs={moodLogs} />
                    </section>

                    <section className='maps__mood'>
                        <h2 className='maps__mood-head'>Food Map</h2>
                        <FoodMap/>
                    </section>

                    <section className='maps__sleep'>
                        <h2 className='maps__sleep-head'>Sleep Map</h2>
                        <SleepMap />
                    </section>

                </div>
                <Footer />
            </main>
            <MobileNav />
        </>
    );
}

export default MoodMapsPage;