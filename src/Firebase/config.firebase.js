// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLaRf-kXoX68zYI6ngPEgnSafltDsQmKc",
  authDomain: "trackify-ph-a10.firebaseapp.com",
  projectId: "trackify-ph-a10",
  storageBucket: "trackify-ph-a10.firebasestorage.app",
  messagingSenderId: "389048670375",
  appId: "1:389048670375:web:432b5f75c5268531256382",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
