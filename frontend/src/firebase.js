// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyB71gzkgrWLseFSD48kvRd87Wc6_zBWoAo",
  authDomain: "talentbridge-b06aa.firebaseapp.com",
  projectId: "talentbridge-b06aa",
  storageBucket: "talentbridge-b06aa.firebasestorage.app",
  messagingSenderId: "388120502906",
  appId: "1:388120502906:web:e50fa4fcf5fd4842e8d1c3",
  measurementId: "G-21ET47H35X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();