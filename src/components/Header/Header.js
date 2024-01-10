import './Header.scss';

import React from "react";
import { Link } from "react-router-dom";

import user from "../../assets/user.png";
import menu from "../../assets/menu.png";
import NavLeft from '../NavLeft/NavLeft';
import NavRight from '../NavRight/NavRight';

function Header() {
    return (
        <>
            <header className='header'>
                <input id="moodnav-slider" type="checkbox" role="button" />
                <label id="moodnav" htmlFor="moodnav-slider">
                    <img className="header__menu" alt="navigation menu" src={menu} />
                </label>

                <NavLeft/>

                <nav className='home-nav'>
                    <div className='home-nav__eq'>
                        <div className='home-nav__logo'>
                            <Link className='home-nav__logo-mood' to="/">mood</Link>
                            <Link className='home-nav__logo-memory' to="/memoryhome">memory</Link>
                        </div>
                    </div>
                </nav>

                <input id="usernav-slider" type="checkbox" role="button" />
                <label id="usernav" htmlFor="usernav-slider">
                    <img className="user" alt="You" src={user} />
                </label>

                <NavRight/>

            </header>
        </>
    );
}

export default Header;