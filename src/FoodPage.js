import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Nutrients } from './FoodItem.js';
import { useState } from "react";
import firebase from "./firebase.js"

const FoodPage = (props) => {
  console.log(props);
  
  const [fave, setFave] = useState(false);
  const [dbInput, setDbInput] = useState({})

  const addToFavourites = (e) => {
    setDbInput(props);
    setFave(true);
    console.log('added to faves');

    const dbRef = firebase.database().ref();
    const newKey = dbRef.push(dbInput).key;
    console.log(newKey);
  }

  const removeFromFavourites = (title) => {
    setFave(false);
    console.log('removed');

    const dbRef = firebase.database().ref();
    console.log(dbRef);
    const toRemove = dbRef.child.hasOwnProperty(title);
    console.log(toRemove);
    // toRemove.remove()
  }
  
  return (
    <div>
      <h2>{props.title}</h2>
      <FontAwesomeIcon icon={faHeart} 
                       onClick={ !fave ?
                                 addToFavourites
                                 : () => removeFromFavourites(props.title)}
                       className={ fave ?
                                   "faved"
                                   : ""}
      />
      <FontAwesomeIcon icon={faExchangeAlt} />
      <img src={props.imgUrl} alt={props.title}/>
      <div>
        {/* Nutrition data goes here */}
        <div>
          {/* Macros */}
          {/* <Nutrients
          fullNutrients={props.fullNutrients}
          /> */}
        </div>
        <div>
          {/* Micronutrients (vits and mins) */}
        </div>
      </div>
    </div>
  )
}

export default FoodPage;