import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import { useEffect, useState } from 'react';
import Favourites from "./Favourites.js"
import FoodPage from "./FoodPage.js";
import Home from "./Home.js";
import nutritionix from "./nutritionixAPI.js";
import { callFirebase } from "./firebase.js";


function App() {
  const [foodInfo, setFoodInfo] = useState([]);
  const [search, setSearch] = useState("banana");
  const [faves, setFaves] = useState([]);

  // Make an API call
  useEffect( () => {
    const fetchAPI = async () => {
      setFoodInfo( await nutritionix.search(search));
    }
    fetchAPI();
  },[search]);

  // Make a firebase call for up to date database
  useEffect( () => {
    const fetchFirebase = () => {
      setFaves(callFirebase());
    }
    fetchFirebase();
  }, []);

  // function to get the query state from home.js for API call
  const getUserSearch = (query) => {
    setSearch(query);
  }

  const clickHome = () => {
    if (foodInfo.length === 0) {
      setSearch('banana');
    }
  }

  return (
    <Router>
      <div className="App">
        <header>
          <div className="wrapper">
            <div className="headerContainer">
              <Link to="/" className="logo" onClick={clickHome} >NutritioNav</Link>
              <nav>
                <Link to="/favourites">Favourites</Link>
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
                                                />}
          />
          <Route exact path="/favourites"
                       render={ () => <Favourites faves={faves}/>}
          />
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
