// lib/firebase.js - Firebase Client and Cloud Firestore Initializer
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAch7gz1ScVM22HW13TnCBg66soOAoLVtk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "abdullah-seo-cms.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "abdullah-seo-cms",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "abdullah-seo-cms.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "20622347219",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:20622347219:web:a9d97636f447eeb23f3d26",
};

export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.projectId &&
    firebaseConfig.apiKey
  );
};

let app = null;
let db = null;

try {
  if (isFirebaseConfigured()) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (err) {
  console.warn("Firebase initialization warning:", err.message);
}

export { app, db };
