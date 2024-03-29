import './Header.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../assets/user.png";
import menu from "../../assets/menu.png";
import NavLeft from '../NavLeft/NavLeft';
import NavRight from '../NavRight/NavRight';

function Header({ setScrollToFAQ }) {
    const [isLeftNavVisible, setLeftNavVisible] = useState(false);
    const [isRightNavVisible, setRightNavVisible] = useState(false);

    const toggleLeftNav = () => {
        setLeftNavVisible(!isLeftNavVisible);
        setRightNavVisible(false); // close right nav when left is toggled
    };
    const toggleRightNav = () => {
        setRightNavVisible(!isRightNavVisible);
        setLeftNavVisible(false);
    };

    return (
        <>
            <header className={`header-${isLeftNavVisible ? 'left-nav-visible' : ''} header-${isRightNavVisible ? 'right-nav-visible' : ''}`} id="header">
                <div className='header-left'>
                    <div onClick={toggleLeftNav} role="button" tabIndex={0} className='header__menu-container'>
                        <img className="header__menu" alt="navigation menu" src={menu} title='Menu' />
                    </div>

                    <nav className='home-nav'>
                        <div className='home-nav__eq'>
                            <div className='home-nav__logo'>
                                <Link className='home-nav__logo-mood' to="/moodhome">mood</Link>
                                <Link className='home-nav__logo-memory' to="">memory</Link>
                            </div>
                        </div>
                    </nav>
                </div>
                {isLeftNavVisible && <NavLeft />}
                {isRightNavVisible && <NavRight setScrollToFAQ={setScrollToFAQ} />}
                <div className='user-parent'>
                    <div className="user-container" onClick={toggleRightNav} role="button" tabIndex={0}>
                        <img className="user" alt="You" title='You' src={user} />
                    </div>
                </div>


            </header>
        </>
    );
}

export default Header;