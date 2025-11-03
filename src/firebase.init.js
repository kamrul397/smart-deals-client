// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjh6Ezm6yRLo67v8NtusixwUN_3gZWljk",
  authDomain: "smart-deals-562cf.firebaseapp.com",
  projectId: "smart-deals-562cf",
  storageBucket: "smart-deals-562cf.firebasestorage.app",
  messagingSenderId: "169978880459",
  appId: "1:169978880459:web:ea072f097800c629b7964e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
