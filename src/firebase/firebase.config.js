// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAct249IHD0s4XATdJJ2ZYwfnIPDe4FhP8",
  authDomain: "local-food-lovers-networ-e99c4.firebaseapp.com",
  projectId: "local-food-lovers-networ-e99c4",
  storageBucket: "local-food-lovers-networ-e99c4.firebasestorage.app",
  messagingSenderId: "823988122085",
  appId: "1:823988122085:web:331af4d1714cc22f413f0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);