// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpDtU-pgZMtq-G0FSvgZgfitsW_fut_hc",
  authDomain: "notebooks-f1be8.firebaseapp.com",
  projectId: "notebooks-f1be8",
  storageBucket: "notebooks-f1be8.appspot.com",
  messagingSenderId: "787597971094",
  appId: "1:787597971094:web:94ba1a38004eef113c7cb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app