import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC7mSikd6KU3UF3TmHPAAOACjWlp9r5Nb0",
  authDomain: "proyecto-psicomedica-6dbc5.firebaseapp.com",
  projectId: "proyecto-psicomedica-6dbc5",
  storageBucket: "proyecto-psicomedica-6dbc5.appspot.com",
  messagingSenderId: "443667900809",
  appId: "1:443667900809:web:6407d732b24f60f4be5958",
  measurementId: "G-EQTS4VMWBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);//Conexion modulo de firebase
export const db = getFirestore(app);//conexion base de datos firestore
export const store = getStorage(app);//conexion con el storage de firebase

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:"select_account"})