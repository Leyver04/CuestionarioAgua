import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHQ0DcjS5rmfRHzCLBwuk0bPAb232cFAA",
    authDomain: "cuestionarioagua-40340.firebaseapp.com",
    projectId: "cuestionarioagua-40340",
    storageBucket: "cuestionarioagua-40340.firebasestorage.app",
    messagingSenderId: "90687273974",
    appId: "1:90687273974:web:6d03ff358e745275be65d7",
    measurementId: "G-7RKVQHRQ20"
};

const app = initializeApp(firebaseConfig);

export { getFirestore, collection, addDoc, getAuth, app };
