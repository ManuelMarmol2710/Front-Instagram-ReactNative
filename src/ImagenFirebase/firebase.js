import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

 export const firebaseConfig = {
  apiKey: "AIzaSyD_pTCsAqImbB8H9jy4YovTcJr8Vbs-eTI",
  authDomain: "imagenes-tweets.firebaseapp.com",
  projectId: "imagenes-tweets",
  storageBucket: "imagenes-tweets.appspot.com",
  messagingSenderId: "572510464905",
  appId: "1:572510464905:web:1593da44c8e0e3c0a90f58",
  measurementId: "G-QY3XCH1ZML"
};
const app = firebase.initializeApp(firebaseConfig)
 export const storage = getStorage(app)

 


export {firebase}