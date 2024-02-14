import React, { useState, useEffect } from "react";
import "./WelcomePage.scss";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDoc, addDoc } from "firebase/firestore";
import { functions } from "firebase/functions";

const WelcomePage = () => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithRedirect(auth, provider)
            .then((result) => {
                // If the sign-in was successful, create a new document for the user
                const user = result.user;
                const db = getFirestore();
                const userDocRef = doc(db, "users", user.uid);
                return setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    // any other initial user-specific data
                });
            })
            .then(() => {
                // Create moodlogs collection within the user's document
                const moodLogsCollectionRef = collection(userDocRef, "moodlogs");
                // Log the user's UID and email
                console.log("User UID:", user.uid);
                console.log("User Email:", user.email);
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    };
    // const db = getFirestore();
    //     const uid = user.uid;

    //     // Create a new collection for the user in Firestore
    //     const userCollectionRef = doc(db, "users", uid);
    //     await setDoc(userCollectionRef, {
    //         // Initialize user-specific data
    //         displayName: user.displayName,
    //         email: user.email,

    //     });
    // });

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             const uid = user.uid;

    //             // Check if the user data already exists
    //             const userDocRef = doc(db, "users", uid);
    //             const docSnap = await getDoc(userDocRef);

    //             if (!docSnap.exists()) {
    //                 // If user data doesn't exist, create a new document
    //                 await setDoc(userDocRef, {
    //                     displayName: user.displayName,
    //                     email: user.email,
    //                     // any other initial user-specific data
    //                 });

    //                 // Create a new "moodlogs" collection within the user's document
    //             const moodLogsCollectionRef = collection(userDocRef, "moodlogs");
    //             // Create a new "counter" document within the user's document
    //             const counterDocRef = doc(userDocRef, "counter");
    //             // Set initial counter value
    //             await setDoc(counterDocRef, { count: 0 });

    //             // Log the user's UID and email
    //             console.log("User UID:", uid);
    //             console.log("User Email:", user.email);
    //             }
    //         }
    //     });

    //     // Cleanup function
    //     return () => unsubscribe();
    // }, [db]);

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