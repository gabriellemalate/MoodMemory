import React, { useState, useEffect } from "react";
import "./UserPage.scss"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, where, collection, query, orderBy, getDocs } from "firebase/firestore";

function UserPage() {
    const [user] = useAuthState(auth);
    const [totalLogs, setTotalLogs] = useState(0);
    const [streak, setStreak] = useState(1);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         await fetchTotalLogs(); // Fetch total logs first
    //         calculateStreak(); // Then calculate streak
    //     };
    
    //     fetchUserData();
    // }, []);

    useEffect(() => {
        // Fetch total logs
        const fetchTotalLogs = async () => {
            const db = getFirestore();
            const logsCollection = collection(db, 'moodlogs');
            const logsSnapshot = await getDocs(logsCollection);
            const logsCount = logsSnapshot.size;
            setTotalLogs(logsCount);
        };

        // Calculate streak (Assuming each log has a date field)
        const calculateStreak = async () => {

        };

        fetchTotalLogs();
        calculateStreak();
    }, []);

    // // Calculate streak (Assuming each log has a date field)
    // const calculateStreak = async () => {
    //     const db = getFirestore();
    //     const user = auth.currentUser;

    //     if (!user) {
    //         // User not logged in, do nothing
    //         return;
    //     }

    //     const logsCollection = collection(db, 'moodlogs');
    //     const userLogsQuery = query(logsCollection, where('userId', '==', user.uid), orderBy('date', 'asc'));
    //     const userLogsSnapshot = await getDocs(userLogsQuery);

    //     let streakCount = 0;
    //     let previousDate = null;

    //     userLogsSnapshot.forEach(doc => {
    //         const logDate = doc.data().date.toDate(); // assumes date is stored as a Firestore Timestamp

    //         if (previousDate === null || isConsecutiveDays(previousDate, logDate)) {
    //             // If previousDate is null or the current log date is consecutive to the previous one
    //             streakCount++;
    //         } else {
    //             // Streak broken, reset streak count
    //             streakCount = 1; // Start streak count from 1 for the current log
    //         }

    //         previousDate = logDate;
    //     });

    //     setStreak(streakCount);
    // };

    // // Helper function to check if two dates are consecutive days
    // const isConsecutiveDays = (date1, date2) => {
    //     const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    //     const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    //     return diffDays === 1;
    // };
    

    return (
        <>
            <Header />
            <main className="userpage">
                <h2 className="userpage__head">Hello,</h2>
                <h1 className='userpage__head-name'>
                    {user ? user.displayName : ''}
                </h1>

                <section className="userpage__counters">
                    <ul className='userpage__counters-eq'>
                        <li className='userpage__counters-counter'>
                            Total Logs : {totalLogs}
                        </li>
                        <li className='userpage__counters-counter'>
                            Streak : {streak} -IN DEVELOPMENT
                        </li>
                    </ul>
                </section>


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
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What symptoms of mood disruption are there to look out for and log?</h4>
                                <div className='userpage__faq-query__answer'>There are a handful of mood state nuances such as hypo states and mixed states. Here are some symptom example of 3 of those mood states for your perusing in this site with recommendation to do further research on each nuance.
                                    <p className='userpage__faq-query__answer-bulletpoint'>Generalized Mania~ spending -a lot- of credit you can't pay, shopping in one day especially while important bills are unpaid.  major increase in sexual activity. Feeling invincible to pain and risk. <a href="https://my.clevelandclinic.org/health/diseases/21603-mania" className='userpage__faq-query__answer-link'>More about Elevation.</a></p>
                                    <p className='userpage__faq-query__answer-bulletpoint'>Mixed States~ unprofessional at work. Craving instability. <a href="https://www.webmd.com/bipolar-disorder/mixed-bipolar-disorder" className='userpage__faq-query__answer-link'>More about Mixed States.</a></p>
                                    <p className='userpage__faq-query__answer-bulletpoint'>Generalized Depression~ Common symptoms include -but are not conclusionally indicative of depression- Not showering for a long time. Eating to calm your nerves. Sleeping most of the day. <a href="https://www.nimh.nih.gov/health/topics/bipolar-disorder#:~:text=Bipolar%20disorder%20(formerly%20called%20manic,day%2Dto%2Dday%20tasks." className='userpage__faq-query__answer-link'>More about Depression.</a></p>
                                </div>
                            </article>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What kind of "Significant or Impactful Events" could be affecting my mood?</h4>
                                <p className='userpage__faq-query__answer'>Each list of external factors / casues/ triggers / environments that cause mood disrution vary from person to person. Just some examples of logs about impactful events include a wide variety of of big events or life changes -fortunate and unfortunate- or even minor schedule disruptions <i>"argument with father" "concert. stayed out til 3am" "dog got sick" "pet back from hospital" "partner rejected idea" "friend's wedding" </i> <a className='userpage__faq-query__answer-link' href="https://www.betterhealth.vic.gov.au/health/healthyliving/monitoring-your-mood">More about External events.</a> <a className='userpage__faq-query__answer-link' href="https://www.nami.org/Blogs/NAMI-Blog/January-2022/Understanding-Mental-Illness-Triggers">More about Triggers. </a>
                                </p>
                            </article>
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