import './NavRight.scss';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const NavRight = () => {
    const [setUser] = useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const signOut = () => {
        auth.signOut().then(() => {
            // Redirect to the welcome page after successful logout
            navigate("/");
        });
    };

    return (
        <>
            <nav className='user-nav' id="user-nav">
                <div className='user-nav__eq'>
                    <div className='user-nav__top'>
                        <h2 className='user-nav__top-head'>Hello, Gabrielle</h2>

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
                        <li className='user-nav__bottom-item-faq user-nav__bottom-item'>
                            <a className='user-nav__bottom-item-faq-link' href="#faq">FAQ</a></li>
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