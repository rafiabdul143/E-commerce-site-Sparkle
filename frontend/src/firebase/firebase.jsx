// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ7z011zlwrWEtiY9ALdkbYdlBlQX8u2c",
  authDomain: "login-otp-96ebc.firebaseapp.com",
  projectId: "login-otp-96ebc",
  storageBucket: "login-otp-96ebc.appspot.com", // ✅ corrected
  messagingSenderId: "840641770115",
  appId: "1:840641770115:web:130a43d30b317e9a93e1b6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

// ✅ Set this ONLY after auth is initialized
if (window.location.hostname === "localhost") {
  auth.settings.appVerificationDisabledForTesting = true;
}

export { auth };
