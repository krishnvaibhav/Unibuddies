// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCELFn-ptnomatcEyFz_jULemH6HGbp6T4",
  authDomain: "unibuddies-7b2f9.firebaseapp.com",
  projectId: "unibuddies-7b2f9",
  storageBucket: "unibuddies-7b2f9.appspot.com",
  messagingSenderId: "1078641392885",
  appId: "1:1078641392885:web:ad07e263144e0dfb3359bc",
  measurementId: "G-HG027V9BR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, firebaseConfig, auth };
