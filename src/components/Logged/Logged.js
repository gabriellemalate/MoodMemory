import React, { useState, useEffect } from 'react';
import './Logged.scss';
import { db } from '../../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import LoggedExpand from '../LoggedExpand/LoggedExpand';


function Logged({ searchTerm }) {
    const [expanded, setExpanded] = useState(false);
    const [logData, setLogData] = useState([]);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const q = query(collection(db, 'moodlogs'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            // Sort logs by date in descending order (most recent first)
            data.sort((a, b) => b.date.toMillis() - a.date.toMillis());

            setLogData(data);
        });

        return () => unsubscribe();
    }, []);

    const isMatch = (log) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        const lowercaseTitle = log.title.toLowerCase();
        const lowercaseEmotion = log.emotion.toLowerCase();
        const lowercaseLevel = log.level.toLowerCase();

        // Check if the title or emotion includes the search term
        return lowercaseTitle.includes(lowercaseSearchTerm) || lowercaseEmotion.includes(lowercaseSearchTerm)|| lowercaseLevel.includes(lowercaseSearchTerm);
    };

    return (
        <>
            {logData.map((entry, index) => {

                // Filter entries based on the search term
                if (searchTerm && !isMatch(entry)) {
                    return null;
                }

                const selectedEmote = require(`../../assets/emotes/${entry.emoji}.png`);
                console.log('Selected Emote:', selectedEmote);
                console.log('Emote Path:', `../../assets/emotes/${entry.emoji.toLowerCase()}.png`);

                return (
                    <article key={entry.id} className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                        <div className='logged-eq' onClick={toggleExpand}>

                            <div className='logged__frame'>
                                <img className='logged__frame-emoji' alt='logged emotion' src={selectedEmote} />
                            </div>
                            <div className='logged-info'>
                                <div className='logged-info__top'>
                                    <div className='logged-info__top-left'>
                                        <h2 className='logged-info__top-left-emotion'>{entry.emotion}</h2>
                                        <h3 className='logged-info__top-left-title'>{entry.title}</h3>
                                    </div>
                                    <div className='logged-info__top-right'>
                                        {console.log(logData)}
                                        <h2 className='logged-info__top-right-date'>{entry.date && entry.date.toDate().toLocaleDateString()}</h2>
                                    </div>
                                </div>
                                <div className='logged-info__bottom'>
                                    <div className='logged-info__bottom-eq'>
                                        <h2 className='logged-info__bottom-state'>{entry.state} {entry.level}</h2>
                                        <div className='logged-info__bottom-lower'>
                                            <span className='logged-info__bottom-lower-item'>Irr:<b className='logged-info--bold'>{entry.irritability}</b></span>
                                            <span className='logged-info__bottom-lower-item'>Anx:<b className='logged-info--bold'>{entry.anxiety}</b></span>
                                            <span className='logged-info__bottom-lower-item'> Hours:<b className='logged-info--bold'>{entry.hours}</b></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article >
                    {expanded && (
                        
                        <LoggedExpand/>
                        )}
                );
            })}
        </>
    );
}


export default Logged;