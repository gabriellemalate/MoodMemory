import React, { useState, useEffect } from 'react';
import './MoodLogsPage.scss';
import Logged from '../../components/Logged/Logged';
import MagnifyingGlass from "../../assets/search.svg"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { db, auth } from '../../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

function MoodLogsPage() {
    const [logData, setLogData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
                            <Logged key={log.id} logData={log} searchTerm={searchTerm}/>
                        ))}
                    </section>
                </div>
            </main>
            <MobileNav />
        </>
    );
}

export default MoodLogsPage;
