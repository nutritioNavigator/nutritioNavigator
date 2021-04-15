import './App.css';
import firebase from "./firebase.js"

import { useEffect, useState } from 'react';
import axios from 'axios';

const attrInfo = [
  {303: "Iron"},
  {304: "Magnesium"},
  {309: "Zinc"},
  {318: "Vitamin A, IU"},
  {323: "Vitamin E"},
  {328: "Vitamin D"},
  {401: "Vitamin C"},
  {415: "Vitamin B6"}
]


function App() {

  const [food, setFood] = useState([])

  const foodName = [];
  // Make an API call 
  useEffect( () => {
    const apiId = "338f3631";
    const apiKey = "22d6ce3bf3f9c8d2a561f57b78ff91d8";
    const apiUserId = "0";
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
      
      let data = res.data.common
            // console.log(foodName);
      console.log(data);
      setFood(res.data.common);
    })
  },[]);

  return (
    <div className="App">
      <h1>Nutrition Navigator</h1>
      {
        food.map( (oneFood) => {
          return (
            <>
              <h2>{oneFood.food_name}</h2>
              <img src={oneFood.photo.thumb} />
              
              <p></p>
            </>
          )
        })
      }
      <footer>
        <p>Created by <a href="#">Luis</a>, <a href="#">Natalie</a>, <a href="#">Sam</a>, and <a href="#">Yemisi</a> at <a href="https://junocollege.com/">Juno College</a></p>
        <p>Powered by <a href="http://www.nutritionix.com/api">Nutritionix API</a></p>
      </footer>
    </div>
  );
}

export default App;
