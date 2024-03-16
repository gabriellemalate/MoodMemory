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
    const [emotionCounts, setEmotionCounts] = useState({});
    const [qualityCounts, setQualityCounts] = useState({});
    const [selectedQualityLogs, setSelectedQualityLogs] = useState([]);
    const [selectedEmotionLogs, setSelectedEmotionLogs] = useState([]);
    const [stateCounts, setStateCounts] = useState({});

    useEffect(() => {
        if (user) {
            fetchStateCounts(user.uid);
        }
    }, [user]);

    const fetchStateCounts = async (uid) => {
        try {
            const db = getFirestore();
            const logsCollection = collection(db, "moodlogs");
            const logsQuery = query(logsCollection, where("uid", "==", uid));
            const logsSnapshot = await getDocs(logsQuery);

            let counts = {};

            logsSnapshot.forEach((doc) => {
                const { state } = doc.data();
                counts[state] = (counts[state] || 0) + 1;
            });

            setStateCounts(counts);
        } catch (error) {
            console.error("Error fetching state counts:", error);
        }
    };


    let backgroundColor;

    const getBackgroundColor = (emotion) => {
        switch (emotion) {
            case "anxious":
            case "unmotivated":
            case "down":
                return "rgba(17, 95, 121, 0.851)";
            case "exhausted":
            case "hopeless":
            case "panic":
                return "rgba(0, 0, 0, 0.753)";
            case "frustrated":
            case "angry":
            case "sad":
                return "rgba(0, 0, 255, 0.763)";
            case "tired":
            case "annoyed":
                return "rgba(245, 210, 54, 0.818)";
            case "irritable":
            case "worried":
            case "stressed":
                return "rgba(290, 146, 0, 0.792)";
            case "unsure":
            case "wired":
            case "wired":
                return "rgba(247, 235, 0, 0.69)";
            case "happy":
            case "loving":
            case "relaxed":
            case "satisfied":
            case "grateful":
                return "rgba(22, 201, 22, 0.729)";
            case "motivated":
            case "proud":
            case "energized":
            case "excited":
                return "rgba(255, 0, 123, 0.896)";
            default:
                // Default color or error handling
                return "initial"; // or any default color you prefer
        }
    };

    const getBgColor = (state) => {
        switch (state.toLowerCase()) {
            case "elevated":
                return "rgba(140, 235, 218, 0.654)";
            case "depressed":
                return "rgba(13, 105, 99, 0.754)";
            case "wnl":
                return "rgba(44, 178, 169, 0.754)";
            default:
                return "initial"; // or any default color you prefer
        }
    };

    const getBckgColor = (quality) => {
        switch (quality.toLowerCase()) {
            case "awesome":
                return "rgba(140, 235, 218, 0.654)";
            case "okay":
                return "rgba(13, 105, 99, 0.754)";
            case "poor":
                return "rgba(14, 64, 44, 0.754)";
            case "good":
                return "rgba(44, 178, 169, 0.754)";
            default:
                return "initial"; // or any default color you prefer
        }
    };

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
                const logsQuery = query(logsCollection, where('uid', '==', user.uid), orderBy('date', 'desc'));
                const logsSnapshot = await getDocs(logsQuery);
                const logsData = logsSnapshot.docs.map(doc => doc.data());

                let currentStreak = 0;
                let lastLogDate = null;

                if (logsData.length === 0) {
                    setStreak(0);
                    return;
                }

                const currentDate = new Date();
                const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Reset time to midnight

                // Iterate through logs to find consecutive days
                for (let i = 0; i < logsData.length; i++) {
                    const logDate = new Date(logsData[i].date.toDate());
                    const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());

                    // Check if the log is from the current streak day or the day before
                    if (today - logDay <= currentStreak * 24 * 60 * 60 * 1000) {
                        // Check if the log is from the same date as the previous log
                        if (!lastLogDate || logDay.getTime() !== lastLogDate.getTime()) {
                            currentStreak++;
                        }
                    } else {
                        break; // Streak broken
                    }

                    lastLogDate = logDay; // Update last log date
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
            if (selectedQualityLogs[0]?.quality === quality) {
                // If the currently selected quality matches the clicked quality, clear the selected logs
                setSelectedQualityLogs([]);
            } else {
                const db = getFirestore();
                const logsCollection = collection(db, "moodlogs");
                const logsQuery = query(logsCollection, where("uid", "==", user.uid), where("quality", "==", quality), orderBy("date", "desc"), limit(12));
                console.log("Logs query:", logsQuery);

                const logsSnapshot = await getDocs(logsQuery);
                console.log("Logs snapshot:", logsSnapshot);

                const logsData = logsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log("Logs data:", logsData);

                setSelectedQualityLogs(logsData);
                console.log("Selected quality logs:", selectedQualityLogs);
            }
        } catch (error) {
            console.error("Error fetching logs for selected quality:", error);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleEmotionItemClick = async (emotion) => {
        try {
            if (selectedEmotionLogs[0]?.emotion === emotion) {
                // If the currently selected emotion matches the clicked emotion, clear the selected logs
                setSelectedEmotionLogs([]);
            } else {
                const db = getFirestore();
                const logsCollection = collection(db, "moodlogs");
                const logsQuery = query(logsCollection, where("uid", "==", user.uid), where("emotion", "==", emotion), orderBy("date", "desc"), limit(12));
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
            }
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
                            TOTAL ✐ ✎ {totalLogs}
                        </li>
                        <li className='userpage__counters-counter userpage__counters-streak'>
                            STREAK ❤️‍🔥 : {streak}
                        </li>
                    </ul>
                </section>

                <section className="userpage__totals">
                    <h3 className="userpage__totals-head">Your Counters</h3>
                    <h3 className="userpage__totals-emotions-head">EMOTIONS you've logged -</h3>
                    <p className="instruction">click one to show entries with that attribute</p>
                    <ul className="userpage__totals-emotions">
                        {Object.entries(emotionCounts).map(([emotion, count]) => (
                            <li key={emotion} className={`userpage__totals-emotions-item ${selectedEmotionLogs[0]?.emotion === emotion ? 'selected' : ''}`} onClick={() => handleEmotionItemClick(emotion)} style={{ backgroundColor: getBackgroundColor(emotion) }}>
                                {emotion} <b>{count}</b>
                            </li>
                        ))}
                    </ul>

                    {selectedEmotionLogs.length > 0 && (
                        <div className="selectedcount">
                            <h3 className="selectedcount-head"> Times you've logged <b>{capitalizeFirstLetter(selectedEmotionLogs[0].emotion)}</b></h3>
                            <ul className="selectedcount-list">
                                {selectedEmotionLogs.map((log) => (
                                    <li key={log.id} className="selectedcount-item">
                                        {log.date.toDate().toLocaleDateString()}, Title: {log.title}, Notes: {log.notes}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h3 className="userpage__totals-states-head">STATES you've logged -</h3>
                    <ul className="userpage__totals-states">
                        {Object.entries(stateCounts).map(([state, count]) => (
                            <li key={state} className={`userpage__totals-states-item`} style={{ backgroundColor: getBgColor(state) }}>
                                {state} <b>{count}</b>
                            </li>
                        ))}
                    </ul>

                    <h3 className="userpage__totals-emotions-head">SLEEP QUALITY is typically -</h3>
                    <p className="instruction">click one to show - max. 7 - recent entries</p>
                    <ul className="userpage__totals-emotions">
                        {Object.entries(qualityCounts).map(([quality, count]) => (
                            <li key={quality} className={`userpage__totals-emotions-item ${selectedQualityLogs[0]?.quality === quality ? 'selected' : ''}`} onClick={() => handleQualityItemClick(quality)} style={{ backgroundColor: getBckgColor(quality) }}>
                                {quality}: <b>{count}</b>
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

                <section className="userpage__totals">
                    <h4 className="userpage__totals-head">KEY PHRASES & WORDS</h4>
                    <article>

                    </article>
                </section>

                <section className='userpage__faq'>
                    <div className='userpage__faq-eq'>
                        <h2 className='userpage__faq-head'>FAQ</h2>
                        <div className='userpage__faq-questions'>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What is WNL?</h4>
                                <p className='userpage__faq-query__answer'>{'"within normal limits" no symptoms of depression or elevation. '}
                                    {/* <a className='userpage__faq-query__answer-link' href='https://agilevirtualpt.com/blog/why-you-want-to-hear-virtual-physical-therapists-use-the-medical-abbreviation-wnl-in-your-sessions/'>More info here</a> */}
                                </p>
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