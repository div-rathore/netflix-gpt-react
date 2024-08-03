// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxLnbfdS_Q28zhJAzNtwYoyiI9ILTluqQ",
  authDomain: "netflix-gpt-react-fc505.firebaseapp.com",
  projectId: "netflix-gpt-react-fc505",
  storageBucket: "netflix-gpt-react-fc505.appspot.com",
  messagingSenderId: "197880168131",
  appId: "1:197880168131:web:d5178f442942193a3dac76",
  measurementId: "G-1K6LYPW7FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()