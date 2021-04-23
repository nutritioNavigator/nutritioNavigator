import { useEffect, useState } from "react";
import { useFavourites } from "./firebase.js";
import { useLocation, useHistory } from "react-router-dom";

import { nutrInfo, vitsAndMins } from "./constants.js";
import HeartIcon from "./HeartIcon.js";
import callAPI from "./callAPI.js";


const FoodPage = (props) => {
    const {foodInfo, faves, setFaves} = props;
    const location = useLocation();
    const history = useHistory();
    const [addFavouriteFirebase, removeFavouriteFirebase] = useFavourites(setFaves);
    
    const [fave, setFave] = useState(false);
    const [dbInput, setDbInput] = useState({});

    const slug = location.pathname.slice(8);

    // search for pathname to look for obj wanted in props array
    let foodItem = foodInfo.filter(one => one.name === slug)[0];
    console.log(foodInfo);
    console.log("foodItem", foodItem);
    
    
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
      
      const fbItem = faves.filter(fave => fave.name === foodItem.name);
      removeFavouriteFirebase(fbItem);
    }
    
    
    if (foodItem === undefined) {
      const newInfo = callAPI(slug);
      foodItem = newInfo.filter(one => one.name === slug)[0]; 
      // // // redirect home
      // // history.push("/");
      // return null
    }
    
    return (
    <div className="foodPage">
      <div className="foodPageContainer wrapper">
        <div className="foodPageTitle">
          <h2>{foodItem.name}</h2>

          <HeartIcon addToFaves={addToFavourites}
                     removeFromFaves={removeFromFavourites}
                     fave={fave}/>

          {/* <FontAwesomeIcon icon={faExchangeAlt} /> */}
          <div className="foodPageImg">
            <img src={foodItem.imgUrl} alt={foodItem.name}/>
          </div>
          <div className="servingInfo">
            <p>Serving quantity: {foodItem.servingInfo.servingQty}</p>
            <p>Serving weight: {foodItem.servingInfo.servingWeight}</p>
            <p>Serving unit: {foodItem.servingInfo.servingUnit}</p>
          </div>
        </div>
        <div className="nutrContainer">
          {/* Nutrition data goes here */}
          <h3>Nutritional Information:</h3>
          <div className="nutrInfoContainer">
            <div className="nutrients nutrientsChild">
              {/* Macros */}
              <h4>Macronutrients</h4>
              {foodItem.macroNutrients.map(nutr => {
                return <p>{nutrInfo[nutr.attr_id].name} {nutr.value.toFixed(2)} {nutrInfo[nutr.attr_id].unit}</p>
              })}
            </div>
            <div className="nutrients nutrientsChild">
              <h4>Micronutrients</h4>
              {foodItem.microNutrients.map(nutr => {
                return <p>{vitsAndMins[nutr.attr_id].name} {nutr.value.toFixed(2)} {vitsAndMins[nutr.attr_id].unit} </p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPage;