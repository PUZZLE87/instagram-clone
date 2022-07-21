// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getSotrage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1ShiUV63SKf2-of7noKOAEBWpB2VnWmg",
  authDomain: "myprojects-d43a0.firebaseapp.com",
  projectId: "myprojects-d43a0",
  storageBucket: "myprojects-d43a0.appspot.com",
  messagingSenderId: "376026468447",
  appId: "1:376026468447:web:00923fadc0353e1d688bea",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
