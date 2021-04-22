import { useEffect, useState } from "react";
import { useFavourites } from "./firebase.js";
import { useLocation, useHistory } from "react-router-dom";

import { nutrInfo, vitsAndMins } from "./constants.js";
import HeartIcon from "./HeartIcon.js";
import callAPI from "./callAPI.js";

import axios from "axios";


const FoodPage = (props) => {
    const { foodInfo, faves, setFaves } = props;
    const location = useLocation();
    const history = useHistory();
    const [addFavouriteFirebase, removeFavouriteFirebase] = useFavourites(setFaves);
    const [apiResults, setApiResults] = useState([]);
    const [fave, setFave] = useState(false);
    const [dbInput, setDbInput] = useState({});
    const slug = location.pathname.slice(8);

    // useEffect( () => {
    //     const fetchAPI = async () => {
    //       setApiResults( callAPI(slug));
    //     }
    //     console.log('fetching');
    //     fetchAPI();
    // }, [slug]);


    console.log(slug);
    console.log(apiResults);

    // create array of keys of the wanted nutrients, and parse int
    // const wantedNutrientIds = Object.keys(nutrInfo).map(n => +n);
    // const wantedVMIds = Object.keys(vitsAndMins).map(n => +n);

    // useEffect( () => {
    //   const fetchAPI = async () => {
    //   const apiId = "338f3631";
    //   const apiKey = "22d6ce3bf3f9c8d2a561f57b78ff91d8";
    //   const res = await axios({
    //     url: "https://trackapi.nutritionix.com/v2/search/instant",
    //     method: "GET",
    //     dataResponse: "json",
    //     headers: {
    //       "x-app-id": apiId,
    //       "x-app-key": apiKey
    //     },
    //     params: {
    //       query: slug,
    //       detailed: true,
    //     }
    //   })
    //     fetchAPI();
    //     console.log(res);

    //     const data = res.data.common;
    //     const newState= [];
    //     for (let i = 0; i < data.length; i++) {
    //         const fullNutrients = data[i].full_nutrients;

    //         newState.push({
    //             name: data[i].food_name,
    //             imgUrl: data[i].photo.thumb,
    //             servingInfo: {
    //                 servingQty: data[i].serving_qty,
    //                 servingWeight: data[i].serving_weight_grams,
    //                 servingUnit: data[i].servingUnit,
    //             },
    //             macroNutrients: fullNutrients.filter(nutrient => wantedNutrientIds.includes(nutrient.attr_id)),
    //             microNutrients: fullNutrients.filter(nutrient => wantedVMIds.includes(nutrient.attr_id))
    //         })
    //     }
    //     setApiResults(newState);
    //   }
    // },[slug]);

    // console.log(apiResults);

    // let foodItem = [];
    let foodItem = foodInfo.filter(one => one.name === slug)[0];
          // return foodItem;

    // search for pathname to look for obj wanted in props array
    // useEffect( () => {
    //     if (apiResults.length !== 0) {
    //       let foodItem = apiResults.filter(one => one.name === slug)[0];
    //       return foodItem;
    //     }
    // }, [apiResults, slug]);
    // console.log("foodItem", foodItem);

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
    
    useEffect( () => {
      if (faves.filter(fave => {
        if (Object.values(fave).includes(foodItem.name)) {
          setFave(true);
        } 
      })) {
        
      } 
    }, [foodItem, faves])
    // use effect to compare whether or not item is in firebase favourites
    
    // function to remove obj from favourites when clicked
    const removeFromFavourites = () => {
      setFave(false);
      console.log('removed');
      
      const fbItem = faves.filter(fave => fave.name === foodItem.name);
      removeFavouriteFirebase(fbItem);
    }
    
    
    if (foodItem === undefined) {
      // const newInfo = callAPI(slug);
      // foodItem = newInfo.filter(one => one.name === slug)[0]; 
      console.log('fail');
      // // // redirect home
      history.push("/");
      // return null
    }
    
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
