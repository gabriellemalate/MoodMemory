import React from "react";
import "./NotFound.scss"
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header';

function NotFound() {
    return (
        <>
        <Header/>
        <main className="not-found">
            <h1 className="not-found__head">PAGE NOT FOUND </h1>

            <div className="sea">
                <div className="circle-wrapper">
                    <div className="bubble"></div>
                    <div className="submarine-wrapper">
                        <div className="submarine-body">
                            <div className="window"></div>
                            <div className="engine"></div>
                            <div className="light"></div>
                        </div>
                        <div className="helix"></div>
                        <div className="hat">
                            <div className="leds-wrapper">
                                <div className="periscope"></div>
                                <div className="leds"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <p className="not-found__details">Please return to <Link className="not-found__link" to="/moodhome">HOME PAGE</Link></p>
        </main>
        </>
    );
}

export default NotFound;