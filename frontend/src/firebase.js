// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOtJLkH6Y20PHBg1M4oBgEa3Vy4c2LKqw",
  authDomain: "mern-realstate-335de.firebaseapp.com",
  projectId: "mern-realstate-335de",
  storageBucket: "mern-realstate-335de.appspot.com",
  messagingSenderId: "805903193807",
  appId: "1:805903193807:web:539d86a117b300412509ba",
  measurementId: "G-X1MN6C91L4"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);