// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTKsCo2xjGML94SJj7cUOHDmqGzBxJCxs",
  authDomain: "lumigram-dbe98.firebaseapp.com",
  projectId: "lumigram-dbe98",
  storageBucket: "lumigram-dbe98.appspot.com",
  messagingSenderId: "593113494244",
  appId: "1:593113494244:web:f0506105f57469c0e3f2f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
export const auth = initializeAuth(app);
// Initialize Storage
export const storage = getStorage(app);
// Initialize Firestore
export const db = getFirestore(app);