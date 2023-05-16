// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBucdqeh4CEitQOviqfsgQAJp8qavLQ-VU",
  authDomain: "satyam-chat-app.firebaseapp.com",
  projectId: "satyam-chat-app",
  storageBucket: "satyam-chat-app.appspot.com",
  messagingSenderId: "890126989630",
  appId: "1:890126989630:web:67222a5a7b121924fe146f",
  measurementId: "G-SXEBSWXWCD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);