import { useState } from "react";
import FoodItem from "./FoodItem.js";

const Home = (props) => {
    const {foodInfo, getUserSearch} = props;
    const [userInput, setUserInput] = useState("");

    // Sets user input state as user types in search bar
    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    // Waits for user to finish typing, then set state to be used in API search
    const handleSubmit = (e, inputValue) => {
        e.preventDefault();
        getUserSearch(inputValue);
        setUserInput('');
    }
    
    return (
        <>
            <div className="wrapper">
                <form onSubmit={ (e) => handleSubmit(e, userInput)}>
                    <label
                        htmlFor="searchbar"
                        className="visuallyHidden"
                    >Search food here</label>
                    <input
                        id="searchbar"
                        type="text"
                        onChange={handleChange}
                        placeholder="Type search here"
                        value={userInput}
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                {
                    (foodInfo === undefined || foodInfo.length <= 0) ?
                    <h4 className="error">Sorry, your search could not be completed.  Please try again.</h4> : ""
                }
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