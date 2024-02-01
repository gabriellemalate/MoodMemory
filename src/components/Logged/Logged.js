import React, { useState, useEffect } from 'react';
import './Logged.scss';
import emote from "../../assets/emotes/irritable.png";
import { db } from '../../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

function Logged() {
    const [expanded, setExpanded] = useState(false);
    const [logData, setLogData] = useState([]); 

    useEffect(() => {
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

    const toggleExpand = () => {
        setExpanded(!expanded);
    };


    return (
        <>
            <article className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                <div className='logged-eq' onClick={toggleExpand}>

                    <div className='logged__frame'>
                        <img className='logged__frame-emoji' alt='logged emotion' src={logData.length > 0 ? logData[0].emoji || emote : emote} />
                    </div>
                    <div className='logged-info'>
                        <div className='logged-info__top'>
                            <div className='logged-info__top-left'>
                                <h2 className='logged-info__top-left-emotion'>{logData.length > 0 ? logData[0].emotion : ''}</h2>
                                <h3 className='logged-info__top-left-title'>{logData.length > 0 ? logData[0].title : ''}</h3>
                            </div>
                            <div className='logged-info__top-right'>
                            {console.log(logData)}
                                <h2 className='logged-info__top-right-date'>{logData.date && logData.date.toDate().toLocaleDateString()}</h2>
                                {/* <h3 className='logged-info__top-right-time'>time</h3> */}
                            </div>
                        </div>
                        <div className='logged-info__bottom'>
                            <div className='logged-info__bottom-eq'>
                                <h2 className='logged-info__bottom-state'>{logData.length > 0 ? logData[0].state : ''}</h2>
                                <div className='logged-info__bottom-lower'>
                                    <span className='logged-info__bottom-lower-irr'>Irr: {logData.length > 0 ? logData[0].irritability : ''}</span>
                                    <span className='logged-info__bottom-lower-anx'>Anx: {logData.length > 0 ? logData[0].anxiety : ''}</span>
                                    <span className='logged-info__bottom-lower-hours'> Hours: {logData.length > 0 ? logData[0].hours : ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article >
        </>
    );
}

export default Logged;