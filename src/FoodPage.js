import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import firebase from "./firebase.js";
import {nutrInfo, vitsAndMins} from "./constants.js";
import { useLocation } from "react-router-dom";

const FoodPage = (props) => {
  const {info, faves} = props;
  const location = useLocation();

  const slug = location.pathname.slice(8);

  // search for pathname to look for obj wanted in props array
  const foodItem = info.filter(one => one.name === slug)[0];
  console.log(info);
  console.log(foodItem);

  const [fave, setFave] = useState(false);
  const [dbInput, setDbInput] = useState({});

  // function to set state of dbinput to obj
  const addToFavourites = (e) => {
    setDbInput(foodItem);
    setFave(true);
    console.log('added to faves');
  }

  // useeffect to push to firebase when dbinput changes state
  useEffect( () => {
    // if statement to only push obj if not empty
    if (Object.keys(dbInput).length !== 0) {
      // console.log("use effect db input =", dbInput);
      const dbRef = firebase.database().ref('favourites');
      const newKey = dbRef.push(dbInput).key;
      console.log(newKey);
    }
  }, [dbInput])

  // function to remove obj from favourites when clicked
  const removeFromFavourites = () => {
    setFave(false);
    console.log('removed');

    const fbItem = faves.filter(fave => fave.name == foodItem.name);
    console.log(fbItem);
    const keyToRemove = fbItem[0].key;
    console.log(keyToRemove);

    const dbRef = firebase.database().ref('favourites');
    dbRef.child(keyToRemove).remove();
  }

  return (
    <div className="foodPage">
      <div className="foodPageContainer wrapper">
        <div className="foodPageTitle foodPageChild">
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
          <div className="foodPageImg">
            <img src={info.imgUrl} alt={info.name}/>
          </div>
          <p>Serving quantity: {foodItem.servingInfo.servingQty}</p>
          <p>Serving weight: {foodItem.servingInfo.servingWeight} g</p>
          <p>Serving unit: {foodItem.servingInfo.servingUnit}</p>
        </div>
        
        <div className="nutrContainer foodPageChild">
          {/* Nutrition data goes here */}
          <h3>Nutritional Information:</h3>
          <div className="nutrInfoContainer">
            <div className="nutrients nutrientsChild">
              {/* Macros */}
              <h4>Macronutrients</h4>
              {foodItem.macroNutrients.map(nutr => {
                return <p>{nutr.value} {nutrInfo[nutr.attr_id].unit} {nutrInfo[nutr.attr_id].name}</p>
              })}
            </div>
            <div className="nutrients nutrientsChild">
              <h4>Micronutrients</h4>
              {foodItem.microNutrients.map(nutr => {
                return <p >{nutr.value} {vitsAndMins[nutr.attr_id].unit} {vitsAndMins[nutr.attr_id].name}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPage;
