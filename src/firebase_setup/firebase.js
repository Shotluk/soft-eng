// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9t_1XRDMD_KkvCoUmNmvKuFtn7_pllso",
  authDomain: "software-eng-348e4.firebaseapp.com",
  projectId: "software-eng-348e4",
  storageBucket: "software-eng-348e4.appspot.com",
  messagingSenderId: "583501445444",
  appId: "1:583501445444:web:135766698dda6d98e27f11",
  measurementId: "G-36X7L9MBTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,'firestoreApp');
export const firestore = getFirestore(app)