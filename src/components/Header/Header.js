import './Header.scss';

import React, { useState } from "react";
import { Link } from "react-router-dom";

import user from "../../assets/user.png";
import menu from "../../assets/menu.png";
import NavLeft from '../NavLeft/NavLeft';
import NavRight from '../NavRight/NavRight';

function Header() {
    const [isLeftNavVisible, setLeftNavVisible] = useState(false);
    const [isRightNavVisible, setRightNavVisible] = useState(false);

    const toggleLeftNav = () => setLeftNavVisible(!isLeftNavVisible);
    const toggleRightNav = () => setRightNavVisible(!isRightNavVisible);

    return (
        <>
            <header className='header'>
                <div onClick={toggleLeftNav} role="button" tabIndex={0} className='header__menu-container' id="moodnav-slider">
                    <img className="header__menu" alt="navigation menu" src={menu} title='Menu' />
                </div>

                {isLeftNavVisible && <NavLeft />}

                <nav className='home-nav'>
                    <div className='home-nav__eq'>
                        <div className='home-nav__logo'>
                            <Link className='home-nav__logo-mood' to="/moodhome">mood</Link>
                            <Link className='home-nav__logo-memory' to="/memoryhome">memory</Link>
                        </div>
                    </div>
                </nav>

                <div className="user-container" onClick={toggleRightNav} role="button" tabIndex={0} id="usernav-slider">
                    <img className="user" alt="You" title='You' src={user} />
                </div>

                {isRightNavVisible && <NavRight />}

            </header>
        </>
    );
}

export default Header;