import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDp1h1OtQbjsvorL0ctWRh-SSXrRkMv8Uo",
  authDomain: "footballcomunity-c347a.firebaseapp.com",
  projectId: "footballcomunity-c347a",
  storageBucket: "footballcomunity-c347a.appspot.com",
  messagingSenderId: "411739694373",
  appId: "1:411739694373:web:b44dd39e12c077b5d166cc",
  measurementId: "G-37L8BLLFTJ"
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();