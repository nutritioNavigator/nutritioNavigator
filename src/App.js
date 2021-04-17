import './App.css';
// import firebase from "./firebase.js"
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Nutrients } from "./FoodItem.js"

function App() {
  const [food, setFood] = useState([])

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
        query: "banana",
        detailed: true,
      }
    }).then( (res) => {
      console.log(res.data.common);
      setFood(res.data.common);
    })
  },[]);

  return (
    <div className="App">
      <h1>Nutrition Navigator</h1>
      <div className="resultsContainer">

      {
        food.map( (oneFood, i) => {
          return (
            <div key={i} className="foodItem">
              <h2>{oneFood.food_name.toUpperCase()}</h2>
              <img src={oneFood.photo.thumb} alt=""/>

              <Nutrients fullNutrients={oneFood.full_nutrients} />
            </div>
          )
        })
      }
      </div>
      <footer>
        <p>Created by <a href="https://github.com/carlosbarrero">Luis</a>, <a href="https://github.com/midnightorca">Natalie</a>, <a href="https://github.com/randomock">Sam</a>, and <a href="#">Yemisi</a> at <a href="https://junocollege.com/">Juno College</a></p>
        <p>Powered by <a href="http://www.nutritionix.com/api">Nutritionix API</a></p>
      </footer>
    </div>
  );
}

export default App;
