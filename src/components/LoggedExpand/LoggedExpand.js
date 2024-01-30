import React, { useState } from 'react';
import './LoggedExpand.scss';
import emote from "../../assets/emotes/excited.png"
import okaysleep from "../../assets/okay.png";
// import Logged from '../Logged/Logged'; 

function LoggedExpand() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <>
        {/* {expanded ? ( */}
            <article className="open">
            {/* {`open ${expanded ? 'expanded' : 'compressed'}`} */}
                <div className='open-eq'>
                    <div className='open-top'>
                        <div className='open-top-left'>
                            <div className='open-top-left__frame'>
                                <img className='open-top-left__frame-emoji' alt='open emotion' src={emote} />
                                <h2 className='open-top-left__frame-emotion'>excited</h2>
                            </div>
                        </div>
                        <div className='open-top-right'>
                            <div className='open-top-right__stamp'>
                                <h3 className='open-top-right__date'>02/02/23</h3>
                                {/* <h3 className='open-top-right__time'>time</h3> */}
                            </div>
                            <h2 className='open-top-right__state'>WNL</h2>
                        </div>
                    </div>
                    <h3 className='open-top-left__title'>Demo</h3>
                    <div className='open-bottom'>
                        <div className='open-bottom-left'>

                            <div className='open-bottom-left__obs'>
                                <p className='open-bottom-left__obs-level'>
                                    Irritability
                                    <span className='open-bottom-left__obs-irr' > 0</span>
                                </p>
                                <p className='open-bottom-left__obs-level'>
                                    Anxiety
                                    <span className='open-bottom-left__obs-anx'> 0</span>
                                </p>

                            </div>
                        </div>
                        <div className='open-bottom-right'>
                            <p className='open-bottom-right__hours'>5 hours</p>
                            <img className='open-bottom-right__quality' src={okaysleep} alt="sleep quality" title="sleep quality" />
                        </div>
                    </div>
                    <p className='open__notes'>
                        <h2 className='open__notes-head'>Your Notes</h2>
                        <div className='open__notes-frame'>
                        some thoughts
                        </div>
                    </p>
                    <form className='open-add'>
                        <label className="open-add__label">Add insight from hindsite ~</label>
                        <div className='open-add__enter'>
                            <input type="text" id="extracomment" name="extracomment" placeholder="What's on your mind?" className="open-add__input" />
                            <button className='open-add__button'>add</button>
                        </div>
                    </form>
                    <button className='open__close' 
                    onClick={toggleExpand}
                    >
                        close
                    </button>
                </div>
            </article>

            {/* // ) : (
            //                 <div className='open-top-left'>
            //                     <Logged /> {/* Render the compressed version (Logged component) */}
            {/* //                 </div> */}
            {/* //             )} */} 
        </>
    );
}

export default LoggedExpand;