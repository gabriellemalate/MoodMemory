import React, { useState, useEffect } from 'react';
import './LoggedExpand.scss';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

function LoggedExpand({ logData }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            // Create a new comment object
            const commentObj = {
                id: Date.now(),
                text: newComment,
            };

            // Update the comments state with the new comment
            setComments((prevComments) => [...prevComments, commentObj]);

            try {
                // Save the new comment to Firestore
                const logRef = doc(db, 'moodlogs', logData.id);
                await updateDoc(logRef, {
                    comments: arrayUnion(commentObj.text) // Assuming 'comments' is the field in Firestore where comments are stored
                });
                console.log('Comment successfully added to Firestore!');
            } catch (error) {
                console.error('Error adding comment to Firestore: ', error);
            }

            // Clear the input field
            setNewComment('');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this entry?');

        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'moodlogs', logData.id));
                console.log('Document successfully deleted!');
                // Show the confirmation window only if the deletion is confirmed
            setShowConfirmation(true);
            } catch (error) {
                console.error('Error deleting document: ', error);
            }
        }
    };

    const handleConfirmDelete = async () => {
        // Hide the confirmation window
        setShowConfirmation(false);
        // Perform the deletion
        try {
            // Your deletion logic here
            // After successful deletion, show the success message
            alert('Successfully Deleted');
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const handleCancelDelete = () => {
        // Hide the confirmation window
        setShowConfirmation(false);
        // Optionally, navigate back to the homepage or perform any other action
    };

    return (
        <>
            <article className="open">

                <div className='open-eq'
                >
                    <div className='open-top'>
                        <div className='open-top-left'>
                            <div className='open-top-left__frame'>
                                <img className='open-top-left__frame-emoji' alt='open emotion' src={require(`../../assets/emotes/${logData.emoji}.png`)} />
                                <h2 className='open-top-left__frame-emotion'>{logData.emotion}</h2>
                            </div>
                        </div>
                        <div className='open-top-right'>
                            <div className='open-top-right__stamp'>
                                <h3 className='open-top-right__date'>{logData.date && logData.date.toDate().toLocaleDateString()}</h3>

                            </div>
                            <h2 className='open-top-right__state'>{logData.state} {logData.level}</h2>
                        </div>
                    </div>
                    <h3 className='open-top-left__title'>{logData.title}</h3>
                    <div className='open-bottom'>
                        <div className='open-bottom-left'>

                            <div className='open-bottom-left__obs'>
                                <p className='open-bottom-left__obs-level'>
                                    Irritability
                                    <span className='open-bottom-left__obs-irr' > {logData.irritability}</span>
                                </p>
                                <p className='open-bottom-left__obs-level'>
                                    Anxiety
                                    <span className='open-bottom-left__obs-anx'> {logData.anxiety}</span>
                                </p>

                            </div>
                        </div>
                        <div className='open-bottom-right'>
                            <p className='open-bottom-right__hours'>{logData.hours} hour{logData.hours !== 1 ? 's' : ''}</p>
                            <img className='open-bottom-right__quality' src={require(`../../assets/${logData.quality}.png`)} alt="sleep quality" title="sleep quality" />
                        </div>
                    </div>
                    <p className='open__notes'>
                        <h2 className='open__notes-head'>Your Notes</h2>
                        <div className='open__notes-frame'>
                           <p className='open__notes-frame-initial'> {logData.notes} </p>
                            {logData.comments}
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
                    {/* <button className='open__close' onClick={toggleExpand}>
                        close
                    </button> */}
                    <button className='open__close' onClick={handleDelete}>
                        delete
                    </button>
                </div>
            </article>
            {/* Deletion confirmation window */}
            {showConfirmation && (
                <div className="confirmation-window">
                    <p>Are you sure you want to delete this entry?</p>
                    {/* Button to confirm deletion */}
                    <button onClick={handleConfirmDelete}>OK</button>
                    {/* Button to cancel deletion */}
                    <button onClick={handleCancelDelete}>Cancel</button>
                </div>
            )}
        </>
    );
}

export default LoggedExpand;