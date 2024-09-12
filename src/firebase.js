// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQApMpkIh79q6XopmPekowB4ST7FlS4Uk",
  authDomain: "sedotdev.firebaseapp.com",
  projectId: "sedotdev",
  storageBucket: "sedotdev.appspot.com",
  messagingSenderId: "648034788123",
  appId: "1:648034788123:web:fdf896d01cacb88c97a9be",
  measurementId: "G-8WTF8H0HPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };