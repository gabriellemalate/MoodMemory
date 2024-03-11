import React, { useState, useEffect } from 'react';
import './SampleLog.scss';
import LoggedExpand from '../LoggedExpand/LoggedExpand';
import Energized from '../../assets/emotes/energized.png'
import SampleExpand from '../SampleExpand/SampleExpand';

function SampleLog({ logData, searchTerm }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };


    return (
        <>
            <article className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                <div className='logged-eq' onClick={toggleExpand}>

                    <div className='logged__frame'>
                        <img className='logged__frame-emoji' alt='logged emotion' src={Energized} />
                    </div>
                    <div className='logged-info'>
                        <div className='logged-info__top'>
                            <div className='logged-info__top-left'>
                                <h2 className='logged-info__top-left-emotion'>welcome</h2>
                                <h3 className='logged-info__top-left-title'>This is a sample log</h3>
                            </div>
                            <div className='logged-info__top-right'>
                                <h2 className='logged-info__top-right-date'>∞</h2>
                            </div>
                        </div>
                        <div className='logged-info__bottom'>
                            <div className='logged-info__bottom-eq'>
                                <h2 className='logged-info__bottom-state'>Mood Label</h2>
                                <div className='logged-info__bottom-lower'>
                                    <span className='logged-info__bottom-lower-item'>Irr:<b className='logged-info--bold'>0</b></span>
                                    <span className='logged-info__bottom-lower-item'>Anx:<b className='logged-info--bold'>1</b></span>
                                    <span className='logged-info__bottom-lower-item'> Hours:<b className='logged-info--bold'>5</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {expanded && <SampleExpand />}
            </article >

        </>
    );
}
export default SampleLog;