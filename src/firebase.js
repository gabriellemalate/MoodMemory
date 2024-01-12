// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABHb6ICFguPwvMmVx9S9H8i95ReW5cJ4U",
    authDomain: "moodmemory-501e3.firebaseapp.com",
    projectId: "moodmemory-501e3",
    storageBucket: "moodmemory-501e3.appspot.com",
    messagingSenderId: "361089301076",
    appId: "1:361089301076:web:80728eecb3752da3500bc1",
    measurementId: "G-0EGFJ24696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth, app as firebase, db };