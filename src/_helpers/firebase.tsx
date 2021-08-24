import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDUlC6W24HWDdMfaLaE3VpEDV6Ko9Po6_I",
  authDomain: "budget-project-fb8ff.firebaseapp.com",
  projectId: "budget-project-fb8ff",
  storageBucket: "budget-project-fb8ff.appspot.com",
  messagingSenderId: "575194666383",
  appId: "1:575194666383:web:55a327b63297b3377be7fa",
  measurementId: "G-XJWJGZRR1P",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a link to firebase database
export const db = firebase.firestore();

// Create a reference to firebase storage bucket
export const fireStorage = firebase.storage().ref();
