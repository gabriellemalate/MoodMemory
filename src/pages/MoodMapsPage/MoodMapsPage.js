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

const MoodMapsPage = () => {
    const [user] = useAuthState(auth);
    const [streak, setStreak] = useState(1);
    const currentUserUid = user ? user.uid : null; 
    
    useEffect(() => {
        const calculateStreak = async () => {
            try {
                const db = getFirestore();
                const logsCollection = collection(db, 'moodlogs');
                const logsQuery = query(logsCollection, where('uid', '==', user.uid), orderBy('date', 'desc')); // Order logs by date in descending order
                const logsSnapshot = await getDocs(logsQuery);
                const logsData = logsSnapshot.docs.map(doc => doc.data());

                let currentStreak = 0;

                if (logsData.length === 0) {
                    setStreak(0);
                    return;
                }

                const currentDate = new Date();
                const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Reset time to midnight
                let lastLogDate = new Date(logsData[0].date.toDate());
                lastLogDate = new Date(lastLogDate.getFullYear(), lastLogDate.getMonth(), lastLogDate.getDate()); // Reset time to midnight

                // Check if the most recent log is within the past 24 hours
                if (today - lastLogDate > 24 * 60 * 60 * 1000) {
                    setStreak(0);
                    return;
                }

                // Iterate through logs to find consecutive days
                for (let i = 0; i < logsData.length; i++) {
                    const logDate = new Date(logsData[i].date.toDate());
                    const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());

                    if (today - logDay <= currentStreak * 24 * 60 * 60 * 1000) {
                        currentStreak++;
                    } else {
                        break; // Streak broken
                    }
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
                        <h2 className='maps__mood-head'>mood</h2>
                        <MoodMap />
                    </section>
                    {/* <section className='maps__sleep'>
                        <h2 className='maps__sleep-head'>*in dev* sleep</h2>
                        <SleepMap />
                    </section> */}

                    <section className='maps__mood'>
                        <h2 className='maps__mood-head'>Your Patterns</h2>
                        <Patterns currentUserUid={currentUserUid} />
                    </section>

                </div>
                <Footer />
            </main>
            <MobileNav />
        </>
    );
}

export default MoodMapsPage;