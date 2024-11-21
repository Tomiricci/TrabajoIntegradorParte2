import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCEPsXCV6MJP_seI4RXy0VmrLaqnW9DGzY",
  authDomain: "trabajointegrador-3e622.firebaseapp.com",
  projectId: "trabajointegrador-3e622",
  storageBucket: "trabajointegrador-3e622.firebasestorage.app",
  messagingSenderId: "499026430485",
  appId: "1:499026430485:web:cf1e24592e602228ad1c1c"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()
export const storage = app.storage()