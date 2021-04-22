import { useState} from "react";

import FoodItem from "./FoodItem.js";

const Home = (props) => {
    const {foodInfo, getUserSearch} = props
    const [userInput, setUserInput] = useState("");

    // Sets user input state as user types in search bar
    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    // Waits for user to finish typing, then set state to be used in API search
    const handleClick = (e) => {
        e.preventDefault();
        getUserSearch(userInput);
    }

    return (
        <>
            <div className="wrapper">
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
            </div>

            <div className="wrapper">
                <div className="resultsContainer">
                    {
                    // map through each obj in api result array to display to page
                    foodInfo.map( (oneFood, i) => {
                        return ( <FoodItem name={oneFood.name}
                                           imgUrl={oneFood.imgUrl} 
                                           key={i}/>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default Home;