// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    User
} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN8JEdPspKqCeOefTtF5rf5ibmpD0cmao",
  authDomain: "gamechill-bbea2.firebaseapp.com",
  projectId: "gamechill-bbea2",
  appId: "1:918870991932:web:8ae04d90c2857c5d45cf39",
  measurementId: "G-W2J1PDCW4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app)

/**
 * Signs in user with popup
 * returns a promise that is resolved when user provides email and pass
 * 
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Sign out
 * returns a promise that is resolved when sign out completed
 */
export function signOutWithGoogle() {
  return auth.signOut();
}

/**
 * Callback triggered when auth state changes
 * returns a function to get rid of call back 
 * 
 */
export function onAuthStateChangedHelper(callback: (user:User | null)=>void)
{
  return onAuthStateChanged(auth,callback);
}

