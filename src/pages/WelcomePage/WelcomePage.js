import React from "react";
import "./WelcomePage.scss";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// import { functions} from "firebase/functions";

const WelcomePage = () => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };


    // const db = getFirestore();

    // const createUserData = functions.auth.user().onCreate(async (user) => {
    //     const uid = user.uid;

    //     // Create a new collection for the user in Firestore
    //     const userCollectionRef = doc(db, "users", uid);
    //     await setDoc(userCollectionRef, {
    //         // Initialize user-specific data here
    //         displayName: user.displayName,
    //         email: user.email,

    //     });
    // });

    return (
        <main className="welcome">
            <article className='morph-wrap'>
                <div className="morphs_1 morphs" />
                <div className="morphs_2 morphs" />
            </article>

            <div className="welcome-eq">



                <div className="welcome__head">
                    <h1 className="welcome__head-welcome">welcome to</h1>
                </div>
                <article className="welcome__logo">
                    <div className="welcome__logo-eq">
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