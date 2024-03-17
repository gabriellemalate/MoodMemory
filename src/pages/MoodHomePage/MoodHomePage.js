import './MoodHomePage.scss';
import React, { useEffect, useRef, useState } from "react";

import QuickForm from '../../components/QuickForm/QuickForm';
import Faq from "../../components/Faq/Faq"
import Header from '../../components/Header/Header';
import MobileNav from '../../components/MobileNav/MobileNav';
import Footer from '../../components/Footer/Footer';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, where, collection, query, orderBy, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

function MoodHomePage() {
    const [user] = useAuthState(auth);
    const [scrollToFAQ, setScrollToFAQ] = useState(false);
    const faqRef = useRef(null);
    const [selectedTriggers, setSelectedTriggers] = useState([]);
    const [customTrigger, setCustomTrigger] = useState("");

    useEffect(() => {
        if (user) {
            fetchUserTriggers(user.uid);
        }
    }, [user]);

    useEffect(() => {
        // scroll to the FAQ section when the component mounts
        if (scrollToFAQ && faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: "smooth" });
            setScrollToFAQ(false);
        }
    }, [scrollToFAQ]);

    const fetchUserTriggers = async (uid) => {
        try {
            const userDoc = await getDoc(doc(getFirestore(), "userReminders", uid));
            if (userDoc.exists() && userDoc.data().uid === uid) {
                setSelectedTriggers(userDoc.data().triggers);
            }
        } catch (error) {
            console.error("Error fetching user triggers:", error);
        }
    };

    const triggerOptions = [
        "gratefulness",
        "hobby time",
        "walk more",
        "shower",
        "eat",
        "social needs",
        "meds",
        "read",
        "stretch",
        "play",
        "clean",
        "study"
    ];
    const handleTriggerSelection = (trigger) => {
        if (selectedTriggers.length < 8 && !selectedTriggers.includes(trigger)) {
            setSelectedTriggers((prevTriggers) => {
                const updatedTriggers = [...prevTriggers, trigger];
                saveUserTriggers(updatedTriggers);
                return updatedTriggers;
            });
        } else {
            alert("Invalid action or Maximum of 8 reached");
        }
    };

    const handleCustomTriggerChange = (event) => {
        setCustomTrigger(event.target.value);
    };

    const handleCustomTriggerAdd = async () => {
        if (selectedTriggers.length < 8) {
            if (customTrigger.trim() !== "" && !selectedTriggers.includes(customTrigger.trim())) {
                const updatedTriggers = [...selectedTriggers, customTrigger.trim()];
                setSelectedTriggers(updatedTriggers);
                setCustomTrigger("");
                // Save the updated triggers to the database
                await saveUserTriggers(updatedTriggers);
            }
        } else {
            // Disable the input field or button to prevent adding more triggers
            document.querySelector('.userpage__triggers-add-input').disabled = true;
            document.querySelector('.userpage__triggers-add-press').disabled = true;
            // Show a warning message when the maximum number of triggers is reached
            alert("Maximum 8 triggers reached");
        }
    };

    const handleTriggerRemoval = (trigger) => {
        setSelectedTriggers((prevTriggers) => {
            const updatedTriggers = prevTriggers.filter((item) => item !== trigger);
            saveUserTriggers(updatedTriggers);
            return updatedTriggers;
        });
    };

    const saveUserTriggers = async (triggers) => {
        if (user) {
            try {
                const userDocRef = doc(getFirestore(), "userReminders", user.uid);
                await setDoc(userDocRef, { uid: user.uid, triggers });
            } catch (error) {
                console.error("Error saving user triggers:", error);
            }
        }
    };

    return (
        <>
            <Header setScrollToFAQ={setScrollToFAQ} currentPage="moodhome" />
            <main className='main'>
                <div className='main__eq'>

                    <article className='blob-wrap'>
                        <div className="blobs_1 blobs" />
                        <div className="blobs_2 blobs" />
                        <div className="blobs blobs_3" />
                        <div className="blobs blobs_4" />
                        <div className="blobs blobs_5" />
                        <div className="blobs blobs_6" />
                        <div className="blobs blobs_7" />
                        <div className="blobs blobs_8" />
                        <div className="blobs blobs_9" />
                        <div className="blobs blobs_10" />
                        <div className="blobs blobs_11" />
                        <div className="blobs blobs_12" />
                        <div className="blobs blobs_13" />
                        <div className="blobs blobs_14" />
                    </article>

                    <section className='add-mood' id="add-mood">

                        <div className='add-mood-include'>
                            <QuickForm />
                        </div>

                    </section>
                    <section className="userpage__triggers">
                        <h3 className="userpage__triggers-head">Active Reminders</h3>
                        <div className="userpage__triggers-eq">
                            <div className="userpage__triggers-options">
                                <ul className="userpage__triggers-list">
                                    {triggerOptions.map((trigger, index) => (
                                        <li
                                            key={index}
                                            className={`userpage__triggers-list-item ${selectedTriggers.includes(trigger) ? 'selected' : ''}`}
                                            onClick={() => handleTriggerSelection(trigger)}>
                                            {trigger}
                                        </li>
                                    ))}
                                </ul>
                                <article className="userpage__triggers-add">
                                    <textarea
                                        className="userpage__triggers-add-input"
                                        placeholder="custom reminder"
                                        value={customTrigger}
                                        onChange={handleCustomTriggerChange}
                                        disabled={selectedTriggers.length >= 8} // Disable the input when maximum limit is reached
                                    />
                                    <button
                                        className="userpage__triggers-add-press"
                                        onClick={handleCustomTriggerAdd}
                                        disabled={selectedTriggers.length >= 8} // Disable the button when maximum limit is reached
                                    >
                                        +
                                    </button>
                                </article>
                            </div>
                            <div className="userpage__triggers-user">
                                {selectedTriggers.map((trigger, index) => (
                                    <p
                                        key={index} className="userpage__triggers-user-item"
                                        onClick={() => handleTriggerRemoval(trigger)}>
                                        {trigger}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                    <Faq ref={faqRef} />

                    
                </div>
                <Footer />
            </main>
            <MobileNav />
        </>
    );
}

export default MoodHomePage;