import './App.css';
// import firebase from "./firebase.js"
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom"

import { useEffect, useState } from 'react';
import { FoodItem, Servings, Nutrients } from "./FoodItem.js"
import Favourites from "./Favourites.js"
// import Compare from "./Compare.js"
import FoodPage from './FoodPage.js';
import Home from "./Home.js"


function App() {

  const [foodInfo, setFoodInfo] = useState([])

  const displayFoodPage = (info) => {
    console.log(info);
    setFoodInfo(info);
  }

  console.log(foodInfo);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <Link to="/" className="logo">NutritioNav</Link>
          <nav>
            <Link to="/favourites">Favourites</Link>
            <Link to="/compare">Compare</Link>
          </nav>
        </header>

        <main>
          <Route exact path="/" 
                       render={ () => <Home displayPage={displayFoodPage} />}
                        />
          <Route exact path="/:name" 
                       render={ () => <FoodPage info={foodInfo} />}
          />
          <Route exact path="/favourites" component={ Favourites } />
          {/* <Route exact path="/compare" component={ Compare } /> */}
        </main>


        <footer>
          <p>Created by <a href="https://github.com/midnightorca">Natalie</a>, <a href="https://github.com/randomock">Sam</a>, and <a href="https://github.com/">Yemisi</a> at <a href="https://junocollege.com/">Juno College</a></p>
          <p>Powered by <a href="http://www.nutritionix.com/api">Nutritionix API</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
