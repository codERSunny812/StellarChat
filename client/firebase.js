// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAGeDwS3FitEtUD8Yb3_y89qL6LMqa1Zc",
    authDomain: "chatkro-b2b85.firebaseapp.com",
    projectId: "chatkro-b2b85",
    storageBucket: "chatkro-b2b85.appspot.com",
    messagingSenderId: "210951248415",
    appId: "1:210951248415:web:a42d404ddd3abf1705d32a",
    measurementId: "G-DGSE9K1MFY"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);