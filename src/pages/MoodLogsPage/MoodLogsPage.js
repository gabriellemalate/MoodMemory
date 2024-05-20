import React, { useState, useEffect } from 'react';
import './MoodLogsPage.scss';
import Logged from '../../components/Logged/Logged';
import MagnifyingGlass from "../../assets/search.svg"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { db, auth } from '../../firebase';
import { query, collection, orderBy, onSnapshot, getFirestore, where, getDocs } from 'firebase/firestore';
import SampleLog from '../../components/SampleLog/SampleLog';
import { useAuthState } from "react-firebase-hooks/auth";

function MoodLogsPage() {
    const [logData, setLogData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;


        const q = query(collection(db, 'moodlogs'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setLogData(data);
        });

        return () => unsubscribe();
    }, []);

    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const logsMatchingSearch = logData.filter((log) => {
            const lowercaseSearchTerm = searchTerm.toLowerCase();
            const lowercaseTitle = log.title.toLowerCase();
            const lowercaseEmotion = log.emotion.toLowerCase();
            const lowercaseLevel = log.level.toLowerCase();
    
            // Check if the title or emotion includes the search term
            return lowercaseTitle.includes(lowercaseSearchTerm) || lowercaseEmotion.includes(lowercaseSearchTerm) || lowercaseLevel.includes(lowercaseSearchTerm);
        });
        
        setFilteredLogs(logsMatchingSearch);
    }, [logData, searchTerm]);

    return (
        <>
            <Header />
            <main className='all-logs'>
                <div className='all-logs__eq'>
                    <h1 className='all-logs__head'>Your Logged Moods</h1>

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
