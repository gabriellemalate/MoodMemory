import React, { useState, useEffect  } from 'react';
import './LoggedExpand.scss';
import emote from "../../assets/emotes/excited.png"
import { db } from '../../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import goodsleep from "../../assets/goodsleep.png";


function LoggedExpand() {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [logData, setLogData] = useState([]);

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

    return (
        <>
            <article key={entry.id} className="open">
                
                <div className='open-eq' onClick={toggleExpand}>
                    <div className='open-top'>
                        <div className='open-top-left'>
                            <div className='open-top-left__frame'>
                                <img className='open-top-left__frame-emoji' alt='open emotion' src={emote} />
                                <h2 className='open-top-left__frame-emotion'>excited</h2>
                            </div>
                        </div>
                        <div className='open-top-right'>
                            <div className='open-top-right__stamp'>
                                <h3 className='open-top-right__date'>02/07/24</h3>

                            </div>
                            <h2 className='open-top-right__state'>WNL</h2>
                        </div>
                    </div>
                    <h3 className='open-top-left__title'>we're using a title</h3>
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
                            <p className='open-bottom-right__hours'>1 hour</p>
                            <img className='open-bottom-right__quality' src={goodsleep} alt="sleep quality" title="sleep quality" />
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
                        <label className="open-add__label">Add insight from hindsight ~</label>
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

        </>
    );
}

export default LoggedExpand;