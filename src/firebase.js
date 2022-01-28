import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBl1MAoeXhEM2Z4T2RJl7Tk9VIV9_48Mb0",
    authDomain: "clone-instagram-aca3c.firebaseapp.com",
    projectId: "clone-instagram-aca3c",
    storageBucket: "clone-instagram-aca3c.appspot.com",
    messagingSenderId: "548414969863",
    appId: "1:548414969863:web:7a08f2ca68834b9fb932a2",
    measurementId: "G-VJ1DBEDHVZ"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const functions = firebase.functions();

  export {db, auth, storage, functions};