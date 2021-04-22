import { useEffect, useState } from "react";
import firebase from "./firebase.js"
import { Link } from 'react-router-dom';

const Favourites = (props) => {
    const {faves} = props;

    console.log(faves);

    
    return (
        <div className="favourites wrapper">
            {faves.map( fave => {
                return (
                    <Link to={`/favourites/${fave.name}`}>
                    <div className="foodItem" key={fave.key}>
                        <h2>{fave.name}</h2>
                        <div className="imgContainer"> 
                            <img src={fave.imgUrl} alt=""></img>
                        </div>
                        
                    </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Favourites;