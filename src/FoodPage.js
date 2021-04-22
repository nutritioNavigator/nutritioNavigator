import { useEffect, useState } from "react";
import { useFavourites } from "./firebase.js";
import { useLocation } from "react-router-dom";

import { nutrInfo, vitsAndMins } from "./constants.js";
import HeartIcon from "./HeartIcon.js";


const FoodPage = (props) => {
    const {info, faves, setFaves} = props;
    const location = useLocation();
    const [addFavouriteFirebase, removeFavouriteFirebase] = useFavourites(setFaves);

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
      addFavouriteFirebase(dbInput);
    }
    // checkName();
  }, [dbInput])

  // use effect to compare whether or not item is in firebase favourites
  useEffect( () => {
    if (faves.filter(fave => {
      if (Object.values(fave).includes(foodItem.name)) {
        setFave(true);
      } 
    })) {
      
    } 
  }, [])

  // function to remove obj from favourites when clicked
  const removeFromFavourites = () => {
    setFave(false);
    console.log('removed');

    const fbItem = faves.filter(fave => fave.name == foodItem.name);
    removeFavouriteFirebase(fbItem);
  }

  // const checkName = (foodItem.name) => {
  //   if (faves.filter(fave => {
  //     if (Object.values(fave).includes(foodItem.name)) {
  //       console.log('is a fave');
  //     }
  //   })){}

  // }

  return (
    <div className="foodPage">
      <div className="foodPageContainer wrapper">
        <div className="foodPageTitle foodPageChild">
          <h2>{foodItem.name}</h2>
          <HeartIcon addToFaves={addToFavourites}
                     removeFromFaves={removeFromFavourites}
                     fave={fave}/>
          {/* <FontAwesomeIcon icon={faExchangeAlt} /> */}
          <div className="foodPageImg">
            <img src={foodItem.imgUrl} alt={foodItem.name}/>
          </div>
          <p>Serving quantity: {foodItem.servingInfo.servingQty}</p>
          <p>Serving weight: {foodItem.servingInfo.servingWeight} g</p>
          <p>Serving unit: {foodItem.servingInfo.servingUnit}</p>

          <div className="nutrContainer foodPageChild">
            {/* Nutrition data here */}
            <h3>Nutritional Information</h3>
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
    </div>
  )
}

export default FoodPage;
