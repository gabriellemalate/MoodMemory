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
import React, { useState } from 'react';
import axios from 'axios';

const QuickForm = ({ onFormSubmit }) => {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState({
        moodState: '',
        level: '',
        title: '',
        notes: '',
        // other form fields
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "moodState") {
            // Handle moodState changes using handleMoodStateChange
            handleMoodStateChange(e);
        } else {
            // For other fields, update the form data as usual
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleMoodStateChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            moodState: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted');

        console.log('Current Form Data:', formData);

        // validate form data and make sure all required fields are filled
        if ((formData.moodState === "Depressed" || formData.moodState === "Elevated") && !formData.level) {
            // Log the values causing the alert
            console.log('Alert Triggered - moodState:', formData.moodState, 'level:', formData.level);
            alert('Please select a level');
            return;
        }
        try {
            console.log('Form Data:', formData);
            // send the form input to the backend API using Axios
            const response = await axios.post('http://localhost:8081/moods/moods', formData);

            if (response.status === 201) {
                // if mood data was successfully saved
                console.log('Mood data saved:', response.data);

                // send the form input to the parent component or a function passed as a prop
                onFormSubmit(formData);

                // reset the form if needed
                setFormData({
                    moodState: '',
                    level: '',
                    title: '',
                    notes: '',
                });

            } else {
                console.error('Failed to save mood data');
                alert('Failed to save mood data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form');
        }
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
                                    name="moodState"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleMoodStateChange(e);
                                    }} />
                                <label className='add-mood-quick__level-state-option' htmlFor="depressed">depressed</label>
                            </div>

                            <div className='add-mood-quick__level-state-container'>
                                <input
                                    className='add-mood-quick__level-state-opt'
                                    value="wnl"
                                    id="wnl"
                                    type='radio'
                                    title='"Within Normal Limits" No symptoms of depression or elevation' name="moodState"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleMoodStateChange(e);
                                    }} />
                                <label className='add-mood-quick__level-state-option' htmlFor="wnl">wnl</label>
                            </div>

                            <div className='add-mood-quick__level-state-container'>
                                <input
                                    className='add-mood-quick__level-state-opt'
                                    value="Elevated"
                                    id="elevated"
                                    type='radio'
                                    name="moodState"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleMoodStateChange(e);
                                    }} />
                                <label className='add-mood-quick__level-state-option' htmlFor="elevated">elevated</label>
                            </div>

                        </article>

                        {formData.moodState === "Depressed" || formData.moodState === "Elevated" ? (
                            <article className='add-mood-quick__level-level'>
                                <img className='add-mood-quick__level-divider' alt="choose level level" src={arrow} />

                                <div className='add-mood-quick__level-level-all'>

                                    <div className='add-mood-quick__level-level-container'>
                                        <input
                                            className='add-mood-quick__level-level-opt'
                                            type='radio'
                                            value="mild"
                                            name="level"
                                            onChange={handleChange}
                                        />
                                        <label className='add-mood-quick__level-level-option' htmlFor="mild">mild</label>
                                    </div>

                                    <div className='add-mood-quick__level-level-container'>
                                        <input
                                            className='add-mood-quick__level-level-opt'
                                            type='radio'
                                            value="moderate"
                                            name="level"
                                            onChange={handleChange}
                                        />
                                        <label className='add-mood-quick__level-level-option' htmlFor="moderate">moderate</label>
                                    </div>

                                    <div className='add-mood-quick__level-level-container'>
                                        <input
                                            className='add-mood-quick__level-level-opt'
                                            type='radio'
                                            value="severe"
                                            name="level"
                                            onChange={handleChange}
                                        />
                                        <label className='add-mood-quick__level-level-option' htmlFor="severe">severe</label>
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
                            <select className='add-mood-quick__observations-irritability-menu'>
                                <optgroup className='add-mood-quick__observations-irritability-menugroup' label="irritability level">
                                    <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--none'>
                                        0 None
                                    </option>
                                    <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--mild'>
                                        1 Mild
                                    </option>
                                    <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--mod'>
                                        2 Moderate
                                    </option>
                                    <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--sev'>
                                        3 Severe
                                    </option>
                                </optgroup>
                            </select>
                        </div>

                        <div className='add-mood-quick__observations-anxiety'>
                            <label htmlFor="Anxiety" className='add-mood-quick__observations-anxiety-head'>anxiety</label>
                            <select className='add-mood-quick__observations-anxiety-menu'>
                                <optgroup className='add-mood-quick__observations-anxiety-menugroup' label="anxiety level">
                                    <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--none'>
                                        0 None
                                    </option>
                                    <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--mild'>
                                        1 Mild
                                    </option>
                                    <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--mod'>
                                        2 Moderate
                                    </option>
                                    <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--sev'>
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
                            <select className='add-mood-quick__sleep-form-hours-menu'>
                                <optgroup className='add-mood-quick__sleep-form-menugroup' label="number of hours">
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="zero" value="zero">
                                        0
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="< 1" value="< 1">
                                        under 1 hour
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="1" value="1">
                                        1 hour
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="2" value="2">
                                        2 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="3" value="3">
                                        3 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="4" value="4">
                                        4 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="5" value="5">
                                        5 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="6" value="6">
                                        6 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="7" value="7">
                                        7 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="8" value="8">
                                        8 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="9" value="9">
                                        9 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="10" value="10">
                                        10 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="11" value="11">
                                        11 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="12" value="12">
                                        12 hours
                                    </option>
                                    <option className='add-mood-quick__sleep-form-menugroup-option' name="> 12" value="> 12">
                                        over 12
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <div className='add-mood-quick__sleep-form-quality'>
                            <label htmlFor="sleep quality" className='add-mood-quick__sleep-form-quality-head'>quality of sleep</label>
                            <div className='add-mood-quick__sleep-form-quality-options'>
                                <img className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-poor' type="image" src={poorsleep} alt="poor sleep" />
                                <img className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-ok' type="image" src={okaysleep} alt="okay sleep" />
                                <img className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-good' type="image" src={goodsleep} alt="good sleep" />
                                <img className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-awesome' type="image" src={awesomesleep} alt="awesome sleep" />
                            </div>
                        </div>
                    </div>
                </article>

                                <article className='add-mood-quick__emote'>
                    <div className='add-mood-quick__emote-eq'>
                        <h3 className='add-mood-quick__emote-head'>Which best represents how you feel?</h3>
                        <article className='add-mood-quick__emote-menu'>
                            <ul className='add-mood-quick__emote-menu-eq'>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--motivated'>
                                    <button type="button" className='add-mood-quick__emote-menu-option--motivated-button add-mood-quick__emote-menu-option--buttonpress'>
                                        <div className='add-mood-quick__emote-menu-option--motivated-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--motivated-emoji' alt="motivated" src={motivated} />
                                            <h4 className='add-mood-quick__emote-menu-option--motivated-title'>motivated</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--anxious'>
                                    <button className='add-mood-quick__emote-menu-option--anxious-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--anxious-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--anxious-emoji' alt="anxious" src={anxious} />
                                            <h4 className='add-mood-quick__emote-menu-option--anxious-title'>anxious</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--relaxed'>
                                    <button className='add-mood-quick__emote-menu-option--relaxed-button add-mood-quick__emote-menu-option--buttonpress' type="button">
                                        <div className='add-mood-quick__emote-menu-option--relaxed-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--relaxed-emoji' alt="relaxed" src={relaxed} />
                                            <h4 className='add-mood-quick__emote-menu-option--relaxed-title'>relaxed</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--stressed'>
                                    <button className='add-mood-quick__emote-menu-option--stressed-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--stressed-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--stressed-emoji' alt="stressed" src={stressed} />
                                            <h4 className='add-mood-quick__emote-menu-option--stressed-title'>stressed</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--unsure'>
                                    <button className='add-mood-quick__emote-menu-option--unsure-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--unsure-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--unsure-emoji' alt="unsure" src={unsure} />
                                            <h4 className='add-mood-quick__emote-menu-option--unsure-title'>unsure</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--tired'>
                                    <button className='add-mood-quick__emote-menu-option--tired-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--tired-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--tired-emoji' alt="tired" src={tired} />
                                            <h4 className='add-mood-quick__emote-menu-option--tired-title'>tired</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--content'>
                                    <button className='add-mood-quick__emote-menu-option--content-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--content-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--content-emoji' alt="content" src={content} />
                                            <h4 className='add-mood-quick__emote-menu-option--content-title'>content</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--grateful'>
                                    <button className='add-mood-quick__emote-menu-option--grateful-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--grateful-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--grateful-emoji' alt="grateful" src={grateful} />
                                            <h4 className='add-mood-quick__emote-menu-option--grateful-title'>grateful</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--down'>
                                    <button className='add-mood-quick__emote-menu-option--down-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--down-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--down-emoji' alt="down" src={down} />
                                            <h4 className='add-mood-quick__emote-menu-option--down-title'>down</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--sad'>
                                    <button className='add-mood-quick__emote-menu-option--sad-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--sad-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--sad-emoji' alt="sad" src={sad} />
                                            <h4 className='add-mood-quick__emote-menu-option--sad-title'>sad</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--proud'>
                                    <button className='add-mood-quick__emote-menu-option--proud-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--proud-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--proud-emoji' alt="proud" src={proud} />
                                            <h4 className='add-mood-quick__emote-menu-option--proud-title'>proud</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--unmotivated'>
                                    <button className='add-mood-quick__emote-menu-option--unmotivated-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--unmotivated-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--unmotivated-emoji' alt="unmotivated" src={unmotivated} />
                                            <h4 className='add-mood-quick__emote-menu-option--unmotivated-title'>unmotivated</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--annoyed'>
                                    <button className='add-mood-quick__emote-menu-option--annoyed-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--annoyed-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--annoyed-emoji' alt="annoyed" src={annoyed} />
                                            <h4 className='add-mood-quick__emote-menu-option--annoyed-title'>annoyed</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--loving'>
                                    <button className='add-mood-quick__emote-menu-option--loving-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--loving-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--loving-emoji' alt="loving" src={loving} />
                                            <h4 className='add-mood-quick__emote-menu-option--loving-title'>loving</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--happy'>
                                    <button className='add-mood-quick__emote-menu-option--happy-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--happy-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--happy-emoji' alt="happy" src={happy} />
                                            <h4 className='add-mood-quick__emote-menu-option--happy-title'>happy</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--worried'>
                                    <button className='add-mood-quick__emote-menu-option--worried-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--worried-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--worried-emoji' alt="worried" src={worried} />
                                            <h4 className='add-mood-quick__emote-menu-option--worried-title'>worried</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--frustrated'>
                                    <button className='add-mood-quick__emote-menu-option--frustrated-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--frustrated-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--frustrated-emoji' alt="frustrated" src={frustrated} />
                                            <h4 className='add-mood-quick__emote-menu-option--frustrated-title'>frustrated</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--satisfied'>
                                    <button className='add-mood-quick__emote-menu-option--satisfied-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--satisfied-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--satisfied-emoji' alt="satisfied" src={satisfied} />
                                            <h4 className='add-mood-quick__emote-menu-option--satisfied-title'>satisfied</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--energized'>
                                    <button className='add-mood-quick__emote-menu-option--energized-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--energized-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--energized-emoji' alt="energized" src={energized} />
                                            <h4 className='add-mood-quick__emote-menu-option--energized-title'>energized</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--excited'>
                                    <button className='add-mood-quick__emote-menu-option--excited-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--excited-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--excited-emoji' alt="excited" src={excited} />
                                            <h4 className='add-mood-quick__emote-menu-option--excited-title'>excited</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--angry'>
                                    <button className='add-mood-quick__emote-menu-option--angry-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--angry-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--angry-emoji' alt="angry" src={angry} />
                                            <h4 className='add-mood-quick__emote-menu-option--angry-title'>angry</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--hopeless'>
                                    <button className='add-mood-quick__emote-menu-option--hopeless-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--hopeless-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--hopeless-emoji' alt="hopeless" src={hopeless} />
                                            <h4 className='add-mood-quick__emote-menu-option--hopeless-title'>hopeless</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--panicking'>
                                    <button className='add-mood-quick__emote-menu-option--panicking-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--panicking-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--panicking-emoji' alt="panicking" src={panic} />
                                            <h4 className='add-mood-quick__emote-menu-option--panicking-title'>panicking</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--exhausted'>
                                    <button className='add-mood-quick__emote-menu-option--exhausted-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--exhausted-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--exhausted-emoji' alt="exhausted" src={exhausted} />
                                            <h4 className='add-mood-quick__emote-menu-option--exhausted-title'>exhausted</h4>
                                        </div>
                                    </button>
                                </li>
                                <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--irritable'>
                                    <button className='add-mood-quick__emote-menu-option--irritable-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                                        <div className='add-mood-quick__emote-menu-option--irritable-button-eq'>
                                            <img className='add-mood-quick__emote-menu-option--irritable-emoji' alt="irritable" src={irritable} />
                                            <h4 className='add-mood-quick__emote-menu-option--irritable-title'>irritable</h4>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </article>
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
                                onChange={handleChange}
                            />
                            <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--note'>Notes</h3>
                            <textarea
                                className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-note"
                                type="Text"
                                placeholder="add notes and symptoms or keep this blank"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    </article>


                    <div className="add-mood-quick-only__buttons">
                        <button className="add-mood-quick-only__submit" type="submit">Log  +</button>
                    </div>
                </form>

            </section>
        </>
    );
};

export default QuickForm;