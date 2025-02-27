// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvp3ooLp1b59wLVQbLxzpflnalfp-SBk0",
  authDomain: "collab-51dce.firebaseapp.com",
  projectId: "collab-51dce",
  storageBucket: "collab-51dce.appspot.com",
  messagingSenderId: "1058105454508",
  appId: "1:1058105454508:web:349922e36d4bce944ad409",
  databaseURL:
    "https://collab-51dce-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
