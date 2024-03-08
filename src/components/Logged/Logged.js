import React, { useState, useEffect } from 'react';
import './Logged.scss';
import LoggedExpand from '../LoggedExpand/LoggedExpand';


function Logged({ logData, searchTerm }) {
    const [expanded, setExpanded] = useState(false);
    // const [logData, setLogData] = useState([]);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // useEffect(() => {
    //     const q = query(collection(db, 'moodlogs'));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const data = [];
    //         querySnapshot.forEach((doc) => {
    //             data.push({ ...doc.data(), id: doc.id });
    //         });
    //         // Sort logs by date in descending order (most recent first)
    //         data.sort((a, b) => b.date.toMillis() - a.date.toMillis());

    //         setLogData(data);
    //     });

    //     return () => unsubscribe();
    // }, []);

    const isMatch = (log) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        const lowercaseTitle = log.title.toLowerCase();
        const lowercaseEmotion = log.emotion.toLowerCase();
        const lowercaseLevel = log.level.toLowerCase();

        // Check if the title or emotion includes the search term
        return lowercaseTitle.includes(lowercaseSearchTerm) || lowercaseEmotion.includes(lowercaseSearchTerm) || lowercaseLevel.includes(lowercaseSearchTerm);
    };

    // Sort logData by date from most recent to oldest
    const sortedLogData = [...logData].sort((a, b) => b.date.toMillis() - a.date.toMillis());

    return (
        <>
            {sortedLogData.map((entry) => (
                isMatch(entry) && (
                    <article
                        key={entry.id}
                        className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                        <div className='logged-eq' onClick={toggleExpand}>

                            <div className='logged__frame'>
                                <img className='logged__frame-emoji' alt='logged emotion' src={require(`../../assets/emotes/${logData.emoji}.png`)} />
                            </div>
                            <div className='logged-info'>
                                <div className='logged-info__top'>
                                    <div className='logged-info__top-left'>
                                        <h2 className='logged-info__top-left-emotion'>{logData.emotion}</h2>
                                        <h3 className='logged-info__top-left-title'>{logData.title}</h3>
                                    </div>
                                    <div className='logged-info__top-right'>
                                        <h2 className='logged-info__top-right-date'>{logData.date && logData.date.toDate().toLocaleDateString()}</h2>
                                    </div>
                                </div>
                                <div className='logged-info__bottom'>
                                    <div className='logged-info__bottom-eq'>
                                        <h2 className='logged-info__bottom-state'>{logData.state} {logData.level}</h2>
                                        <div className='logged-info__bottom-lower'>
                                            <span className='logged-info__bottom-lower-item'>Irr:<b className='logged-info--bold'>{logData.irritability}</b></span>
                                            <span className='logged-info__bottom-lower-item'>Anx:<b className='logged-info--bold'>{logData.anxiety}</b></span>
                                            <span className='logged-info__bottom-lower-item'> Hours:<b className='logged-info--bold'>{logData.hours}</b></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {expanded && <LoggedExpand logData={logData} />}
                    </article >
                )
            ))}
        </>
    );
}



export default Logged;