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
    const [selectedFocus, setSelectedFocus] = useState([]);
    const [customFocus, setCustomFocus] = useState("");

    useEffect(() => {
        if (user) {
            fetchUserFocus(user.uid);
        }
    }, [user]);

    useEffect(() => {
        // scroll to the FAQ section when the component mounts
        if (scrollToFAQ && faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: "smooth" });
            setScrollToFAQ(false);
        }
    }, [scrollToFAQ]);

    const fetchUserFocus = async (uid) => {
        try {
            const userDoc = await getDoc(doc(getFirestore(), "userReminders", uid));
            if (userDoc.exists() && userDoc.data().uid === uid) {
                setSelectedFocus(userDoc.data().focus);
            }
        } catch (error) {
            console.error("Error fetching user focus:", error);
        }
    };

    const focusOptions = [
        "(-) screentime",
        "gratefulness",
        "social needs",
        "go walk",
        "shower",
        "stretch",
        "study",
        "play",
        "alone time",
        "meds",
        "read",
        "clean"
    ];
    const handleFocusSelection = (focus) => {
        if (selectedFocus.length < 8 && !selectedFocus.includes(focus)) {
            setSelectedFocus((prevFocus) => {
                const updatedFocus = [...prevFocus, focus];
                saveUserFocus(updatedFocus);
                return updatedFocus;
            });
        } else {
            alert("Invalid action or Maximum of 8 reached");
        }
    };

    const handleCustomFocusChange = (event) => {
        setCustomFocus(event.target.value);
    };

    const handleCustomFocusAdd = async () => {
        if (selectedFocus.length < 8) {
            if (customFocus.trim() !== "" && !selectedFocus.includes(customFocus.trim())) {
                const updatedFocus = [...selectedFocus, customFocus.trim()];
                setSelectedFocus(updatedFocus);
                setCustomFocus("");
                // Save the updated triggers to the database
                await saveUserFocus(updatedFocus);
            }
        } else {
            // Disable the input field or button to prevent adding more triggers
            document.querySelector('.userpage__triggers-add-input').disabled = true;
            document.querySelector('.userpage__triggers-add-press').disabled = true;
            // Show a warning message when the maximum number of triggers is reached
            alert("Maximum 8 focus reached");
        }
    };

    const handleFocusRemoval = (focus) => {
        setSelectedFocus((prevFocus) => {
            const updatedFocus = prevFocus.filter((item) => item !== focus);
            saveUserFocus(updatedFocus);
            return updatedFocus;
        });
    };

    const saveUserFocus = async (focus) => {
        if (user) {
            try {
                const userDocRef = doc(getFirestore(), "userReminders", user.uid);
                await setDoc(userDocRef, { uid: user.uid, focus: focus });
            } catch (error) {
                console.error("Error saving user focus:", error);
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
                        <h3 className="userpage__triggers-head">Daily Focus</h3>
                        <p className='instruction'>a list you can refer to everyday</p>
                        <div className="userpage__triggers-eq">
                            
                            <div className="userpage__triggers-options">
                                <ul className="userpage__triggers-list">
                                    {focusOptions.map((focus, index) => (
                                        <li
                                            key={index}
                                            className={`userpage__triggers-list-item ${selectedFocus.includes(focus) ? 'selected' : ''}`}
                                            onClick={() => handleFocusSelection(focus)}>
                                            {focus}
                                        </li>
                                    ))}
                                </ul>
                                <article className="userpage__triggers-add">
                                    <textarea
                                        className="userpage__triggers-add-input"
                                        placeholder="custom reminder"
                                        value={customFocus}
                                        onChange={handleCustomFocusChange}
                                        disabled={selectedFocus.length >= 8} // Disable the input when maximum limit is reached
                                    />
                                    <button
                                        className="userpage__triggers-add-press"
                                        onClick={handleCustomFocusAdd}
                                        disabled={selectedFocus.length >= 8} // Disable the button when maximum limit is reached
                                    >
                                        +
                                    </button>
                                </article>
                            </div>
                            <div className="userpage__triggers-user">
                                {selectedFocus.map((focus, index) => (
                                    <p
                                        key={index} className="userpage__triggers-user-item"
                                        onClick={() => handleFocusRemoval(focus)}>
                                        {focus}
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