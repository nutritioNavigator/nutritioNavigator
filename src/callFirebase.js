import firebase from "./firebase.js";
import { DB_KEY } from "./constants.js"

const callFirebase = () => {

    const dbRef = firebase.database().ref(DB_KEY.FAVOURITES);

    const newState = [];

        dbRef.on("value", (response) => {

            console.log(response.val());

            const data = response.val();

            for (let key in data) {
                newState.push({
                    key: key,
                    name: data[key].name,
                    imgUrl: data[key].imgUrl,
                    macroNutrients: data[key].macroNutrients,
                    microNutrients: data[key].microNutrients,
                    servingInfo: data[key].servingInfo,
                })
            }
        // setDb(newState);

    })
    // console.log(newState);
    return newState;
}

export default callFirebase;