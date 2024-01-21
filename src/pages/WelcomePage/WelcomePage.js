import React from "react";
import "./WelcomePage.scss"
// import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const WelcomePage = () => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    return (
        <main className="welcome">
            <div className="welcome-eq">

            <article className='morph-wrap'>
                        <div className="morphs_1 morphs" />
                        <div className="morphs_2 morphs" />
                    </article>

                <div className="welcome__head">
                    <h1 className="welcome__head-welcome">welcome to</h1>
                    {/* <h2 className="welcome__head-user">your</h2> */}
                </div>
                <article className="welcome__logo">
                    <div className="welcome__logo-eq">
                        {/* <Link to="/moodhome" className="welcome__logo-mood">Mood</Link>
                        <Link to="/memoryhome" className="welcome__logo-memory">Memory</Link> */}
                        <span className="welcome__logo-mood">Mood</span>
                        <span className="welcome__logo-memory">Memory</span>
                    </div>
                </article>
                <button
                    className="welcome__button"
                    onClick={googleSignIn}
                    type="button"
                >
                    Sign In
                </button>
            </div>
        </main>
    );
}

export default WelcomePage;