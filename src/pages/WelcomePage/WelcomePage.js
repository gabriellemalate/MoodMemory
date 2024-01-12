import React from "react";
import "./WelcomePage.scss"
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <main className="welcome">
            <div className="welcome-eq">
                <div className="welcome__head">
                    <h1 className="welcome__head-welcome">Welcome Back</h1>
                    <h2 className="welcome__head-user">Gabrielle</h2>
                </div>
                <article className="welcome__logo">
                    <div className="welcome__logo-eq">
                        <Link to="/moodhome" className="welcome__logo-mood">Mood</Link>
                        <Link to="" className="welcome__logo-memory">Memory</Link>
                    </div>
                </article>
                <button className="welcome__button">
                    <div className="welcome__button-eq">
                        Sign In
                    </div>
                </button>


                <p className="welcome__details">Please return to <Link className="welcome__link" to="/">HOME PAGE</Link></p>
            </div>
        </main>
    );
}

export default WelcomePage;