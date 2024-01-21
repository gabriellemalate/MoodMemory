import './QuickForm.scss';
import arrow from "../../assets/then.png"

import poorsleep from "../../assets/poor.png";
import okaysleep from "../../assets/okay.png";
import goodsleep from "../../assets/goodsleep.png";
import awesomesleep from "../../assets/awesome.png";
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
import React, { useState, useEffect, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const QuickForm = () => {
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

    // State update functions
    const handleStateChange = (selectedState) => {
        console.log('State Changed:', selectedState);
        setFormData((prevData) => ({ ...prevData, state: selectedState }));
    };

    const handleLevelChange = (selectedLevel) => {
        console.log('Level Changed:', selectedLevel);
        setFormData((prevData) => ({ ...prevData, level: selectedLevel }));
    };

    const handleNumberChange = (fieldName, selectedNumber) => {
        console.log('Number Changed:', fieldName, selectedNumber);
        setFormData((prevData) => ({ ...prevData, [fieldName]: selectedNumber }));
    };

    const handleQualityChange = (selectedQuality) => {
        console.log('Selected Quality:', selectedQuality);
        setFormData((prevData) => ({ ...prevData, quality: selectedQuality }));
    };

    const handleTitleChange = (title) => {
        console.log('Title Changed:', title);
        setFormData((prevData) => ({ ...prevData, title }));
    };

    const handleNotesChange = (notes) => {
        console.log('Notes Changed:', notes);
        setFormData((prevData) => ({ ...prevData, notes }));
    };

    const handleInputChange = (fieldName, emotion, emojiPath) => {
        console.log('Input Changed:', fieldName, emotion, emojiPath);
        setFormData((prevData) => ({ ...prevData, [fieldName]: emotion, emoji: emojiPath }));
    };

    useEffect(() => {
        const handleFileUpload = async () => {
            try {
                if (formData.emojiFile) {
                    // Upload emoji image to Firebase Storage
                    const emojiRef = ref(storage, 'emoji/' + formData.emojiName);
                    await uploadBytes(emojiRef, formData.emojiFile);

                    // Get the download URL
                    const emojiURL = await getDownloadURL(emojiRef);

                    // Update formData state with the emojiURL
                    setFormData((prevData) => ({ ...prevData, emoji: emojiURL }));
                }
            } catch (error) {
                console.error('Error uploading file:', error.message);
            }
        };

        // Call the handleFileUpload function
        handleFileUpload();
    }, [formData.emojiFile, formData.emojiName]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        // Validation checks
        let formIsValid = true;

        if (!formData.state) {
            setErrors((prevErrors) => ({ ...prevErrors, state: '*Select a Mood State' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, state: '' }));
        }

        if (!formData.quality) {
            setErrors((prevErrors) => ({ ...prevErrors, quality: '*Choose a sleep quality option' }));
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

            // Convert Date.now() to Firestore timestamp
            const firestoreTimestamp = Timestamp.fromMillis(Date.now());

            // Add a new document to the "moodlogs" collection with form data and timestamp
            const newMoodLogRef = await addDoc(moodlogsCollection, {
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
            });

            console.log('Form data submitted to moodlogs with ID:', newMoodLogRef.id);
        } catch (error) {
            console.error('Error submitting form data:', error.message);
        }
        navigate('/success');
    };

    return (
        <>
            <section className='add-mood-quick'>
                <h1 className='add-mood-quick__head'>
                    <span className='add-mood-quick__head-crop'>How are you feeling today,</span> <span className='add-mood-quick__head-crop-name'> {user ? user.displayName.split(' ')[0] : ''}?</span>

                </h1>
                <form className='add-mood-quick-only' onSubmit={handleSubmit}>
                    <article className='add-mood-quick__level'>
                        <h3 className='add-mood-quick__level-head'>Mood State</h3>
                        <p className='add-mood-quick__level-subhead'>think of this as your energy level</p>
                        <article className='add-mood-quick__level-state'>

                            <div className='add-mood-quick__level-state-container'>
                                <input
                                    className='add-mood-quick__level-state-opt'
                                    value="Depressed"
                                    id="depressed"
                                    type='radio'
                                    name="state"
                                    onClick={() => handleStateChange('Depressed')} />
                                <label className='add-mood-quick__level-state-option' htmlFor="depressed">Depressed</label>
                            </div>

                            <div className='add-mood-quick__level-state-container'>
                                <input
                                    className='add-mood-quick__level-state-opt'
                                    value="WNL"
                                    id="wnl"
                                    type='radio'
                                    name="state"
                                    title='"Within Normal Limits" No symptoms of depression or elevation'
                                    onClick={() => handleStateChange('WNL')} />
                                <label className='add-mood-quick__level-state-option' htmlFor="wnl">WNL</label>
                            </div>

                            <div className='add-mood-quick__level-state-container'>
                                <input
                                    className='add-mood-quick__level-state-opt'
                                    value="Elevated"
                                    id="elevated"
                                    type='radio'
                                    name="state"
                                    onClick={() => handleStateChange('Elevated')} />
                                <label className='add-mood-quick__level-state-option' htmlFor="elevated">Elevated</label>
                            </div>

                        </article>
                        <div className="error error-state">{errors.state}</div>

                        {formData.state === "Depressed" || formData.state === "Elevated" ? (
                            <article className='add-mood-quick__level-level'>
                                <img className='add-mood-quick__level-divider' alt="choose level level" src={arrow} />

                                <div className='add-mood-quick__level-level-all'>

                                    <div className='add-mood-quick__level-level-container'>
                                        <input
                                            className='add-mood-quick__level-level-opt'
                                            type='radio'
                                            value="Mild"
                                            name="level"
                                            id="Mild"
                                            onChange={() => handleLevelChange("Mild")}
                                        />
                                        <label className='add-mood-quick__level-level-option' htmlFor="Mild">Mild</label>
                                    </div>

                                    <div className='add-mood-quick__level-level-container'>
                                        <input
                                            className='add-mood-quick__level-level-opt'
                                            type='radio'
                                            value="Moderate"
                                            name="level"
                                            id="Moderate"
                                            onChange={() => handleLevelChange("Moderate")}
                                        />
                                        <label className='add-mood-quick__level-level-option' htmlFor="Moderate">Moderate</label>
                                    </div>

                                    <div className='add-mood-quick__level-level-container'>
                                        <input
                                            className='add-mood-quick__level-level-opt'
                                            type='radio'
                                            value="Severe"
                                            name="level"
                                            id="Severe"
                                            onChange={() => handleLevelChange("Severe")}
                                        />
                                        <label className='add-mood-quick__level-level-option' htmlFor="Severe">Severe</label>
                                    </div>

                                </div>
                            </article>
                        ) : null}
                    </article>

                    <article className='add-mood-quick__observations'>
                        <div className='add-mood-quick__observations-all'>
                            <h3 className='add-mood-quick__observations-all-head'>Imbalance Symptoms</h3>
                            <div className='add-mood-quick__observations-irritability'>
                                <label htmlFor="irritablity" className='add-mood-quick__observations-irritability-head'>irritability</label>
                                <select className='add-mood-quick__observations-irritability-menu'
                                    onChange={(e) => handleNumberChange('irritability', parseInt(e.target.value))}
                                >
                                    <optgroup className='add-mood-quick__observations-irritability-menugroup' label="irritability level">
                                        <option className='add-mood-quick__observations-irritability-menugroup-option'
                                            value="0"
                                            name="irritability">
                                            0 None
                                        </option>
                                        <option className='add-mood-quick__observations-irritability-menugroup-option'
                                            value="1"
                                            name="irritability">
                                            1 Mild
                                        </option>
                                        <option className='add-mood-quick__observations-irritability-menugroup-option'
                                            value="2"
                                            name="irritability">
                                            2 Moderate
                                        </option>
                                        <option className='add-mood-quick__observations-irritability-menugroup-option'
                                            value="3"
                                            name="irritability">
                                            3 Severe
                                        </option>
                                    </optgroup>
                                </select>
                            </div>

                            <div className='add-mood-quick__observations-anxiety'>
                                <label htmlFor="Anxiety" className='add-mood-quick__observations-anxiety-head'>anxiety</label>
                                <select className='add-mood-quick__observations-anxiety-menu'
                                    onChange={(e) => handleNumberChange('anxiety', parseInt(e.target.value))}
                                >
                                    <optgroup className='add-mood-quick__observations-anxiety-menugroup' label="anxiety level">
                                        <option className='add-mood-quick__observations-anxiety-menugroup-option'
                                            value="0"
                                            name="anxiety">
                                            0 None
                                        </option>
                                        <option className='add-mood-quick__observations-anxiety-menugroup-option'
                                            value="1"
                                            name="anxiety">
                                            1 Mild
                                        </option>
                                        <option className='add-mood-quick__observations-anxiety-menugroup-option'
                                            value="2"
                                            name="anxiety">
                                            2 Moderate
                                        </option>
                                        <option className='add-mood-quick__observations-anxiety-menugroup-option'
                                            value="3"
                                            name="anxiety">
                                            3 Severe
                                        </option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </article>

                    <article className='add-mood-quick__sleep'>
                        <div className='add-mood-quick__sleep-form'>
                            <h3 className='add-mood-quick__sleep-form-head'>Sleep</h3>

                            <div className='add-mood-quick__sleep-form-hours'>
                                <label htmlFor="hours slept" className='add-mood-quick__sleep-form-hours-head'>hours slept</label>
                                <select
                                    className='add-mood-quick__sleep-form-hours-menu'
                                    onChange={(e) => handleNumberChange('hours', parseInt(e.target.value))}
                                >
                                    <optgroup className='add-mood-quick__sleep-form-menugroup' label="number of hours">
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="zero">
                                            0
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="0">
                                            under 1 hour
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="1">
                                            1 hour
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="2">
                                            2 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="3">
                                            3 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="4">
                                            4 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="5">
                                            5 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="6">
                                            6 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="7">
                                            7 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="8">
                                            8 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="9">
                                            9 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="10">
                                            10 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="11">
                                            11 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="12">
                                            12 hours
                                        </option>
                                        <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="12">
                                            over 12
                                        </option>
                                    </optgroup>
                                </select>

                            </div>

                            <div className='add-mood-quick__sleep-form-quality'>
                                <h3 className='add-mood-quick__sleep-form-quality-head'>quality of sleep</h3>
                                <div className='add-mood-quick__sleep-form-quality-options'>
                                    <img className={`add-mood-quick__sleep-form-quality-option ${formData.quality === 'Poor' ? 'selected' : ''}`}
                                        src={poorsleep}
                                        alt="Poor sleep"
                                        name="quality"
                                        onClick={() => handleQualityChange('Poor')}
                                    />
                                    <img className={`add-mood-quick__sleep-form-quality-option ${formData.quality === 'Okay' ? 'selected' : ''}`}
                                        src={okaysleep}
                                        alt="Okay sleep"
                                        name="quality"
                                        onClick={() => handleQualityChange('Okay')}
                                    />
                                    <img className={`add-mood-quick__sleep-form-quality-option ${formData.quality === 'Good' ? 'selected' : ''}`}
                                        src={goodsleep}
                                        alt="Good sleep"
                                        name="quality"
                                        onClick={() => handleQualityChange('Good')}
                                    />
                                    <img className={`add-mood-quick__sleep-form-quality-option ${formData.quality === 'Awesome' ? 'selected' : ''}`}
                                        src={awesomesleep}
                                        alt="Awesome sleep"
                                        name="quality"
                                        onClick={() => handleQualityChange('Awesome')}
                                    />
                                </div>
                                <div className="error">{errors.quality}</div>
                            </div>
                        </div>
                    </article>

                    <article className='add-mood-quick__emote'>
                        <div className='add-mood-quick__emote-eq'>
                            <h3 className='add-mood-quick__emote-head'>Which best represents how you feel?</h3>
                            <article className='add-mood-quick__emote-menu'>
                                <ul className='add-mood-quick__emote-menu-eq'>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button type="button" className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/motivated.png' ? 'selected' : ''}`}>
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='motivated'
                                                value='../../assets/emotes/motivated.png'
                                                checked={formData.emoji === '../../assets/emotes/motivated.png'}
                                                onChange={() => handleInputChange('emotion', 'motivated', '../../assets/emotes/motivated.png')}
                                            />
                                            <label htmlFor='motivated'>
                                                <img className='add-mood-quick__emote-menu-option-emoji' alt="motivated" src={motivated} />
                                                <h4 className='add-mood-quick__emote-menu-option-title'>motivated</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/anxious.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='anxious'
                                                value='../../assets/emotes/anxious.png'
                                                checked={formData.emoji === '../../assets/emotes/anxious.png'}
                                                onChange={() => handleInputChange('emotion', 'anxious', '../../assets/emotes/anxious.png')}
                                            />
                                            <label htmlFor='anxious'>
                                                <img alt="anxious" src={anxious} />
                                                <h4>anxious</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/relaxed.png' ? 'selected' : ''}`} 
                                        type="button">
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='relaxed'
                                                value='../../assets/emotes/relaxed.png'
                                                checked={formData.emoji === '../../assets/emotes/relaxed.png'}
                                                onChange={() => handleInputChange('emotion', 'relaxed', '../../assets/emotes/relaxed.png')}
                                            />
                                            <label htmlFor='relaxed'>
                                                <img className='add-mood-quick__emote-menu-option--relaxed-emoji' alt="relaxed" src={relaxed} />
                                                <h4 className='add-mood-quick__emote-menu-option--relaxed-title'>relaxed</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/stressed.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='stressed'
                                                value='../../assets/emotes/stressed.png'
                                                checked={formData.emoji === '../../assets/emotes/stressed.png'}
                                                onChange={() => handleInputChange('emotion', 'stressed', '../../assets/emotes/stressed.png')}
                                            />
                                            <label htmlFor='stressed'>
                                                <img className='add-mood-quick__emote-menu-option--stressed-emoji' alt="stressed" src={stressed} />
                                                <h4 className='add-mood-quick__emote-menu-option--stressed-title'>stressed</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/unsure.png' ? 'selected' : ''}`} type="button">
                                            <input
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='unsure'
                                                value='../../assets/emotes/unsure.png'
                                                checked={formData.emoji === '../../assets/emotes/unsure.png'}
                                                onChange={() => handleInputChange('emotion', 'unsure', '../../assets/emotes/unsure.png')}
                                            />
                                            <label htmlFor='unsure'>
                                                <img alt="unsure" src={unsure} />
                                                <h4>unsure</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/tired.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='tired'
                                                value='../../assets/emotes/tired.png'
                                                checked={formData.emoji === '../../assets/emotes/tired.png'}
                                                onChange={() => handleInputChange('emotion', 'tired', '../../assets/emotes/tired.png')}
                                            />
                                            <label htmlFor='tired'>
                                                <img alt="tired" src={tired} />
                                                <h4>tired</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/content.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='content'
                                                value='../../assets/emotes/content.png'
                                                checked={formData.emoji === '../../assets/emotes/content.png'}
                                                onChange={() => handleInputChange('emotion', 'content', '../../assets/emotes/content.png')}
                                            />
                                            <label htmlFor='content'>
                                                <img alt="content" src={content} />
                                                <h4>content</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/grateful.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='grateful'
                                                value='../../assets/emotes/grateful.png'
                                                checked={formData.emoji === '../../assets/emotes/grateful.png'}
                                                onChange={() => handleInputChange('emotion', 'grateful', '../../assets/emotes/grateful.png')}
                                            />
                                            <label htmlFor='grateful'>
                                                <img alt="grateful" src={grateful} />
                                                <h4>grateful</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/down.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='down'
                                                value='../../assets/emotes/down.png'
                                                checked={formData.emoji === '../../assets/emotes/down.png'}
                                                onChange={() => handleInputChange('emotion', 'down', '../../assets/emotes/down.png')}
                                            />
                                            <label htmlFor='down'>
                                                <img alt="down" src={down} />
                                                <h4>down</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/sad.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='sad'
                                                value='../../assets/emotes/sad.png'
                                                checked={formData.emoji === '../../assets/emotes/sad.png'}
                                                onChange={() => handleInputChange('emotion', 'sad', '../../assets/emotes/sad.png')}
                                            />
                                            <label htmlFor='sad'>
                                                <img alt="sad" src={sad} />
                                                <h4>sad</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/proud.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='proud'
                                                value='../../assets/emotes/proud.png'
                                                checked={formData.emoji === '../../assets/emotes/proud.png'}
                                                onChange={() => handleInputChange('emotion', 'proud', '../../assets/emotes/proud.png')}
                                            />
                                            <label htmlFor='proud'>
                                                <img alt="proud" src={proud} />
                                                <h4>proud</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/unmotivated.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='unmotivated'
                                                value='../../assets/emotes/unmotivated.png'
                                                checked={formData.emoji === '../../assets/emotes/unmotivated.png'}
                                                onChange={() => handleInputChange('emotion', 'unmotivated', '../../assets/emotes/unmotivated.png')}
                                            />
                                            <label htmlFor='unmotivated'>
                                                <img alt="unmotivated" src={unmotivated} />
                                                <h4>unmotivated</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/annoyed.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='annoyed'
                                                value='../../assets/emotes/annoyed.png'
                                                checked={formData.emoji === '../../assets/emotes/annoyed.png'}
                                                onChange={() => handleInputChange('emotion', 'annoyed', '../../assets/emotes/annoyed.png')}
                                            />
                                            <label htmlFor='annoyed'>
                                                <img alt="annoyed" src={annoyed} />
                                                <h4>annoyed</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/loving.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='loving'
                                                value='../../assets/emotes/loving.png'
                                                checked={formData.emoji === '../../assets/emotes/loving.png'}
                                                onChange={() => handleInputChange('emotion', 'loving', '../../assets/emotes/loving.png')}
                                            />
                                            <label htmlFor='loving'>
                                                <img alt="loving" src={loving} />
                                                <h4>loving</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/happy.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='happy'
                                                value='../../assets/emotes/happy.png'
                                                checked={formData.emoji === '../../assets/emotes/happy.png'}
                                                onChange={() => handleInputChange('emotion', 'happy', '../../assets/emotes/happy.png')}
                                            />
                                            <label htmlFor='happy'>
                                                <img alt="happy" src={happy} />
                                                <h4>happy</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/worried.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='worried'
                                                value='../../assets/emotes/worried.png'
                                                checked={formData.emoji === '../../assets/emotes/worried.png'}
                                                onChange={() => handleInputChange('emotion', 'worried', '../../assets/emotes/worried.png')}
                                            />
                                            <label htmlFor='worried'>
                                                <img alt="worried" src={worried} />
                                                <h4>worried</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/frustrated.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='frustrated'
                                                value='../../assets/emotes/frustrated.png'
                                                checked={formData.emoji === '../../assets/emotes/frustrated.png'}
                                                onChange={() => handleInputChange('emotion', 'frustrated', '../../assets/emotes/frustrated.png')}
                                            />
                                            <label htmlFor='frustrated'>
                                                <img alt="frustrated" src={frustrated} />
                                                <h4>frustrated</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/satisfied.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='satisfied'
                                                value='../../assets/emotes/satisfied.png'
                                                checked={formData.emoji === '../../assets/emotes/satisfied.png'}
                                                onChange={() => handleInputChange('emotion', 'satisfied', '../../assets/emotes/satisfied.png')}
                                            />
                                            <label htmlFor='satisfied'>
                                                <img alt="satisfied" src={satisfied} />
                                                <h4>satisfied</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/energized.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='energized'
                                                value='../../assets/emotes/energized.png'
                                                checked={formData.emoji === '../../assets/emotes/energized.png'}
                                                onChange={() => handleInputChange('emotion', 'energized', '../../assets/emotes/energized.png')}
                                            />
                                            <label htmlFor='energized'>
                                                <img alt="energized" src={energized} />
                                                <h4>energized</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/excited.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='excited'
                                                value='../../assets/emotes/excited.png'
                                                checked={formData.emoji === '../../assets/emotes/excited.png'}
                                                onChange={() => handleInputChange('emotion', 'excited', '../../assets/emotes/excited.png')}
                                            />
                                            <label htmlFor='excited'>
                                                <img alt="excited" src={excited} />
                                                <h4>excited</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/angry.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='angry'
                                                value='../../assets/emotes/angry.png'
                                                checked={formData.emoji === '../../assets/emotes/angry.png'}
                                                onChange={() => handleInputChange('emotion', 'angry', '../../assets/emotes/angry.png')}
                                            />
                                            <label htmlFor='angry'>
                                                <img alt="angry" src={angry} />
                                                <h4>angry</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/hopeless.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='hopeless'
                                                value='../../assets/emotes/hopeless.png'
                                                checked={formData.emoji === '../../assets/emotes/hopeless.png'}
                                                onChange={() => handleInputChange('emotion', 'hopeless', '../../assets/emotes/hopeless.png')}
                                            />
                                            <label htmlFor='hopeless'>
                                                <img alt="hopeless" src={hopeless} />
                                                <h4>hopeless</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/panicking.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='panicking'
                                                value='../../assets/emotes/panicking.png'
                                                checked={formData.emoji === '../../assets/emotes/panicking.png'}
                                                onChange={() => handleInputChange('emotion', 'panicking', '../../assets/emotes/panicking.png')}
                                            />
                                            <label htmlFor='panicking'>
                                                <img alt="panicking" src={panic} />
                                                <h4>panicking</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/exhausted.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='exhausted'
                                                value='../../assets/emotes/exhausted.png'
                                                checked={formData.emoji === '../../assets/emotes/exhausted.png'}
                                                onChange={() => handleInputChange('emotion', 'exhausted', '../../assets/emotes/exhausted.png')}
                                                name="emotion"
                                            />
                                            <label htmlFor='exhausted'>
                                                <img alt="exhausted" src={exhausted} />
                                                <h4>exhausted</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === '../../assets/emotes/irritable.png' ? 'selected' : ''}`} type="button" >
                                            <input
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='irritable'
                                                value='../../assets/emotes/irritable.png'
                                                checked={formData.emoji === '../../assets/emotes/irritable.png'}
                                                onChange={() => handleInputChange('emotion', 'irritable', '../../assets/emotes/irritable.png')}
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

                    <article className='add-mood-quick__notes'>
                        <div className='add-mood-quick__notes-form'>
                            <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--title'>Title</h3>
                            <textarea
                                className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-title"
                                type="Text"
                                placeholder="optional"
                                name="title"
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                            <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--note'>Notes</h3>
                            <textarea
                                className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-note"
                                type="Text"
                                placeholder="add notes and symptoms or keep this blank"
                                name="notes"
                                value={formData.notes}
                                onChange={(e) => handleNotesChange(e.target.value)}
                            />
                        </div>
                    </article>


                    <div className="add-mood-quick-only__buttons">
                        <button className="add-mood-quick-only__submit" type="submit"
                            onClick={handleSubmit}>Log  +</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default QuickForm;