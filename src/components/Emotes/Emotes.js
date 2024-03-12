import angry from "../../assets/emotes/angry.png";
import annoyed from "../../assets/emotes/annoyed.png";
import anxious from "../../assets/emotes/anxious.png";
import content from "../../assets/emotes/content.png";
import down from "../../assets/emotes/down.png";
import energized from "../../assets/emotes/energized.png";
import excited from "../../assets/emotes/excited.png";
import exhausted from "../../assets/emotes/exhausted.png";
import frustrated from "../../assets/emotes/frustrated.png";
import grateful from "../../assets/emotes/grateful.png";
import happy from "../../assets/emotes/happy.png";
import irritable from "../../assets/emotes/irritable.png";
import hopeless from "../../assets/emotes/hopeless.png";
import loving from "../../assets/emotes/loving.png";
import motivated from "../../assets/emotes/motivated.png";
import panic from "../../assets/emotes/panic.png";
import proud from "../../assets/emotes/proud.png";
import relaxed from "../../assets/emotes/relaxed.png";
import sad from "../../assets/emotes/sad.png";
import satisfied from "../../assets/emotes/satisfied.png";
import stressed from "../../assets/emotes/stressed.png";
import tired from "../../assets/emotes/tired.png";
import unmotivated from "../../assets/emotes/unmotivated.png";
import unsure from "../../assets/emotes/unsure.png";
import worried from "../../assets/emotes/worried.png";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const Emotes = () => {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState({
        state: '',
        level: '',
        irritability: '0',
        anxiety: '0',
        hours: '0',
        quality: '',
        emoji: '',
        emotion: '',
        title: '',
        notes: '',
        graphValue: '',
        comments: '',
    });
    const [errors, setErrors] = useState({
        state: '',
        anxiety: '',
        irritability: '',
        quality: '',
        hours: '',
        emoji: '',
        emotion: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (fieldName, emotion, emojiPath) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: emotion, emoji: emojiPath }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        // Calculate graphValue based on state and level
        const graphValue = getGraphValue(formData.state, formData.level);

        // Initialize comments field as an empty array
        const comments = [];


        // Validation checks
        let formIsValid = true;

        if (!formData.state) {
            setErrors((prevErrors) => ({ ...prevErrors, state: '*Select a Mood State' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, state: '' }));
        }

        if (formData.hours !== 0 && !formData.quality) {
            setErrors((prevErrors) => ({ ...prevErrors, quality: '*If you slept at all, choose a sleep quality option' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, quality: '' }));
        }

        if (!formData.emoji) {
            setErrors((prevErrors) => ({ ...prevErrors, emoji: '*Please choose a mood representation' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, emoji: '' }));
        }

        // If any validation fails, prevent form submission
        if (!formIsValid) {
            return;
        }

        try {
            // Reference to the "moodlogs" collection
            const moodlogsCollection = collection(db, 'moodlogs');
            // Generate a unique ID using uuid
            const logId = uuidv4();
            // Convert Date.now() to Firestore timestamp
            let firestoreTimestamp = Timestamp.fromMillis(Date.now());

            // Check if the custom date is provided
            if (formData.customDate) {
                // Convert the custom date to a JavaScript Date object
                const customDate = new Date(formData.customDate);
                // Convert the JavaScript Date object to Firestore timestamp
                firestoreTimestamp = Timestamp.fromDate(customDate);
            } else {
                // If no custom date is provided, use the current timestamp
                firestoreTimestamp = Timestamp.now();
            }

            // Add a new document to the "moodlogs" collection with form data and timestamp
            const newMoodLogRef = await addDoc(moodlogsCollection, {
                id: logId,
                uid: user.uid,
                anxiety: formData.anxiety,
                date: firestoreTimestamp,
                emoji: encodeURIComponent(formData.emoji),
                emotion: formData.emotion,
                hours: formData.hours,
                irritability: formData.irritability,
                level: formData.level,
                notes: formData.notes,
                quality: formData.quality,
                state: formData.state,
                title: formData.title,
                graphValue: graphValue,
                comments: comments,
                customDate: '',
            });
        } catch (error) {
            console.error('Error submitting form data:', error.message);
        }
        navigate('/success');
    };

    return (
        <article className='add-mood-quick__emote'>
            <div className='add-mood-quick__emote-eq'>
                <h3 className='add-mood-quick__emote-head'>Which best represents how you feel?</h3>
                <article className='add-mood-quick__emote-menu'>
                    <ul className='add-mood-quick__emote-menu-eq'>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button type="button" className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'motivated' ? 'selected' : ''}`}>
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='motivated'
                                    value='motivated'
                                    checked={formData.emoji === 'motivated'}
                                    onChange={() => handleInputChange('emotion', 'motivated', 'motivated')}
                                />
                                <label htmlFor='motivated'>
                                    <img className='add-mood-quick__emote-menu-option-emoji' alt="motivated" src={motivated} />
                                    <h4 className='add-mood-quick__emote-menu-option-title'>motivated</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'anxious' ? 'selected' : ''}`} type="button" >
                                <input
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='anxious'
                                    value='anxious'
                                    checked={formData.emoji === 'anxious'}
                                    onChange={() => handleInputChange('emotion', 'anxious', 'anxious')}
                                />
                                <label htmlFor='anxious'>
                                    <img alt="anxious" src={anxious} />
                                    <h4>anxious</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'relaxed' ? 'selected' : ''}`}
                                type="button">
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='relaxed'
                                    value='relaxed'
                                    checked={formData.emoji === 'relaxed'}
                                    onChange={() => handleInputChange('emotion', 'relaxed', 'relaxed')}
                                />
                                <label htmlFor='relaxed'>
                                    <img className='add-mood-quick__emote-menu-option--relaxed-emoji' alt="relaxed" src={relaxed} />
                                    <h4 className='add-mood-quick__emote-menu-option--relaxed-title'>relaxed</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'stressed' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='stressed'
                                    value='stressed'
                                    checked={formData.emoji === 'stressed'}
                                    onChange={() => handleInputChange('emotion', 'stressed', 'stressed')}
                                />
                                <label htmlFor='stressed'>
                                    <img className='add-mood-quick__emote-menu-option--stressed-emoji' alt="stressed" src={stressed} />
                                    <h4 className='add-mood-quick__emote-menu-option--stressed-title'>stressed</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'unsure' ? 'selected' : ''}`} type="button">
                                <input
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='unsure'
                                    value='unsure'
                                    checked={formData.emoji === 'unsure'}
                                    onChange={() => handleInputChange('emotion', 'unsure', 'unsure')}
                                />
                                <label htmlFor='unsure'>
                                    <img alt="unsure" src={unsure} />
                                    <h4>unsure</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'tired' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='tired'
                                    value='tired'
                                    checked={formData.emoji === 'tired'}
                                    onChange={() => handleInputChange('emotion', 'tired', 'tired')}
                                />
                                <label htmlFor='tired'>
                                    <img alt="tired" src={tired} />
                                    <h4>tired</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'content' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='content'
                                    value='content'
                                    checked={formData.emoji === 'content'}
                                    onChange={() => handleInputChange('emotion', 'content', 'content')}
                                />
                                <label htmlFor='content'>
                                    <img alt="content" src={content} />
                                    <h4>content</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'grateful' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='grateful'
                                    value='grateful'
                                    checked={formData.emoji === 'grateful'}
                                    onChange={() => handleInputChange('emotion', 'grateful', 'grateful')}
                                />
                                <label htmlFor='grateful'>
                                    <img alt="grateful" src={grateful} />
                                    <h4>grateful</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'down' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='down'
                                    value='down'
                                    checked={formData.emoji === 'down'}
                                    onChange={() => handleInputChange('emotion', 'down', 'down')}
                                />
                                <label htmlFor='down'>
                                    <img alt="down" src={down} />
                                    <h4>down</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'sad' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='sad'
                                    value='sad'
                                    checked={formData.emoji === 'sad'}
                                    onChange={() => handleInputChange('emotion', 'sad', 'sad')}
                                />
                                <label htmlFor='sad'>
                                    <img alt="sad" src={sad} />
                                    <h4>sad</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'proud' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='proud'
                                    value='proud'
                                    checked={formData.emoji === 'proud'}
                                    onChange={() => handleInputChange('emotion', 'proud', 'proud')}
                                />
                                <label htmlFor='proud'>
                                    <img alt="proud" src={proud} />
                                    <h4>proud</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'unmotivated' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='unmotivated'
                                    value='unmotivated'
                                    checked={formData.emoji === 'unmotivated'}
                                    onChange={() => handleInputChange('emotion', 'unmotivated', 'unmotivated')}
                                />
                                <label htmlFor='unmotivated'>
                                    <img alt="unmotivated" src={unmotivated} />
                                    <h4>unmotivated</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'annoyed' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='annoyed'
                                    value='annoyed'
                                    checked={formData.emoji === 'annoyed'}
                                    onChange={() => handleInputChange('emotion', 'annoyed', 'annoyed')}
                                />
                                <label htmlFor='annoyed'>
                                    <img alt="annoyed" src={annoyed} />
                                    <h4>annoyed</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'loving' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='loving'
                                    value='loving'
                                    checked={formData.emoji === 'loving'}
                                    onChange={() => handleInputChange('emotion', 'loving', 'loving')}
                                />
                                <label htmlFor='loving'>
                                    <img alt="loving" src={loving} />
                                    <h4>loving</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'happy' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='happy'
                                    value='happy'
                                    checked={formData.emoji === 'happy'}
                                    onChange={() => handleInputChange('emotion', 'happy', 'happy')}
                                />
                                <label htmlFor='happy'>
                                    <img alt="happy" src={happy} />
                                    <h4>happy</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'worried' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='worried'
                                    value='worried'
                                    checked={formData.emoji === 'worried'}
                                    onChange={() => handleInputChange('emotion', 'worried', 'worried')}
                                />
                                <label htmlFor='worried'>
                                    <img alt="worried" src={worried} />
                                    <h4>worried</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'frustrated' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='frustrated'
                                    value='frustrated'
                                    checked={formData.emoji === 'frustrated'}
                                    onChange={() => handleInputChange('emotion', 'frustrated', 'frustrated')}
                                />
                                <label htmlFor='frustrated'>
                                    <img alt="frustrated" src={frustrated} />
                                    <h4>frustrated</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'satisfied' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='satisfied'
                                    value='satisfied'
                                    checked={formData.emoji === 'satisfied'}
                                    onChange={() => handleInputChange('emotion', 'satisfied', 'satisfied')}
                                />
                                <label htmlFor='satisfied'>
                                    <img alt="satisfied" src={satisfied} />
                                    <h4>satisfied</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'energized' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='energized'
                                    value='energized'
                                    checked={formData.emoji === 'energized'}
                                    onChange={() => handleInputChange('emotion', 'energized', 'energized')}
                                />
                                <label htmlFor='energized'>
                                    <img alt="energized" src={energized} />
                                    <h4>energized</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'excited' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='excited'
                                    value='excited'
                                    checked={formData.emoji === 'excited'}
                                    onChange={() => handleInputChange('emotion', 'excited', 'excited')}
                                />
                                <label htmlFor='excited'>
                                    <img alt="excited" src={excited} />
                                    <h4>excited</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'angry' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='angry'
                                    value='angry'
                                    checked={formData.emoji === 'angry'}
                                    onChange={() => handleInputChange('emotion', 'angry', 'angry')}
                                />
                                <label htmlFor='angry'>
                                    <img alt="angry" src={angry} />
                                    <h4>angry</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'hopeless' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='hopeless'
                                    value='hopeless'
                                    checked={formData.emoji === 'hopeless'}
                                    onChange={() => handleInputChange('emotion', 'hopeless', 'hopeless')}
                                />
                                <label htmlFor='hopeless'>
                                    <img alt="hopeless" src={hopeless} />
                                    <h4>hopeless</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'panicking' ? 'selected' : ''}`} type="button" >
                                <input
                                    name="emotion"
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='panicking'
                                    value='panic'
                                    checked={formData.emoji === 'panic'}
                                    onChange={() => handleInputChange('emotion', 'panicking', 'panicking')}
                                />
                                <label htmlFor='panicking'>
                                    <img alt="panicking" src={panic} />
                                    <h4>panicking</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'exhausted' ? 'selected' : ''}`} type="button" >
                                <input
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='exhausted'
                                    value='exhausted'
                                    checked={formData.emoji === 'exhausted'}
                                    onChange={() => handleInputChange('emotion', 'exhausted', 'exhausted')}
                                    name="emotion"
                                />
                                <label htmlFor='exhausted'>
                                    <img alt="exhausted" src={exhausted} />
                                    <h4>exhausted</h4>
                                </label>
                            </button>
                        </li>
                        <li className='add-mood-quick__emote-menu-option'>
                            <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'irritable' ? 'selected' : ''}`} type="button" >
                                <input
                                    className='add-mood-quick__emote-option-eq'
                                    type='radio'
                                    id='irritable'
                                    value='irritable'
                                    checked={formData.emoji === 'irritable'}
                                    onChange={() => handleInputChange('emotion', 'irritable', 'irritable')}
                                    name="emotion"
                                />
                                <label htmlFor='irritable'>
                                    <img alt="irritable" src={irritable} />
                                    <h4>irritable</h4>
                                </label>
                            </button>
                        </li>
                    </ul>
                </article>
                <div className="error">{errors.emoji}</div>
            </div>
        </article>
    )

};

export default Emotes;