// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARsFovtYO5yepR5OrX7vujn2QJXlAMMm4",
    authDomain: "projectshopping-ec984.firebaseapp.com",
    databaseURL: "https://projectshopping-ec984-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projectshopping-ec984",
    storageBucket: "projectshopping-ec984.appspot.com",
    messagingSenderId: "280208855300",
    appId: "1:280208855300:web:baa4c65ce41b32d3280051",
    measurementId: "G-HHZB9WPV7Z"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {firebaseConfig};