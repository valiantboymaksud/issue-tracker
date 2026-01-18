import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlX8niLIdN7FDEizHu1eaTdPvV6ey-m-w",
  authDomain: "issue-tracker-26a96.firebaseapp.com",
  projectId: "issue-tracker-26a96",
  storageBucket: "issue-tracker-26a96.firebasestorage.app",
  messagingSenderId: "157788891208",
  appId: "1:157788891208:web:b01de82af1a471b8b6507d",
  measurementId: "G-K3ZF83BBJP"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);