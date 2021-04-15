import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD7sZNVL2gJCwanEcbNIh169QcOzA6xQc4",
    authDomain: "nutritionnavigatorproject4.firebaseapp.com",
    projectId: "nutritionnavigatorproject4",
    storageBucket: "nutritionnavigatorproject4.appspot.com",
    messagingSenderId: "313266065821",
    appId: "1:313266065821:web:c200f0176a314c79d6df74"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;