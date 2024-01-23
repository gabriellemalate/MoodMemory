import React, { useState } from 'react';
import './Logged.scss';
import emote from "../../assets/emotes/irritable.png"

function Logged() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <article className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                <div className='logged-eq' onClick={toggleExpand}>
                    <div className='logged__frame'>
                        <img className='logged__frame-emoji' alt='logged emotion' src={emote}/>
                    </div>
                    <div className='logged-info'>
                        <div className='logged-info__top'>
                            <div className='logged-info__top-left'>
                                <h2 className='logged-info__top-left-emotion'>emotion</h2>
                                <h3 className='logged-info__top-left-title'>title</h3>
                            </div>
                            <div className='logged-info__top-right'>
                                <h2 className='logged-info__top-right-date'>date</h2>
                                <h3 className='logged-info__top-right-time'>time</h3>
                            </div>
                        </div>
                        <div className='logged-info__bottom'>
                            <div className='logged-info__bottom-eq'>
                                <h2 className='logged-info__bottom-state'>state</h2>
                                <div className='logged-info__bottom-lower'>
                                    <span className='logged-info__bottom-lower-irr'>Irr: </span>
                                    <span className='logged-info__bottom-lower-anx'>Anx: </span>
                                    <span className='logged-info__bottom-lower-hours'> Hours: </span>
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