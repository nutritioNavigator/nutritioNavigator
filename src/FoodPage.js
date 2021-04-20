import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Nutrients } from './FoodItem.js';
import { useState } from "react";
import firebase from "./firebase.js";
import {nutrInfo, vitsAndMins} from "./constants.js";

const FoodPage = (props) => {
  const {info} = props;
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
      <h2>{info.name}</h2>
      <FontAwesomeIcon icon={faHeart} 
                       onClick={ !fave ?
                                 addToFavourites
                                 : () => removeFromFavourites(props.title)}
                       className={ fave ?
                                   "faved"
                                   : ""}
      />
      <FontAwesomeIcon icon={faExchangeAlt} />
      <img src={info.imgUrl} alt={info.name}/>
      <div>
        {/* Nutrition data goes here */}
        <h3>Nutritional Information</h3>
        <div>
          {/* Macros */}
          <h4>Macronutrients</h4>
          {info.macroNutrients.map(nutr => {
            return <p>{nutr.value} {nutrInfo[nutr.attr_id].unit} {nutrInfo[nutr.attr_id].name}</p>
          })}
        </div>
        <div>
          <h4>Micronutrients</h4>
          {info.microNutrients.map(nutr => {
            return <p >{nutr.value} {vitsAndMins[nutr.attr_id].unit} {vitsAndMins[nutr.attr_id].name}</p> 
          })}
        </div>
      </div>
    </div>
  )
}

export default FoodPage;