import axios from "axios";
import { useState, useEffect } from "react";

import {Link, Route} from "react-router-dom";
import {FoodItem, Servings} from "./FoodItem.js";
import FoodPage from "./FoodPage.js"
import {nutrInfo, vitsAndMins} from "./constants.js"

const Home = (props) => {
    const [food, setFood] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [search, setSearch] = useState("banana");
  
    // Sets user input state as user types in search bar
    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    // Waits for user to finish typing, then set state to be used in API search
    const handleClick = (e) => {
        e.preventDefault();
        setSearch(userInput)
    }

    // create array of keys of the wanted nutrients, and parse int
    const wantedNutrientIds = Object.keys(nutrInfo).map(n => +n);
    const wantedVMIds = Object.keys(vitsAndMins).map(n => +n);

    // Make an API call
    useEffect( () => {
        const apiId = "338f3631";
        const apiKey = "22d6ce3bf3f9c8d2a561f57b78ff91d8";
        axios({
        url: "https://trackapi.nutritionix.com/v2/search/instant",
        method: "GET",
        dataResponse: "json",
        headers: {
            "x-app-id": apiId,
            "x-app-key": apiKey
        },
        params: {
            query: search,
            detailed: true,
        }
        }).then( (res) => {
            console.log(res.data.common);

            const data = res.data.common;

            const newState= [];
            for (let i = 0; i < data.length; i++) {
                const fullNutrients = data[i].full_nutrients;

                newState.push({
                    name: data[i].food_name,
                    imgUrl: data[i].photo.thumb,
                    servingInfo: {
                        servingQty: data[i].serving_qty,
                        servingWeight: data[i].serving_weight_grams,
                        servingUnit: data[i].serving_unit,
                    },
                    macroNutrients: fullNutrients.filter(nutrient => wantedNutrientIds.includes(nutrient.attr_id)),
                    microNutrients: fullNutrients.filter(nutrient => wantedVMIds.includes(nutrient.attr_id))
                })
            }

            setFood(newState);
        })
    },[search]);


    return (
        <>
            <form action="submit">
                <label
                htmlFor="searchbar"
                className="visuallyHidden"
                >Search food here</label>
                <input
                    id="searchbar"
                    type="text"
                    onChange={handleChange}
                    placeholder="Type search here"
                />
                <button onClick={handleClick}>Search</button>
            </form>

            <div className="wrapper">
                <div className="resultsContainer">
                    {
                    food.map( (oneFood, i) => {
                        return (
                        <>
                        <Link to={`/${oneFood.name}`} onClick={() => props.displayPage(oneFood)}>
                            <div key={i} className="foodItem">
                                <FoodItem name={oneFood.name}
                                        imgUrl={oneFood.imgUrl}
                                />
                    {/* 
                                <Servings qty={oneFood.serving_qty}
                                        unit={oneFood.serving_unit}
                                        weight={oneFood.serving_weight_grams}
                                /> */}
                            </div>
                        </Link>
                        {/* <Route
                            exact path={`/${oneFood.food_name}`}
                            render={ () => (
                                <FoodPage
                                    title={oneFood.food_name}
                                    imgUrl={oneFood.photo.thumb}
                                    fullNutrients={oneFood.full_nutrients}
                                ></FoodPage>
                            )}
                        >
                        </Route> */}
                        </>
                        )
                    }) 
                    }
                </div>
            </div>
        </>
    )
}

export default Home;