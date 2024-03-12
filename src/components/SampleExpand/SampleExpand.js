import React, { useState, useEffect } from 'react';
import './SampleExpand.scss';
import LoggedExpand from '../LoggedExpand/LoggedExpand';
import Energized from '../../assets/emotes/energized.png';
import Good from '../../assets/Good.png';
import { v4 as uuidv4 } from 'uuid';

function SampleExpand() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            // Create a new comment object
            const commentObj = {
                id: uuidv4(),
                text: newComment,
            };

            try {
                // Save the new comment to Firestore
                const logRef = doc(db, 'moodlogs', logData.id);
                // Get the existing comments from Firestore
                const logSnapshot = await getDoc(logRef);
                const existingComments = logSnapshot.data().comments || [];

                // Append the new comment to the existing array of comments
                const updatedComments = [...existingComments, commentObj];
                // Update the document in Firestore with the updated array of comments
                await updateDoc(logRef, { comments: updatedComments });
                console.log('Comment successfully added to Firestore!');
                // Update the local state with the updated array of comments
                setComments(updatedComments);
            } catch (error) {
                console.error('Error adding comment to Firestore: ', error);
            }

            setNewComment('');
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');

    if (confirmDelete) {
        try {
            // Filter out the comment to be deleted
            const updatedComments = comments.filter(comment => comment.id !== commentId);

            // Update Firestore with the updated comments
            const logRef = doc(db, 'moodlogs', logData.id);
            await updateDoc(logRef, { comments: updatedComments });

            // Update local state
            setComments(updatedComments);
            console.log('Comment successfully deleted from Firestore!');
        } catch (error) {
            console.error('Error deleting comment from Firestore: ', error);
        }
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
                                <img className='open-top-left__frame-emoji' alt='open emotion' src={Energized} />
                                <h2 className='open-top-left__frame-emotion'>energized</h2>
                            </div>
                        </div>
                        <div className='open-top-right'>
                            <div className='open-top-right__stamp'>
                                <h3 className='open-top-right__date'>∞</h3>

                            </div>
                            <h2 className='open-top-right__state'>Elevated Mild</h2>
                        </div>
                    </div>
                    <h3 className='open-top-left__title'>your title goes here</h3>
                    <div className='open-bottom'>
                        <div className='open-bottom-left'>

                            <div className='open-bottom-left__obs'>
                                <p className='open-bottom-left__obs-level'>
                                    Irritability 
                                    <span className='open-bottom-left__obs-irr' > 0</span>
                                </p>
                                <p className='open-bottom-left__obs-level'>
                                    Anxiety 
                                    <span className='open-bottom-left__obs-anx'> 1</span>
                                </p>

                            </div>
                        </div>
                        <div className='open-bottom-right'>
                            <p className='open-bottom-right__hours'>5 hrs</p>
                            <img className='open-bottom-right__quality' src={Good} alt="sleep quality" title="sleep quality" />
                        </div>
                    </div>
                    <p className='open__notes'>
                        <h2 className='open__notes-head'>Your Notes</h2>
                        <div className='open__notes-frame'>
                            <p className='open__notes-initial'>This log won't affect your total count, search, or sort, nor show on your maps.</p>
                            
                                <>
                                    <h5 className='open__notes-pophead' >Comments:</h5>
                                
                                        <div className='open__notes-comment'>
                                            <b>Add and delete comments</b> to the entries in your library, besides this one.
                                            <button className='open__notes-comment--button' onClick={() => handleDeleteComment}>X</button>
                                        </div>
                                        <div className='open__notes-comment'>
                                            <b>Clicking on a mood label,</b> will show you all the entries you have of that exact kind.
                                            <button className='open__notes-comment--button' onClick={() => handleDeleteComment}>X</button>
                                        </div>
                                        <div className='open__notes-comment'>
                                            <b>Toggle your maps</b> to show your progression per year / month / week / and day since you first started. 
                                            <button className='open__notes-comment--button' onClick={() => handleDeleteComment}>X</button>
                                        </div>
                                        <div className='open__notes-comment'>
                                            Yes, you can log multiple entries a day.
                                            <button className='open__notes-comment--button' onClick={() => handleDeleteComment}>X</button>
                                        </div>
                                </>
                            
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
export default SampleExpand;