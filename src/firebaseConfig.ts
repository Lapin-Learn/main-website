// firebaseConfig.js
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let analytics;

if (typeof window !== "undefined") {
  // Ensure we are in the browser
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics, auth };
