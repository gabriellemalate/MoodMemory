import './NavRight.scss';
import React, { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NavRight = ({ setScrollToFAQ }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const faqRef = useRef(null);
    const location = useLocation();

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

    return (
        <>
            <nav className='user-nav' id="user-nav">
                <div className='user-nav__eq'>
                    <div className='user-nav__top'>
                        <h2 className='user-nav__top-head'>Hello,</h2>
                        <h2 className='user-nav__top-head-name'>{user ? user.displayName : ''}</h2>

                        <ul className='user-nav__top-list'>
                            <li className='user-nav__top-list-item-moodtotal user-nav__top-list-item'>
                                42 moods logged
                            </li>
                            <li className='user-nav__top-list-item-moodstreak user-nav__top-list-item'>12 days in a row
                            </li>
                            <li className='user-nav__top-list-item-memoryinfo user-nav__top-list-item'>
                                87 memories secured
                            </li>
                            <li className='user-nav__top-list-item-add'>
                                <Link className='user-nav__top-list-item-add--link' to="/moodhome">+ New Log</Link>
                            </li>
                        </ul>
                    </div>

                    <ul className='user-nav__bottom'>
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
                        <li className='user-nav__bottom-item-logout user-nav__bottom-item'>
                            <button onClick={signOut} className="user-nav__bottom-item-logout-button" type="button">
                                Log Out
                            </button>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    );
}

export default NavRight;