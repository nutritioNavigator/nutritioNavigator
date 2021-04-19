import { useEffect, useState } from "react";
import firebase from "./firebase.js"

const Favourites = () => {
    const [faves, setFaves] = useState([]);

    useEffect( () => {
        const dbRef = firebase.database().ref();

        dbRef.on("value", (response) => {
            const newState = [];

            // console.log(response.val());

            const data = response.val();

            for (let key in data) {
                newState.push({
                    key: key,
                    name: data[key].title,
                    imgUrl: data[key].imgUrl,
                    fullNutrients: data[key].fullNutrients
                })
                console.log(newState);
            }
        setFaves(newState);
        })
    }, [])
    
    return (
        <div className="favourites">
            {faves.map( fave => {
                return (
                    <div key={fave.key}>
                        <h4>{fave.name}</h4>
                        <img src={fave.imgUrl} alt=""></img>
                        <p>Nutritional Info</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Favourites;