import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";

const firebaseConfig = firebase.initializeApp({
    /*
      CRIE UM PROJETO NO FIREBASE, UMA APLICAÇÃO WEB
      PEGUE OS SEU DADOS DE CONFIGURAÇÃO E COLE AQUI
    */
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const functions = firebase.functions();

  export {db, auth, storage, functions};