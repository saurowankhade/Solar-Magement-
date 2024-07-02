// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD668NUZmEhARUuUKxShj85zfqJQ9O0nWQ",
  authDomain: "solarmagement.firebaseapp.com",
  projectId: "solarmagement",
  storageBucket: "solarmagement.appspot.com",
  messagingSenderId: "340267485924",
  appId: "1:340267485924:web:1c7f1aea4dd837a28a7af1",
  measurementId: "G-PLRY9WVXSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
