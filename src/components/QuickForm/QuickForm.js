import './QuickForm.scss';
import arrow from "../../assets/then.png"

import poorsleep from "../../assets/Poor.png";
import okaysleep from "../../assets/Okay.png";
import goodsleep from "../../assets/Good.png";
import awesomesleep from "../../assets/Awesome.png";
import angry from "../../assets/emotes/angry.png";
import annoyed from "../../assets/emotes/annoyed.png";
import anxious from "../../assets/emotes/anxious.png";
import wired from "../../assets/emotes/wired.png";
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
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
// import NavigationPrompt from './NavigationPrompt';

const QuickForm = () => {
    const [user] = useAuthState(auth);
    const [selectedVictories, setSelectedVictories] = useState([]);
    const [selectedTriggers, setSelectedTriggers] = useState([]);
    const [selectedHurdles, setSelectedHurdles] = useState([]);
    const [selectedConsumptions, setSelectedConsumptions] = useState([]);
    const [customTrigger, setCustomTrigger] = useState('');
    const [sleepHoursTouched, setSleepHoursTouched] = useState(false); 
    const [customVictory, setCustomVictory] = useState('');
    const [customHurdle, setCustomHurdle] = useState('');
    const [customConsumption, setCustomConsumption] = useState('');

    const handleCustomVictoryChange = (event) => {
        setCustomVictory(event.target.value);
    };

    const handleCustomHurdleChange = (event) => {
        setCustomHurdle(event.target.value);
    };

    const handleCustomConsumptionChange = (event) => {
        setCustomConsumption(event.target.value);
    };

    const handleCustomVictoryAdd = () => {
        if (customVictory.trim() !== '') {
            const updatedVictories = [...selectedVictories, customVictory.trim()];
            setSelectedVictories(updatedVictories);
            setCustomVictory('');
        }
    };

    const handleCustomHurdleAdd = () => {
        if (customHurdle.trim() !== '') {
            const updatedHurdles = [...selectedHurdles, customHurdle.trim()];
            setSelectedHurdles(updatedHurdles);
            setCustomHurdle('');
        }
    };

    const handleCustomConsumptionAdd = () => {
        if (customConsumption.trim() !== '') {
            const updatedConsumptions = [...selectedConsumptions, customConsumption.trim()];
            setSelectedConsumptions(updatedConsumptions);
            setCustomConsumption('');
        }
    };

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
        victories: '',
        hurdles: '',
        consumptions: '',
    });
    const [errors, setErrors] = useState({
        state: '',
        anxiety: '',
        irritability: '',
        hours: '',
        quality: '',
        hours: '',
        emoji: '',
        emotion: '',
    });
    const navigate = useNavigate();

    const getGraphValue = (state, level) => {
        if (state === 'Depressed') {
            if (level === 'Severe') return 0;
            if (level === 'Moderate') return 1;
            if (level === 'Mild') return 2;
        } else if (state === 'WNL') {
            return 3;
        } else if (state === 'Elevated') {
            if (level === 'Mild') return 4;
            if (level === 'Moderate') return 5;
            if (level === 'Severe') return 6;
        }
        return null; // Default case if state or level is invalid
    };

    // State update functions
    const handleStateChange = (selectedState) => {
        console.log('State Changed:', selectedState);
        setFormData((prevData) => ({ ...prevData, state: selectedState }));
    };

    const handleTriggerChange = (trigger) => {
        const updatedTriggers = selectedTriggers.includes(trigger)
            ? selectedTriggers.filter((t) => t !== trigger)
            : [...selectedTriggers, trigger];
        setSelectedTriggers(updatedTriggers);
    };

    const handleCustomTriggerChange = (event) => {
        setCustomTrigger(event.target.value);
    };

    const handleCustomTriggerAdd = () => {
        if (customTrigger.trim() !== '') {
            const updatedTriggers = [...selectedTriggers, customTrigger.trim()];
            setSelectedTriggers(updatedTriggers);
            setCustomTrigger('');
        }
    };

    const handleCustomTriggerRemove = (trigger) => {
        const updatedTriggers = selectedTriggers.filter((t) => t !== trigger);
        setSelectedTriggers(updatedTriggers);
    };

    const triggerOptions = [
        "myself",
        "work",
        "partner",
        "family",
        "friends",
        "sleep",
        "health",
        "food",
        "exercise",
        "finance",
        "home",
        "hobbies"
    ];

    const handleLevelChange = (selectedLevel) => {
        console.log('Level Changed:', selectedLevel);
        setFormData((prevData) => ({ ...prevData, level: selectedLevel }));
    };

    const handleNumberChange = (fieldName, selectedNumber) => {
        console.log('Number Changed:', fieldName, selectedNumber);
        const numberValue = selectedNumber === 'zero' ? '0' : selectedNumber;
        setFormData((prevData) => ({ ...prevData, [fieldName]: numberValue }));
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

    const handleVictoriesChange = (victory) => {
        const updatedVictories = selectedVictories.includes(victory)
            ? selectedVictories.filter((v) => v !== victory)
            : [...selectedVictories, victory];
        setSelectedVictories(updatedVictories);
        console.log("Selected Victories:", updatedVictories);
    };

    const handleHurdlesChange = (hurdle) => {
        const updatedHurdles = selectedHurdles.includes(hurdle)
            ? selectedHurdles.filter((h) => h !== hurdle)
            : [...selectedHurdles, hurdle];
        setSelectedHurdles(updatedHurdles);
        console.log("Selected Hurdles:", updatedHurdles);
    };

    const handleConsumptionChange = (consumption) => {
        const updatedConsumptions = selectedConsumptions.includes(consumption)
            ? selectedConsumptions.filter((c) => c !== consumption)
            : [...selectedConsumptions, consumption];
        setSelectedConsumptions(updatedConsumptions);
        console.log("Selected Consumptions:", updatedConsumptions);
    };

    const handleInputChange = (fieldName, emotion, emojiPath) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: emotion, emoji: emojiPath }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        setSleepHoursTouched(true);

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

        if ((formData.state === 'Depressed' || formData.state === 'Elevated') && !formData.level) {
            setErrors((prevErrors) => ({ ...prevErrors, level: '*Select a severity level' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, level: '' }));
        }

        if (formData.hours !== 0 && !formData.quality) {
            setErrors((prevErrors) => ({ ...prevErrors, quality: '*Select a quality of restfulness' }));
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

        if (formData.hours === '0' && !sleepHoursTouched) { // Check if sleep hours dropdown is touched and selected to "0"
            setErrors((prevErrors) => ({ ...prevErrors, hours: '*Select the number of hours slept' }));
            formIsValid = false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, hours: '' }));
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

            const docId = `${user.displayName}_${uuidv4()}`;

            const moodLogDocRef = doc(moodlogsCollection, docId);

            // Add a new document to the "moodlogs" collection with form data and timestamp
            await setDoc(moodLogDocRef, {
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
                victories: selectedVictories,
                hurdles: selectedHurdles,
                consumptions: selectedConsumptions,
                triggers: selectedTriggers,
                // customDate: '',
            });
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
                <form className='add-mood-quick-only'
                    onSubmit={handleSubmit}
                >

                    <article className='mobileonly'>
                        <div className='add-mood-quick__emote-eq'>
                            <div className='add-mood-quick__emote-head'>
                                {(!formData.emoji && !errors.emoji) && <span className="required">*</span>}Which best represents how you feel?</div>
                            <article className='add-mood-quick__emote-menu'>
                                <ul className='add-mood-quick__emote-menu-eq'>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`blue add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'anxious' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`yellow add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'tired' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`green add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'happy' ? 'selected' : ''}`} type="button" >
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
                                        <button type="button" className={`red add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'motivated' ? 'selected' : ''}`}>
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
                                        <button className={`red add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'excited' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`blue add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'unmotivated' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`yellow add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'annoyed' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`green add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'loving' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`red add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'proud' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`red add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'energized' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`blue add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'down' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`orange add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'irritable' ? 'selected' : ''}`} type="button" >
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
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`green add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'relaxed' ? 'selected' : ''}`}
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
                                        <button className={`green add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'satisfied' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`green add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'grateful' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`black add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'exhausted' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`orange add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'worried' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`orange add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'stressed' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`liteyellow add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'unsure' ? 'selected' : ''}`} type="button">
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
                                        <button className={`liteyellow add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'wired' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='wired'
                                                value='wired'
                                                checked={formData.emoji === 'wired'}
                                                onChange={() => handleInputChange('emotion', 'wired', 'wired')}
                                            />
                                            <label htmlFor='wired'>
                                                <img alt="wired" src={wired} />
                                                <h4>wired</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`black add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'hopeless' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`black add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'panic' ? 'selected' : ''}`} type="button" >
                                            <input
                                                name="emotion"
                                                className='add-mood-quick__emote-option-eq'
                                                type='radio'
                                                id='panic'
                                                value='panic'
                                                checked={formData.emoji === 'panic'}
                                                onChange={() => handleInputChange('emotion', 'panic', 'panic')}
                                            />
                                            <label htmlFor='panic'>
                                                <img alt="panic" src={panic} />
                                                <h4>panicking</h4>
                                            </label>
                                        </button>
                                    </li>
                                    <li className='add-mood-quick__emote-menu-option'>
                                        <button className={`deepblue add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'frustrated' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`deepblue add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'angry' ? 'selected' : ''}`} type="button" >
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
                                        <button className={`deepblue add-mood-quick__emote-menu-option--buttonpress ${formData.emoji === 'sad' ? 'selected' : ''}`} type="button" >
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

                                </ul>
                            </article>
                            <div className="error">{errors.emoji}</div>
                        </div>
                    </article>

                    <article className='add-mood-quick__level'>
                        <div className='add-mood-quick__level-head'>
                            {/* Conditionally render the required label */}
                            {(!formData.state && !errors.state) && <span className="required">*</span>}
                            Mood State
                        </div>

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

                            <div className='add-mood-quick__level-state-container' title='"Within Normal Limits" No symptoms of depression or elevation'>
                                <input
                                    className='add-mood-quick__level-state-opt'
                                    value="WNL"
                                    id="wnl"
                                    type='radio'
                                    name="state"
                                    title='"Within Normal Limits" No symptoms of depression or elevation'
                                    onClick={() => handleStateChange('WNL')} />
                                <label className='add-mood-quick__level-state-option' htmlFor="wnl" title='"Within Normal Limits" No symptoms of depression or elevation'>WNL</label>
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
                                {/* Add code for mood levels */}
                            </article>
                        ) : null}

                        {formData.state === "Depressed" || formData.state === "Elevated" ? (

                            <article className='add-mood-quick__level-level'>

                                <img className='add-mood-quick__level-divider' alt="choose level level" src={arrow} />

                                <div className='add-mood-quick__level-level-all'>
                                    {(!formData.level && !errors.level) && <span className="required">*</span>}
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
                                <div className="error error-state">{errors.level}</div>
                            </article>
                        ) : null}
                    </article>

                    <article className='add-mood-quick__observations'>
                        <div className='add-mood-quick__observations-all'>
                            <div className='add-mood-quick__observations-all-head'>
                                Imbalance Symptoms</div>
                            <div className='add-mood-quick__observations-irritability'>
                                <label htmlFor="irritablity" className='add-mood-quick__observations-irritability-head'>
                                    irritability</label>
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
                            <div className='add-mood-quick__sleep-form-eq'>
                                <div className='add-mood-quick__sleep-form-hours'>
                                    <label htmlFor="hours slept" className='add-mood-quick__sleep-form-hours-head'>{(!formData.hours && !errors.hours) && <span className="required">*</span>}hours slept</label>
                                    <select
                                        className='add-mood-quick__sleep-form-hours-menu'
                                        onChange={(e) => handleNumberChange('hours', parseInt(e.target.value))}
                                    >
                                        <optgroup className='add-mood-quick__sleep-form-menugroup' label="number of hours">
                                            <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="0">
                                                0
                                            </option>
                                            <option className='add-mood-quick__sleep-form-menugroup-option' name="hours" value="1">
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
                                    {errors.hours && <div className="error">Hours of sleep is required</div>}
                                </div>

                                <div className='add-mood-quick__sleep-form-quality'>
                                    <div className='add-mood-quick__sleep-form-quality-head'>
                                        {(!formData.quality && !errors.quality) && <span className="required">*</span>}quality of sleep</div>
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
                                    {formData.hours !== '0' && formData.quality !== '' && <div className="error">{errors.quality}</div>}
                                    <div className="error">{errors.quality}</div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className='additional'>
                        <article className='additional-victories'>
                            <h3 className='add-mood-quick__level-head additional-head'>Victories</h3>
                            <div className='additional-list'>
                                <button type="button" className={`additional-victory additional-list-item ${selectedVictories.includes('movement') ? 'selected' : ''}`} onClick={() => handleVictoriesChange('movement')}>
                                    movement
                                </button>
                                <button type="button" className={`additional-victory additional-list-item ${selectedVictories.includes('chores') ? 'selected' : ''}`} onClick={() => handleVictoriesChange('chores')}>
                                    chores
                                </button>
                                <button type="button" className={`additional-victory additional-list-item ${selectedVictories.includes('mindfulness') ? 'selected' : ''}`} onClick={() => handleVictoriesChange('mindfulness')}>
                                    mindful activity
                                </button>
                                <button type="button" className={`additional-victory additional-list-item ${selectedVictories.includes('learning') ? 'selected' : ''}`} onClick={() => handleVictoriesChange('learning')}>
                                    learning
                                </button>
                            </div>
                            <div className="userpage__triggers-add">
                                <input
                                    type="text"
                                    className="userpage__triggers-add-input"
                                    placeholder="custom victory"
                                />
                                <button
                                    className="userpage__triggers-add-press"
                                    type='button'
                                >
                                    +
                                </button>
                            </div>
                        </article>
                        <article className='additional-hurdles'>
                            <h3 className='add-mood-quick__level-head additional-head'>Hurdles</h3>
                            <div className='additional-list'>
                                <button type="button" className={`additional-hurdle additional-list-item ${selectedHurdles.includes('rumination') ? 'selected' : ''}`} onClick={() => handleHurdlesChange('rumination')}>
                                    rumination
                                </button>
                                <button type="button" className={`additional-hurdle additional-list-item ${selectedHurdles.includes('procrastination') ? 'selected' : ''}`} onClick={() => handleHurdlesChange('procrastination')}>
                                    procrastination
                                </button>
                                <button type="button" className={`additional-hurdle additional-list-item ${selectedHurdles.includes('isolation') ? 'selected' : ''}`} onClick={() => handleHurdlesChange('isolation')}>
                                    isolation
                                </button>
                                <button type="button" className={`additional-hurdle additional-list-item ${selectedHurdles.includes('panicked') ? 'selected' : ''}`} onClick={() => handleHurdlesChange('panicked')}>
                                    panic attack
                                </button>
                            </div>
                            <div className="userpage__triggers-add">
                                <input
                                    type="text"
                                    className="userpage__triggers-add-input"
                                    placeholder="custom hurdle"
                            
                                />
                                <button
                                    className="userpage__triggers-add-press"
                                    type='button'
                                >
                                    +
                                </button>
                            </div>
                        </article>
                        <article className='additional-triggers'>
                            <h3 className='add-mood-quick__level-head additional-head'>Triggers</h3>
                            <div className='additional-list'>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('myself') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('myself')}>
                                    myself
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('work') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('work')}>
                                    work
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('partner') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('partner')}>
                                    partner
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('family') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('family')}>
                                    family
                                </button>

                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('friends') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('friends')}>
                                    friends
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('sleep') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('sleep')}>
                                    sleep
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('health') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('health')}>
                                    health
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('food') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('food')}>
                                    food
                                </button>

                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('exercise') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('exercise')}>
                                    exercise
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('finance') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('finance')}>
                                    finance
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('home') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('home')}>
                                    home
                                </button>
                                <button type="button" className={`additional-list-trigger ${selectedTriggers.includes('hobbies') ? 'selected' : ''}`}
                                    onClick={() => handleTriggerChange('hobbies')}>
                                    hobbies
                                </button>
                                {selectedTriggers.map((trigger) => {
                                    // Check if the trigger is a custom trigger (not present in predefined trigger options)
                                    const isCustomTrigger = !triggerOptions.includes(trigger);
                                    // Render only if it's a custom trigger
                                    if (isCustomTrigger) {
                                        return (
                                            <button
                                                key={trigger}
                                                type="button"
                                                className="additional-list-trigger additional-list-custom selected"
                                                onClick={() => handleCustomTriggerRemove(trigger)}
                                            >
                                                {trigger}
                                            </button>
                                        );
                                    }
                                    return null; // Don't render predefined triggers
                                })}
                            </div>

                            <div className="userpage__triggers-add">
                                <input
                                    type="text"
                                    className="userpage__triggers-add-input"
                                    placeholder="custom trigger"
                                    value={customTrigger}
                                    onChange={handleCustomTriggerChange}
                                />
                                <button
                                    className="userpage__triggers-add-press"
                                    onClick={handleCustomTriggerAdd}
                                    type='button'
                                >
                                    +
                                </button>
                            </div>

                        </article>
                        <article className='additional-consumption'>
                            <h3 className='add-mood-quick__level-head additional-head'>Consumption</h3>
                            <div className='additional-list'>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('forgot to eat') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('forgot to eat')}>
                                    forgot to eat
                                </button>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('fasting') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('fasting')}>
                                    fasting
                                </button>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('snack') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('snack')}>
                                    snack
                                </button>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('full meal') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('full meal')}>
                                    full meal
                                </button>

                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('junk food') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('junk food')}>
                                    junk food
                                </button>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('healthy eats') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('healthy eats')}>
                                    healthy eats
                                </button>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('supplements') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('supplements')}>
                                    supplements
                                </button>
                                <button type="button" className={`additional-list-item additional-list-button ${selectedConsumptions.includes('medication') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('medication')}>
                                    medication
                                </button>

                                <button type="button" className={`smaller additional-list-item additional-list-button ${selectedConsumptions.includes('caffeine') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('caffeine')}>
                                    caffeine
                                </button>
                                <button type="button" className={`smaller additional-list-item additional-list-button ${selectedConsumptions.includes('cannabis') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('cannabis')}>
                                    cannabis
                                </button>
                                <button type="button" className={`smaller additional-list-item additional-list-button ${selectedConsumptions.includes('alcohol') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('alcohol')}>
                                    alcohol
                                </button>
                                <button type="button" className={`smaller additional-list-item additional-list-button ${selectedConsumptions.includes('tobacco') ? 'selected' : ''}`} onClick={() => handleConsumptionChange('tobacco')}>
                                    tobacco
                                </button>
                            </div>
                        </article>
                    </div>

                    <article className='add-mood-quick__notes'>
                        <div className='add-mood-quick__notes-form'>
                            <div className='add-mood-quick__notes-form-eq'>
                                <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--title'>Title</h3>
                                <textarea
                                    className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-title"
                                    type="Text"
                                    placeholder="a personal flare~"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                />
                                <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--note'>Notes</h3>
                                <textarea
                                    className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-note"
                                    type="Text"
                                    placeholder="notes / symptoms / ideas or keep this blank"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={(e) => handleNotesChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="add-mood-quick-only__buttons form-group">
                            {/* <div className="form-group-custom">
                                <label className="form-group-custom-title" htmlFor="customDate">Retroactive Log (Optional)</label>
                                <input className="form-group-custom-calendar"
                                    type="date"
                                    id="customDate"
                                    name="customDate"
                                    value={formData.customDate}
                                    onChange={(e) => setFormData({ ...formData, customDate: e.target.value })}
                                />
                            </div> */}
                            <button
                                className="add-mood-quick-only__submit"
                                type="submit"
                                onClick={handleSubmit}
                            >Log!</button>
                        </div>
                    </article>
                </form >
            </section >
        </>
    );
};

export default QuickForm;