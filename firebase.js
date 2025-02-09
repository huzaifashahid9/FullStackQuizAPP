// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  setDoc,
  getFirestore,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query, 
  where
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPtQF-Lryrx_tkPsEk7h8Y6SVuTeNQzKo",
  authDomain: "quizapp-efd71.firebaseapp.com",
  projectId: "quizapp-efd71",
  storageBucket: "quizapp-efd71.firebasestorage.app",
  messagingSenderId: "532514952912",
  appId: "1:532514952912:web:8430f9676f339186dd30d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  app,
  getAuth,
  createUserWithEmailAndPassword,
  auth,
  doc,
  setDoc,
  db,
  signInWithEmailAndPassword,
  getDoc,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
};
