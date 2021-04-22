import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import { useEffect, useState } from 'react';
import Favourites from "./Favourites.js"
// import Compare from "./Compare.js"
import FoodPage from "./FoodPage.js";
import Home from "./Home.js";
import callAPI from "./callAPI.js";
import { callFirebase } from "./firebase.js";
import FavouritesFoodPage from './FavouritesFoodPage';


function App() {
  const [foodInfo, setFoodInfo] = useState([]);
  const [search, setSearch] = useState("banana");
  const [faves, setFaves] = useState([]);

  // Make an API call
  useEffect( () => {
    const fetchAPI = async () => {
      setFoodInfo( await callAPI(search));
    }
    fetchAPI();
  },[search]);

  console.log(foodInfo);

  // Make a firebase call for up to date database
  useEffect( () => {
    const fetchFirebase = () => {
      setFaves(callFirebase());
    }
    fetchFirebase();
  }, []);

 

  // function to get the query state from home.js for API call
  const getUserSearch = (query) => {
    console.log(query);
    setSearch(query);
  }



  return (
    <Router>
      <div className="App">
        <header>
          <div className="wrapper">
            <div className="headerContainer">
              <Link to="/" className="logo">NutritioNav</Link>
              <nav>
                <Link to="/favourites">Favourites</Link>
                {/* <Link to="/compare">Compare</Link> */}
              </nav>
            </div>
          </div>
        </header>

        <main>
          <Route exact path="/" 
                       render={ () => <Home foodInfo={foodInfo} 
                                getUserSearch={getUserSearch} />}
          />
          <Route exact path="/common/:name" 
                       render={ () => <FoodPage foodInfo={foodInfo} 
                                                faves={faves}
                                                setFaves={setFaves} 
                                                getUserSearch={getUserSearch}/>}
          />
          <Route exact path="/favourites" 
                       render={ () => <Favourites faves={faves}/>}
          />
          <Route exact path="/favourites/:name"
                       render={ () => <FavouritesFoodPage faves={faves}
                                                          setFaves={setFaves} />}
          />

          {/* <Route exact path="/compare" component={ Compare } /> */}
        </main>

        <footer>
          <p>Created by <a href="https://github.com/midnightorca">Natalie</a>, <a href="https://github.com/randomock">Sam</a>, and <a href="https://github.com/yemisi-codes">Yemisi</a> at <a href="https://junocollege.com/">Juno College</a></p>
          <p>Powered by <a href="http://www.nutritionix.com/api">Nutritionix API</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
