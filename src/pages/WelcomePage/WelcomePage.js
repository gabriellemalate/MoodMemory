import React, { useState, useEffect } from "react";
import "./WelcomePage.scss";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged
    // , signInWithPopup 
} from "firebase/auth";
// import { getFirestore, doc, setDoc, collection, getDoc, addDoc } from "firebase/firestore";
// import { functions } from "firebase/functions";
// import { navigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

const WelcomePage = () => {
    const [redirectInProgress, setRedirectInProgress] = useState(false);

    useEffect(() => {
        // Check if there is a redirect result when the component mounts
        getRedirectResult(auth)
            .then((result) => {
                if (result.user) {
                    // User is already signed in, redirect them to home page
                    window.location.href = '/moodhome';
                }
            })
            .catch((error) => {
                console.error("Error getting redirect result:", error);
            });
    }, []);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        // Set a flag to indicate redirect is in progress
        setRedirectInProgress(true);

        // Initiate Google sign-in with redirect
        signInWithRedirect(auth, provider)
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                // Reset the redirect flag in case of error
                setRedirectInProgress(false);
            });
    };

    // const googleSignIn = () => {
    //     const provider = new GoogleAuthProvider();

    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             // If the sign-in was successful, create a new document for the user
    //             const user = result.user;
    //             const db = getFirestore();
    //             const userDocRef = doc(db, "users", user.uid);
    //             return setDoc(userDocRef, {
    //                 displayName: user.displayName,
    //                 email: user.email,
    //                 // any other initial user-specific data
    //             });
    //         })
    //         .then(() => {
    //             // Create moodlogs collection within the user's document
    //             const moodLogsCollectionRef = collection(userDocRef, "moodlogs");
    //             // Log the user's UID and email
    //             console.log("User UID:", user.uid);
    //             console.log("User Email:", user.email);
    //             // navigate("/moodhome");
    //         })
    //         .catch((error) => {
    //             console.error("Error signing in with Google:", error);
    //         });
    // };

    return (
        <main className="welcome">
            {redirectInProgress ? (
                <LoadingPage />
            ) : (
                <>
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
                </>
            )}
        </main>
    );
}

export default WelcomePage;