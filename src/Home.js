import axios from "axios";
import { useState, useEffect } from "react";

import {Link, Route} from "react-router-dom";
import {FoodItem, Servings} from "./FoodItem.js";
import FoodPage from "./FoodPage.js"

const Home = () => {
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
        setFood(res.data.common);
        })
    },[search]);


    return (
        <>
            <form action="submit">
                <input 
                    type="text"
                    onChange={handleChange}
                    placeholder="Type search here"
                />
                <button onClick={handleClick}>Search</button>
            </form>

            <div className="resultsContainer">

            {
            food.map( (oneFood, i) => {
                return (
                <>
                <Link to={`/${oneFood.food_name}`}>
                    <div key={i} className="foodItem">
                        <FoodItem name={oneFood.food_name}
                                imgUrl={oneFood.photo.thumb}
                        />

                        <Servings qty={oneFood.serving_qty}
                                unit={oneFood.serving_unit}
                                weight={oneFood.serving_weight_grams}
                        />
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
        </>
    )
}

export default Home;