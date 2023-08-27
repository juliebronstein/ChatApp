// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm2addeQCULQmXcdmHYI0l7rw02AJC1w4",
  authDomain: "chatapp-e7a3b.firebaseapp.com",
  projectId: "chatapp-e7a3b",
  storageBucket: "chatapp-e7a3b.appspot.com",
  messagingSenderId: "78254775723",
  appId: "1:78254775723:web:5f93163545665e2fd806ee"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();


// Create a root reference
export const storage = getStorage();
export const db=getFirestore()