// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // @ts-ignore
  apiKey: import.meta.env.FIREBASE_KEY|| 'AIzaSyBJ5uj5gY9wEx1rMUdFL5gG8ZX-pPeMYf0',
  authDomain: "ecomm1400.firebaseapp.com",
  projectId: "ecomm1400",
  storageBucket: "ecomm1400.firebasestorage.app",
  messagingSenderId: "401348999297",
  appId: "1:401348999297:web:b61e813027221de87ff580",
  measurementId: "G-HVKQKKHM7Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// const analytics = getAnalytics(app);