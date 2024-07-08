// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getEnv } from "./getEnv";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: getEnv.apiKey,
  authDomain: getEnv.authDomain,
  projectId: getEnv.projectId,
  storageBucket: getEnv.storageBucket,
  messagingSenderId: getEnv.messagingSenderId,
  appId: getEnv.appId,
  measurementId: getEnv.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
