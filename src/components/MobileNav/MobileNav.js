import './MobileNav.scss';
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MobileNav() {
    const navigate = useNavigate();

    const signOut = () => {
        auth.signOut().then(() => {
            // redirect to the welcome page after successful logout
            navigate("/");
        });
    };

    return (
        <>
            <nav className='mobnav'>
                <ul className='mobnav-eq'>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/moodhome">
                            <img src="" alt="" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>Add</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/logs">
                            <img src="" alt="" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>Logs</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/maps">
                            <img src="" alt="" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>Maps</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/moodhome#faq">
                            <img src="" alt="" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>FAQ</h3>
                        </Link>
                    </li>
                    <li className='mobnav-item'>
                        <Link className='mobnav-item__option' to="/welcomehome" onClick={signOut} >
                            <img src="" alt="" className='mobnav-item__option-img' />
                            <h3 className='mobnav-item__option-head'>Out</h3>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default MobileNav;