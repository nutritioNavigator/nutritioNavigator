import { useEffect, useState } from "react";
import firebase from "./firebase.js"

const Favourites = (props) => {
    const {faves} = props;

    console.log(faves);

    
    return (
        <div className="favourites">
            {faves.map( fave => {
                return (
                    <div key={fave.key}>
                        <h4>{fave.name}</h4>
                        <img src={fave.imgUrl} alt=""></img>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default Favourites;