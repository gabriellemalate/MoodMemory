import React, { useState, useEffect } from "react";
import "./UserPage.scss"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, where, collection, query, orderBy, getDocs, doc, setDoc, getDoc, limit } from "firebase/firestore";

function UserPage() {
    const [user] = useAuthState(auth);
    const [totalLogs, setTotalLogs] = useState(0);
    const [streak, setStreak] = useState(1);
    // const [selectedTriggers, setSelectedTriggers] = useState([]);
    // const [customTrigger, setCustomTrigger] = useState("");
    const [emotionCounts, setEmotionCounts] = useState({});
    const [qualityCounts, setQualityCounts] = useState({});
    const [selectedQualityLogs, setSelectedQualityLogs] = useState([]);
    const [selectedEmotionLogs, setSelectedEmotionLogs] = useState([]);

    // useEffect(() => {
    //     if (user) {
    //         fetchUserTriggers(user.uid);
    //     }
    // }, [user]);

    useEffect(() => {
        if (user) {
            fetchQualityCounts(user.uid);
        }
    }, [user]);

    useEffect(() => {
        const fetchTotalLogs = async () => {
            try {
                const db = getFirestore();
                const logsCollection = collection(db, 'moodlogs');
                const logsQuery = query(logsCollection, where('uid', '==', user.uid));
                const logsSnapshot = await getDocs(logsQuery);
                const logsCount = logsSnapshot.size;
                setTotalLogs(logsCount);
            } catch (error) {
                console.error("Error fetching total logs:", error);
            }
        };
        fetchTotalLogs();

    }, []);

    useEffect(() => {
        const calculateStreak = async () => {
            try {
                const db = getFirestore();
                const logsCollection = collection(db, 'moodlogs');
                const logsQuery = query(logsCollection, where('uid', '==', user.uid), orderBy('date', 'desc')); // Order logs by date in descending order
                const logsSnapshot = await getDocs(logsQuery);
                const logsData = logsSnapshot.docs.map(doc => doc.data());

                let currentStreak = 0;

                if (logsData.length === 0) {
                    setStreak(0);
                    return;
                }

                const currentDate = new Date();
                const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Reset time to midnight
                let lastLogDate = new Date(logsData[0].date.toDate());
                lastLogDate = new Date(lastLogDate.getFullYear(), lastLogDate.getMonth(), lastLogDate.getDate()); // Reset time to midnight

                // Check if the most recent log is within the past 24 hours
                if (today - lastLogDate > 24 * 60 * 60 * 1000) {
                    setStreak(0);
                    return;
                }

                // Iterate through logs to find consecutive days
                for (let i = 0; i < logsData.length; i++) {
                    const logDate = new Date(logsData[i].date.toDate());
                    const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());

                    if (today - logDay === currentStreak * 24 * 60 * 60 * 1000) {
                        currentStreak++;
                    } else if (today - logDay === (currentStreak - 1) * 24 * 60 * 60 * 1000) {
                        continue; // Log from yesterday, streak continues
                    } else {
                        break; // Streak broken
                    }
                }

                setStreak(currentStreak);
            } catch (error) {
                console.error("Error calculating streak:", error);
            }
        };

        if (user) {
            calculateStreak();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchEmotionCounts(user.uid);
        }
    }, [user]);

    const fetchEmotionCounts = async (uid) => {
        try {
            const db = getFirestore();
            const logsCollection = collection(db, "moodlogs");
            const logsQuery = query(logsCollection, where("uid", "==", uid));
            const logsSnapshot = await getDocs(logsQuery);

            let counts = {};

            logsSnapshot.forEach((doc) => {
                const { emotion } = doc.data();
                counts[emotion] = (counts[emotion] || 0) + 1;
            });

            setEmotionCounts(counts);
        } catch (error) {
            console.error("Error fetching emotion counts:", error);
        }
    };

    // const fetchUserTriggers = async (uid) => {
    //     try {
    //         const userDoc = await getDoc(doc(getFirestore(), "userTriggers", uid));
    //         if (userDoc.exists() && userDoc.data().uid === uid) {
    //             setSelectedTriggers(userDoc.data().triggers);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user triggers:", error);
    //     }
    // };

    // const triggerOptions = [
    //     "myself",
    //     "work",
    //     "partner",
    //     "family",
    //     "friends",
    //     "sleep",
    //     "health",
    //     "food",
    //     "exercise",
    //     "finance",
    //     "home",
    //     "hobbies"
    // ];
    // const handleTriggerSelection = (trigger) => {
    //     if (selectedTriggers.length < 8 && !selectedTriggers.includes(trigger)) {
    //         setSelectedTriggers((prevTriggers) => {
    //             const updatedTriggers = [...prevTriggers, trigger];
    //             saveUserTriggers(updatedTriggers);
    //             return updatedTriggers;
    //         });
    //     } else {
    //         alert("Maximum 8 reached");
    //     }
    // };

    // const handleCustomTriggerChange = (event) => {
    //     setCustomTrigger(event.target.value);
    // };

    // const handleCustomTriggerAdd = async () => {
    //     if (selectedTriggers.length < 8) {
    //         if (customTrigger.trim() !== "" && !selectedTriggers.includes(customTrigger.trim())) {
    //             const updatedTriggers = [...selectedTriggers, customTrigger.trim()];
    //             setSelectedTriggers(updatedTriggers);
    //             setCustomTrigger("");
    //             // Save the updated triggers to the database
    //             await saveUserTriggers(updatedTriggers);
    //         }
    //     } else {
    //         // Disable the input field or button to prevent adding more triggers
    //         document.querySelector('.userpage__triggers-add-input').disabled = true;
    //         document.querySelector('.userpage__triggers-add-press').disabled = true;
    //         // Show a warning message when the maximum number of triggers is reached
    //         alert("Maximum 8 triggers reached");
    //     }
    // };

    // const handleTriggerRemoval = (trigger) => {
    //     setSelectedTriggers((prevTriggers) => {
    //         const updatedTriggers = prevTriggers.filter((item) => item !== trigger);
    //         saveUserTriggers(updatedTriggers);
    //         return updatedTriggers;
    //     });
    // };

    // const saveUserTriggers = async (triggers) => {
    //     if (user) {
    //         try {
    //             const userDocRef = doc(getFirestore(), "userTriggers", user.uid);
    //             await setDoc(userDocRef, { uid: user.uid, triggers });
    //         } catch (error) {
    //             console.error("Error saving user triggers:", error);
    //         }
    //     }
    // };

    const fetchQualityCounts = async (uid) => {
        try {
            const db = getFirestore();
            const logsCollection = collection(db, "moodlogs");
            const logsQuery = query(logsCollection, where("uid", "==", uid));
            const logsSnapshot = await getDocs(logsQuery);

            let counts = {};

            logsSnapshot.forEach((doc) => {
                const { quality } = doc.data();
                console.log("Quality:", quality);
                counts[quality] = (counts[quality] || 0) + 1;
            });

            setQualityCounts(counts);
        } catch (error) {
            console.error("Error fetching quality counts:", error);
        }
    };

    const handleQualityItemClick = async (quality) => {
        try {
            const db = getFirestore();
            const logsCollection = collection(db, "moodlogs");
            const logsQuery = query(logsCollection, where("uid", "==", user.uid), where("quality", "==", quality), orderBy("date", "desc"), limit(7));
            const logsSnapshot = await getDocs(logsQuery);

            const logsData = logsSnapshot.docs.map((doc) => {
                const log = doc.data();
                return {
                    id: doc.id,
                    ...log,
                    date: log.date.toDate().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                };
            });
            
            setSelectedQualityLogs(logsData);
        } catch (error) {
            console.error("Error fetching logs for selected quality:", error);
        }
    };

    const handleEmotionItemClick = async (emotion) => {
        try {
            const db = getFirestore();
            const logsCollection = collection(db, "moodlogs");
            const logsQuery = query(logsCollection, where("uid", "==", user.uid), where("emotion", "==", emotion), orderBy("date", "desc"));
            console.log("Logs query:", logsQuery);

            const logsSnapshot = await getDocs(logsQuery);
            console.log("Logs snapshot:", logsSnapshot);

            const logsData = logsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("Logs data:", logsData);

            setSelectedEmotionLogs(logsData);
            console.log("Selected emotion logs:", selectedEmotionLogs);
        } catch (error) {
            console.error("Error fetching logs for selected emotion:", error);
        }
    };

    return (
        <>
            <Header />
            <main className="userpage">
                <div className="userpage__head">
                    {/* <h2 className="userpage__head-greet">Hello,</h2> */}
                    <h1 className='userpage__head-name'>
                        {user ? user.displayName : ''}
                    </h1>
                </div>

                <section className="userpage__counters">
                    <ul className='userpage__counters-eq'>
                        <li className='userpage__counters-counter'>
                            TOTAL : {totalLogs}
                        </li>
                        <li className='userpage__counters-counter userpage__counters-streak'>
                            STREAK ❤️‍🔥 : {streak}
                        </li>
                    </ul>
                </section>

                <section className="userpage__totals">
                    <h3 className="userpage__totals-head">Your Counters</h3>
                    <h3 className="userpage__totals-emotions-head">EMOTIONS you've logged -</h3>
                    <ul className="userpage__totals-emotions">
                        {Object.entries(emotionCounts).map(([emotion, count]) => (
                            <li key={emotion} className="userpage__totals-emotions-item" onClick={() => handleEmotionItemClick(emotion)}>
                                {emotion}: {count}
                            </li>
                        ))}
                    </ul>

                    {selectedEmotionLogs.length > 0 && (
                        <div className="userpage__selected-emotion-logs">
                            <h3>Logs for selected emotion: {selectedEmotionLogs[0].emotion}</h3>
                            <ul>
                                {selectedEmotionLogs.map((log) => (
                                    <li key={log.id}>
                                        Date: {log.date.toDate().toLocaleDateString()}, Title: {log.title}, Notes: {log.notes}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h3 className="userpage__totals-emotions-head">SLEEP QUALITY is typically -</h3>
                    <ul className="userpage__totals-emotions">
                        {Object.entries(qualityCounts).map(([quality, count]) => (
                            <li key={quality} className="userpage__totals-emotions-item" onClick={() => handleQualityItemClick(quality)}>
                                {quality}: {count}
                            </li>
                        ))}
                    </ul>
                </section>

                {selectedQualityLogs.length > 0 && (
                    <div className="selectedcount">
                        <h3 className="selectedcount-head">Most recent logs with <b>{selectedQualityLogs[0].quality} Sleep Quality</b> </h3>
                        <ul className="selectedcount-list">
                            {selectedQualityLogs.map((log) => (
                                <li key={log.id} className="selectedcount-item">
                                    {log.date.toDate().toLocaleDateString()}, {log.date.toDate().toLocaleString('en-US', { weekday: 'long' })}, {log.date.toDate().toLocaleTimeString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* <section className="userpage__triggers">
                    <h3 className="userpage__triggers-head">Active Triggers</h3>
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
                                    placeholder="custom trigger"
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
                </section> */}

                <section className='userpage__faq'>
                    <div className='userpage__faq-eq'>
                        <h2 className='userpage__faq-head'>FAQ</h2>
                        <div className='userpage__faq-questions'>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What is WNL?</h4>
                                <p className='userpage__faq-query__answer'>{'"within normal limits" no symptoms of depression or elevation. '} <a className='userpage__faq-query__answer-link' href='https://agilevirtualpt.com/blog/why-you-want-to-hear-virtual-physical-therapists-use-the-medical-abbreviation-wnl-in-your-sessions/'>More info here</a></p>
                            </article>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>Why are my mood state options "Depressed", "WNL", and "Elevated"?</h4> <p className='userpage__faq-query__answer'>Medical professionals uniformly use, and recommend these terms for mood tracking. These choices aim to remove the societal connotations of "Depression", which is widely-variedly perceived. Instead, this application's environment aims to cultivate safety in unhesitantly opting for what rings true. These terms were thoughtfully chosen to adjust your current space into an honest and kind space, no matter where you are at the time of logging. <a className='userpage__faq-query__answer-link' href="https://www.guilford.com/books/The-Bipolar-Disorder-Survival-Guide/David-Miklowitz/9781462534982"> More info here. </a></p>
                            </article>
                            {/* <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What symptoms of mood disruption are there to look out for and log?</h4>
                                <div className='userpage__faq-query__answer'>There are a handful of mood state nuances such as hypo states and mixed states. Here are some symptom example of 3 of those mood states for your perusing in this site with a high recommendation to do further research on each nuance.
                                    <p className='userpage__faq-query__answer-bulletpoint'>Generalized Mania~ spending -a lot- of credit you can't pay, shopping in one day especially while important bills are unpaid.  major increase in sexual activity. Feeling invincible to pain and risk. <a href="https://my.clevelandclinic.org/health/diseases/21603-mania" className='userpage__faq-query__answer-link'>More about Elevation.</a></p>
                                    <p className='userpage__faq-query__answer-bulletpoint'>Mixed States~ unprofessional at work. Craving instability. <a href="https://www.webmd.com/bipolar-disorder/mixed-bipolar-disorder" className='userpage__faq-query__answer-link'>More about Mixed States.</a></p>
                                    <p className='userpage__faq-query__answer-bulletpoint'>Generalized Depression~ Common symptoms include -but are not conclusionally indicative of depression- Not showering for a long time. Eating to calm your nerves. Sleeping most of the day. <a href="https://www.nimh.nih.gov/health/topics/bipolar-disorder#:~:text=Bipolar%20disorder%20(formerly%20called%20manic,day%2Dto%2Dday%20tasks." className='userpage__faq-query__answer-link'>More about Depression.</a></p>
                                </div>
                            </article>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What kind of "Significant or Impactful Events" could be affecting my mood?</h4>
                                <p className='userpage__faq-query__answer'>Each list of external factors / casues/ triggers / environments that cause mood disrution vary from person to person. Just some examples of logs about impactful events include a wide variety of big events or life changes -fortunate and unfortunate- or even minor schedule disruptions <i>"argument with father" "concert. stayed out til 3am" "dog got sick" "pet back from hospital" "partner rejected idea" "friend's wedding" </i> <a className='userpage__faq-query__answer-link' href="https://www.betterhealth.vic.gov.au/health/healthyliving/monitoring-your-mood">More about External events.</a> <a className='userpage__faq-query__answer-link' href="https://www.nami.org/Blogs/NAMI-Blog/January-2022/Understanding-Mental-Illness-Triggers">More about Triggers. </a>
                                </p>
                            </article> */}
                        </div>
                    </div>
                    <h3 className='contact' onClick={() => window.location = 'mailto:yourmail@domain.com'}>
                        <i>email for further queries</i>
                    </h3>
                </section>
            </main>
            <MobileNav />
        </>
    );
}

export default UserPage;