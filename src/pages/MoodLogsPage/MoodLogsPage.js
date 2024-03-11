import React, { useState, useEffect } from 'react';
import './MoodLogsPage.scss';
import Logged from '../../components/Logged/Logged';
import MagnifyingGlass from "../../assets/search.svg"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { db, auth } from '../../firebase';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import SampleLog from '../../components/SampleLog/SampleLog';

function MoodLogsPage() {
    const [logData, setLogData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByDateAscending, setSortByDateAscending] = useState(false);

    useEffect(() => {
        // const user = auth.currentUser;
        // if (!user) return;

        const q = query(collection(db, 'moodlogs'), orderBy('date', sortByDateAscending ? 'asc' : 'desc')); // Order logs by date
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

    return (
        <>
            <Header />
            <main className='all-logs'>
                <div className='all-logs__eq'>
                    <h1 className='all-logs__head'>Your Logged Moods</h1>
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
                            Sort by: {sortByDateAscending ? 'Oldest First' : 'Newest First'}
                        </button>
                    </div>
                    <section className='all-logs__logs'>
                        <SampleLog />
                        {logData.map((log) => (
                            <Logged key={log.id} logData={log} searchTerm={searchTerm} />
                        ))}
                    </section>
                </div>
            </main>
            <MobileNav />
        </>
    );
}

export default MoodLogsPage;
