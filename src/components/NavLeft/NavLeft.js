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
                        <li className='mood-nav__list-logs mood-nav__list-item'>
                            <a className='mood-nav__list-logs-link' href="">
                                Mood Logs
                            </a>
                        </li>
                        <li className='mood-nav__list-map mood-nav__list-item'>
                            <a className='mood-nav__list-map-link' href="">
                                Mood Maps
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavLeft;