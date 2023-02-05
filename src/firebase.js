
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC7QCTzZc5ZMuV9FV4TuOSoHZ6f2WItoIk",
  authDomain: "trackstar-97423.firebaseapp.com",
  projectId: "trackstar-97423",
  storageBucket: "trackstar-97423.appspot.com",
  messagingSenderId: "585888829364",
  appId: "1:585888829364:web:fb8f7ddcc308eb19d96ce1",
  measurementId: "G-P5FB5CFPP1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};