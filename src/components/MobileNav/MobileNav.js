import './MobileNav.scss';
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "../../assets/nav-icons/home.png";
import Question from "../../assets/nav-icons/question.svg";
import Note from "../../assets/nav-icons/note.png";
import Plot from "../../assets/nav-icons/maps.png";
import Frog from "../../assets/nav-icons/frog.svg";

function MobileNav() {
    const navigate = useNavigate();
    const [scrollToFAQ, setScrollToFAQ] = useState(false);
    const faqRef = useRef(null);
    const [confirmSignOut, setConfirmSignOut] = useState(false);

    const signOut = () => {
        if (confirmSignOut) {
            auth.signOut().then(() => {
                // redirect to the welcome page after successful logout
                navigate("/");
            });
        }
    };

    const handleSignOutClick = () => {
        // Show a confirmation alert and set confirmSignOut to true if the user confirms
        const userConfirmed = window.confirm("Are you sure you want to sign out?");
        if (userConfirmed) {
            auth.signOut().then(() => {
                // Redirect to the home page after successful logout
                navigate("/");
        });
    }
    };

    useEffect(() => {
        console.log("Scrolling to FAQ:", scrollToFAQ);
        if (scrollToFAQ && faqRef.current) {
            console.log("FAQ Ref:", faqRef.current);
            faqRef.current.scrollIntoView({ behavior: "smooth" });
            setScrollToFAQ(false);
        }
    }, [scrollToFAQ]);

    return (
        <>
            <nav className='mobnav'>
                <ul className='mobnav-eq'>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/moodhome">
                            <img src={Home} alt="Go to Home Page" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>Add</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/logs">
                            <img src={Note} alt="Mood Logs Page" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>Logs</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/maps">
                            <img src={Plot} alt="Mood Maps Page" className='mobnav-item__option-img mobnav-item__option-img-plot' />
                            <h3 className='mobnav-item__option-head'>Maps</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/moodhome#faq" onClick={() => setScrollToFAQ(true)} ref={faqRef}>
                            <img src={Question} alt="FAQ" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>FAQ</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/welcomehome" onClick={handleSignOutClick} >
                            <img src={Frog} alt="User Log out" className='mobnav-item__option-img mobnav-item__option-img-frog' />
                            <h3 className='mobnav-item__option-head'>Out</h3>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default MobileNav;