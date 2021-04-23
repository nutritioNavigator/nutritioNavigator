import { useEffect, useState } from "react";
import { useFavourites } from "./firebase.js";
import { useLocation } from "react-router-dom";

import { nutrInfo, vitsAndMins } from "./constants.js";
import HeartIcon from "./HeartIcon.js";
import nutritionix from "./nutritionixAPI.js";

import { callFirebase } from "./firebase.js"


const FoodPage = (props) => {
    // PROPS ===================================================================
    const { faves, setFaves } = props;
    
    // HOOKS ===================================================================
    const location = useLocation();
    const [addFavouriteFirebase, removeFavouriteFirebase] = useFavourites(setFaves);

    // STATE ===================================================================
    const [fave, setFave] = useState(false);
    const [foodItem, setFoodItem] = useState({});

    const slug = location.pathname.slice(8);

    // USE EFFECTS =============================================================

    // retrieve food item from nutritionix api.
    useEffect( () => {
      const apiCall = async() => {
        const response = await nutritionix.get(slug);
        setFoodItem(response);
      };
      apiCall();
    }, [slug]);

    // retrieve faves from firebase.
    useEffect( () => {
      const fetchFirebase = () => {
        setFaves(callFirebase());
      }
      fetchFirebase();
    }, [setFaves]);

    // use effect to compare whether or not item is in firebase favourites
    useEffect( () => {
      faves.forEach(f => {
        if (Object.values(f).includes(foodItem.name)) {
          setFave(true);
        }
      });
    }, [faves, foodItem])

    // CLICK HANDLERS ==========================================================
    const addToFavourites = (e) => {
      // setDbInput(foodItem);
      addFavouriteFirebase(foodItem);
      setFave(true);
    }

    const removeFromFavourites = () => {
      setFave(false);

      const fbItem = faves.filter(fave => fave.name === foodItem.name);
      removeFavouriteFirebase(fbItem);
    }

    // END CLICK HANDLERS ======================================================

    // JSX =====================================================================
    return (
    <div className="foodPage">
      { Object.keys(foodItem).length > 0 &&
        <div className="foodPageContainer wrapper">
          <div className="foodPageTitle foodPageChild">
            <h2>{foodItem.name}</h2>

            <HeartIcon addToFaves={addToFavourites}
                      removeFromFaves={removeFromFavourites}
                      fave={fave}/>
            <div className="foodPageImg">
              <img src={foodItem.imgUrl} alt={foodItem.name}/>
            </div>
            <div className="servingInfo">
              <p>Serving quantity: {foodItem.servingInfo.servingQty}</p>
              <p>Serving weight: {foodItem.servingInfo.servingWeight} g</p>
              <p>Serving unit: {foodItem.servingInfo.servingUnit}</p>
            </div>
          </div>

          <div className="nutrContainer foodPageChild">
            {/* Nutrition data goes here */}
            <h3>Nutritional Information:</h3>
            <div className="nutrInfoContainer">
              <div className="nutrients nutrientsChild">
                {/* Macros */}
                <h4>Macronutrients</h4>
                {foodItem.macroNutrients.map((nutr, i) => {
                  return <p key={i}>{nutrInfo[nutr.attr_id].name} {nutr.value.toFixed(2)} {nutrInfo[nutr.attr_id].unit} </p>
                })}
              </div>
              <div className="nutrients nutrientsChild">
                <h4>Micronutrients</h4>
                {foodItem.microNutrients.map((nutr, i) => {
                  return <p key={i}>{vitsAndMins[nutr.attr_id].name} {nutr.value.toFixed(2)} {vitsAndMins[nutr.attr_id].unit} </p>
                })}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default FoodPage;