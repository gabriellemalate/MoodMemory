import './NavRight.scss';
import React, { useState, useEffect, useRef }  from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore";

const NavRight = ({ setScrollToFAQ }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const faqRef = useRef(null);
    const location = useLocation();
    const [totalLogs, setTotalLogs] = useState(0);
    const [streak, setStreak] = useState(0);

    const signOut = () => {
        auth.signOut().then(() => {
            // redirect to the welcome page after successful logout
            navigate("/");
        });
    };



    const handleFAQClick = () => {
        if (faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isMoodHomePage = location.pathname === "/moodhome";

    useEffect(() => {
        // Fetch total logs
        const fetchTotalLogs = async () => {
            const db = getFirestore();
            const logsCollection = collection(db, 'moodlogs');
            const logsSnapshot = await getDocs(
                query(
                    collection(db, 'moodlogs'),
                    where('uid', '==', user.uid)
                )
            );
            const logsCount = logsSnapshot.size;
            setTotalLogs(logsCount);
        };

        // Calculate streak (Assuming each log has a date field)
        const calculateStreak = async () => {

        };

        fetchTotalLogs();
        calculateStreak();
    }, []);

    return (
        <>
            <nav className='user-nav' id="user-nav">
                <div className='user-nav__eq'>
                    <div className='user-nav__top'>
                        <p className='user-nav__top-head'>Hello, <span className='user-nav__top-head-name'>{user ? user.displayName : ''}</span></p>
                        

                        <ul className='user-nav__top-list'>
                            <li className='user-nav__top-list-item-moodtotal user-nav__top-list-item'><Link to="/userpage"> <b>Total Entries= 
                            {totalLogs}</b></Link>
                            </li>
                            {/* <li className='user-nav__top-list-item-moodstreak user-nav__top-list-item' title="log in streak"><Link to="/userpage"><b>Log Streak={streak}</b></Link>
                            </li> */}
                            {/* <li className='user-nav__top-list-item-memoryinfo user-nav__top-list-item'>
                                0 memories secured
                            </li> */}
                            <li className='user-nav__top-list-item-add'>
                                <Link className='user-nav__top-list-item-add--link' to="/moodhome">+ New Log</Link>
                            </li>
                            {isMoodHomePage && (
                            <li className='user-nav__bottom-item-faq user-nav__bottom-item'>
                                <Link
                                    className='user-nav__bottom-item-faq-link'
                                    to="/moodhome#faq"
                                    onClick={() => setScrollToFAQ(true)}
                                    ref={faqRef}>
                                    FAQ
                                </Link>
                            </li>
                        )}
                        </ul>
                    </div>

                    <ul className='user-nav__bottom'>
                        
                        <li className='user-nav__bottom-item-logout user-nav__bottom-item'>
                            <button onClick={signOut} className="user-nav__bottom-item-logout-button" type="button">
                                Log Out
                            </button>
                        </li>

                        <li className='user-nav__bottom-item user-nav__bottom-item-contact' onClick={() => window.location = 'mailto:yourmail@domain.com'}>
                                CONTACT <i className='user-nav__bottom-item-contact-name'>HelloMoodMemory</i>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    );
}

export default NavRight;