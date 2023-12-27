// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQAX1OrBIX3693YHbJbdFkrJoLMs9nrYo",
  authDomain: "movie-typescript.firebaseapp.com",
  databaseURL: "https://movie-typescript-default-rtdb.firebaseio.com",
  projectId: "movie-typescript",
  storageBucket: "movie-typescript.appspot.com",
  messagingSenderId: "105313682023",
  appId: "1:105313682023:web:5f3dba21aefe22a9f48ac2",
  measurementId: "G-DDG76BQ1EC"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;