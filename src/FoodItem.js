import { attrInfo } from "./constants.js"


// function FoodItem(props) {
//     return (
//         <>
//             <h2>{props.food_name}</h2>
//             <img src={props.photo.thumb} alt="" />
//         </>
//     )
//     }

// function Food(props) {

    // }

function Nutrients(props) {
    const fullNutrients = props.fullNutrients

    // create array of keys of the wanted nutrients, and parse int
    const wantedNutrientIds = Object.keys(attrInfo).map(n => +n);
    // create array of only objects we want from API array
    const selectedNutrients = fullNutrients.filter(nutrient => wantedNutrientIds.includes(nutrient.attr_id));

    return (
        <div className="foodNutrients">
            <h3>Nutritional Info:</h3>
            {
            selectedNutrients.map(nutr => {
                return <p>{nutr.value} {attrInfo[nutr.attr_id]}</p>
            })
            }
        </div>
    )
}

export {
    Nutrients,
    // FoodItem
};


