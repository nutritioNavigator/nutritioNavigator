import './App.css';
// import firebase from "./firebase.js"
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt, faHeart } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react';
import { FoodItem, Nutrients } from "./FoodItem.js"
import Favourites from "./Favourites.js"
import Compare from "./Compare.js"


function App() {
  const [food, setFood] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [search, setSearch] = useState("banana");
  const [fave, setFave] = useState(false);

  // Sets user input state as user types in search bar
  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  // Waits for user to finish typing, then set state to be used in API search
  const handleClick = (e) => {
    e.preventDefault();
    setSearch(userInput)
  }

  const addToFavourites = () => {
    setFave(true);
    console.log('added to faves');
  }

  const removeFromFavourites = () => {
    setFave(false);
    console.log('removed');
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
      console.log(res);
      setFood(res.data.common);
    })
  },[search]);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>NutritioNav</h1>
          <nav>
            <Link to="/favourites">Favourites</Link>
            <Link to="/compare">Compare</Link>
          </nav>
        </header>

        <form action="submit">
          <input 
            type="text"
            onChange={handleChange}
            placeholder="Type search here"
          />
          <button onClick={handleClick}>Search</button>
        </form>

        <div className="resultsContainer">

          <Route exact path="/favourites" component={ Favourites } />
          <Route exact path="/compare" component={ Compare } />

        {
          food.map( (oneFood, i) => {
            return (
              <div key={i} className="foodItem">
                <FoodItem name={oneFood.food_name}
                          imgUrl={oneFood.photo.thumb}
                />

                <Nutrients fullNutrients={oneFood.full_nutrients} />

                <FontAwesomeIcon icon={faHeart} 
                                onClick={ !fave ?
                                          addToFavourites
                                          : removeFromFavourites}
                                className={ fave ?
                                            "faved"
                                            : ""}
                />
                <FontAwesomeIcon icon={faExchangeAlt} />
              </div>
            )
          })
        }
        </div>

        

        <footer>
          <p>Created by <a href="https://github.com/carlosbarrero">Luis</a>, <a href="https://github.com/midnightorca">Natalie</a>, <a href="https://github.com/randomock">Sam</a>, and <a href="https://github.com/">Yemisi</a> at <a href="https://junocollege.com/">Juno College</a></p>
          <p>Powered by <a href="http://www.nutritionix.com/api">Nutritionix API</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
