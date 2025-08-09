// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUGsv7taCF4SyOx_G-ibiChHMzzBxQkkQ",
  authDomain: "assignment-11-hobbyhub.firebaseapp.com",
  projectId: "assignment-11-hobbyhub",
  storageBucket: "assignment-11-hobbyhub.firebasestorage.app",
  messagingSenderId: "905420249930",
  appId: "1:905420249930:web:0f9515cbe76c535458ffb3"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);