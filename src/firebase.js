// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7QCTzZc5ZMuV9FV4TuOSoHZ6f2WItoIk",
  authDomain: "trackstar-97423.firebaseapp.com",
  projectId: "trackstar-97423",
  storageBucket: "trackstar-97423.appspot.com",
  messagingSenderId: "585888829364",
  appId: "1:585888829364:web:fb8f7ddcc308eb19d96ce1",
  measurementId: "G-P5FB5CFPP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db};