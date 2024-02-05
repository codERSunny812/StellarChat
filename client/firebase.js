// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVgqpvgruTIrjmdNcF7_88PpPJ92QSteU",
    authDomain: "foodapp-e55a3.firebaseapp.com",
    databaseURL: "https://foodapp-e55a3-default-rtdb.firebaseio.com",
    projectId: "foodapp-e55a3",
    storageBucket: "foodapp-e55a3.appspot.com",
    messagingSenderId: "1030901474274",
    appId: "1:1030901474274:web:14324ebdffca2ba6b38fbb",
    measurementId: "G-3MLFT3EF9Q"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);