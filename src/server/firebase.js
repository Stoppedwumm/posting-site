// firebase.js
import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
// ... other Firebase services as needed

const firebaseConfig = {

    apiKey: process.env.FIREBASEAPI,
  
    authDomain: "st-post-5f692.firebaseapp.com",
  
    projectId: "st-post-5f692",
  
    storageBucket: "st-post-5f692.firebasestorage.app",
  
    messagingSenderId: "604271229488",
  
    appId: "1:604271229488:web:71c7df71a51343dee3cbf5",
  
    measurementId: "G-8MEXB46MYF"
  
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}