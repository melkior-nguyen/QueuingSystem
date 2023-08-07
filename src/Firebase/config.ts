import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADORGThzjggNRJlxxfxGhEWsuzYYMaCPk",
  authDomain: "alta-queuing-system-721fb.firebaseapp.com",
  projectId: "alta-queuing-system-721fb",
  storageBucket: "alta-queuing-system-721fb.appspot.com",
  messagingSenderId: "151506077861",
  appId: "1:151506077861:web:2738ac104086e209e7a54c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app)