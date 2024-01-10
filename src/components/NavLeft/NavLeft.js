import './NavLeft.scss';
import React from "react";
import { Link } from "react-router-dom";

function NavLeft() {
    return (
        <>
            <nav className='mood-nav'>
                <div className='mood-nav__eq'>
                    <h2 className='mood-nav__head'>mood</h2>

                    <ul className='mood-nav__list'>
                        <Link to="/logs">
                            <li className='mood-nav__list-logs mood-nav__list-item'>
                                Mood Logs
                            </li>
                        </Link>
                        <Link to="/maps">
                        <li className='mood-nav__list-map mood-nav__list-item'>
                            Mood Maps
                        </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavLeft;