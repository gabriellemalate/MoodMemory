import React, { useState } from 'react';
import './LoggedExpand.scss';
import emote from "../../assets/emotes/irritable.png"
import okaysleep from "../../assets/okay.png";
import Logged from '../Logged/Logged'; 

function LoggedExpand() {
    // const [expanded, setExpanded] = useState(false);

    // const toggleExpand = () => {
    //     setExpanded(!expanded);
    // };

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
                                <h2 className='open-top-left__frame-emotion'>emotion</h2>
                            </div>
                        </div>
                        <div className='open-top-right'>
                            <div className='open-top-right__stamp'>
                                <h3 className='open-top-right__date'>date</h3>
                                <h3 className='open-top-right__time'>time</h3>
                            </div>
                            <h2 className='open-top-right__state'>Low Mild</h2>
                        </div>
                    </div>
                    <h3 className='open-top-left__title'>title</h3>
                    <div className='open-bottom'>
                        <div className='open-bottom-left'>

                            <div className='open-bottom-left__obs'>
                                <p className='open-bottom-left__obs-level'>
                                    Irritability
                                    <span className='open-bottom-left__obs-irr' > 1</span>
                                </p>
                                <p className='open-bottom-left__obs-level'>
                                    Anxiety
                                    <span className='open-bottom-left__obs-anx'> 1</span>
                                </p>

                            </div>
                        </div>
                        <div className='open-bottom-right'>
                            <p className='open-bottom-right__hours'>5 hours</p>
                            <img className='open-bottom-right__quality' src={okaysleep} alt="sleep quality" title="sleep quality" />
                        </div>
                    </div>
                    <p className='open__notes'>
                        <div className='open__notes-frame'>
                        user notes go here
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
                    // onClick={toggleExpand}
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