import React, { useState } from 'react';
import './LoggedExpand.scss';
import emote from "../../assets/emotes/excited.png"
import okaysleep from "../../assets/okay.png";
// import goodsleep from "../../assets/goodsleep.png";
import tired from "../../assets/emotes/tired.png";

function LoggedExpand() {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            // Create a new comment object
            const commentObj = {
                id: Date.now(), 
                text: newComment,
            };

            // Update the comments state with the new comment
            setComments((prevComments) => [...prevComments, commentObj]);

            // Clear the input field
            setNewComment('');
        }
    };

    return (
        <>
            <article className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                <div className='logged-eq' onClick={toggleExpand}>

                    <div className='logged__frame'>
                        <img className='logged__frame-emoji' alt='logged emotion' src={emote} />
                    </div>
                    <div className='logged-info'>
                        <div className='logged-info__top'>
                            <div className='logged-info__top-left'>
                                <h2 className='logged-info__top-left-emotion'>excited</h2>
                                <h3 className='logged-info__top-left-title'>Demo Day</h3>
                            </div>
                            <div className='logged-info__top-right'>
                                <h2 className='logged-info__top-right-date'>02/07/24</h2>

                            </div>
                        </div>
                        <div className='logged-info__bottom'>
                            <div className='logged-info__bottom-eq'>
                                <h2 className='logged-info__bottom-state'>Elevated Mild</h2>
                                <div className='logged-info__bottom-lower'>
                                    <span className='logged-info__bottom-lower-item'>Irr:1</span>
                                    <span className='logged-info__bottom-lower-item'>Anx:1</span>
                                    <span className='logged-info__bottom-lower-item'> Hours:6</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article >
            {expanded && (
            <article className="open">
                
                <div className='open-eq'>
                    <div className='open-top'>
                        <div className='open-top-left'>
                            <div className='open-top-left__frame'>
                                <img className='open-top-left__frame-emoji' alt='open emotion' src={emote} />
                                <h2 className='open-top-left__frame-emotion'>Excited</h2>
                            </div>
                        </div>
                        <div className='open-top-right'>
                            <div className='open-top-right__stamp'>
                                <h3 className='open-top-right__date'>02/07/24</h3>

                            </div>
                            <h2 className='open-top-right__state'>Elevated Mild</h2>
                        </div>
                    </div>
                    <h3 className='open-top-left__title'>Demo Day</h3>
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
                            <p className='open-bottom-right__hours'>6 hours</p>
                            <img className='open-bottom-right__quality' src={okaysleep} alt="sleep quality" title="sleep quality" />
                        </div>
                    </div>
                    <p className='open__notes'>
                        <h2 className='open__notes-head'>Your Notes</h2>
                        <div className='open__notes-frame'>
                            {comments.map((comment) => (
                                <div key={comment.id} className='comment'>
                                    {comment.text}
                                </div>
                            ))}
                        </div>
                    </p>
                    <form className='open-add'>
                        <label className="open-add__label">Add insight from hindsite ~</label>
                        <div className='open-add__enter'>
                            <input
                                type="text"
                                id="extracomment"
                                name="extracomment"
                                placeholder="What's on your mind?"
                                className="open-add__input"
                                value={newComment}
                                autoComplete="off"
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className='open-add__button' type="button" onClick={handleAddComment}>add</button>
                        </div>
                    </form>
                    <button className='open__close'
                        onClick={toggleExpand}
                    >
                        close
                    </button>
                </div>
            </article>

            
            )}
        </>
    );
}

export default LoggedExpand;