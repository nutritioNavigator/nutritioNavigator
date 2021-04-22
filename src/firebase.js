import firebase from "firebase/app";
import "firebase/database";
import { DB_KEY } from "./constants.js"

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

const callFirebase = () => {
    const dbRef = firebase.database().ref(DB_KEY.FAVOURITES);

    const newState = [];
        dbRef.on("value", (response) => {
            const data = response.val();

            for (let key in data) {
                newState.push({
                    key: key,
                    name: data[key].name,
                    imgUrl: data[key].imgUrl,
                    macroNutrients: data[key].macroNutrients,
                    microNutrients: data[key].microNutrients,
                    servingInfo: data[key].servingInfo,
                });
            }
    })
    return newState;
};

// custom hook to update local favourites state from firebase on add/remove
const useFavourites = (setFaves) => {

    // add to favourites
    const add = (dbInput) => {
        const dbRef = firebase.database().ref(DB_KEY.FAVOURITES);
        dbRef.push(dbInput);
        // update favourites state from firebase.
        setFaves(callFirebase());
    };

    // remove from favourites
    const remove = (fbItem) => {
        const keyToRemove = fbItem[0].key;
        const dbRef = firebase.database().ref('favourites');
        dbRef.child(keyToRemove).remove();
        // update favourites state from firebase
        setFaves(callFirebase());
    };
    return [add, remove];
};

export {
  firebase,
  callFirebase,
  useFavourites
};