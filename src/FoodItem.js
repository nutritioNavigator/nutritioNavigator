import { nutrInfo, vitsAndMins } from "./constants.js"


const FoodItem = (props) => {
    return (
        <>
            <h2>{props.name.toUpperCase()}</h2>
            <img src={props.imgUrl} alt="" />
        </>
    )
}

const Nutrients = (props) => {
    const fullNutrients = props.fullNutrients

    // create array of keys of the wanted nutrients, and parse int
    const wantedNutrientIds = Object.keys(nutrInfo).map(n => +n);
    // create array of only objects we want from API array
    const selectedNutrients = fullNutrients.filter(nutrient => wantedNutrientIds.includes(nutrient.attr_id));

    return (
        <div className="foodNutrients">
            <h3>Nutritional Info:</h3>
            {
            selectedNutrients.map(nutr => {
                return <p >{nutr.value} {nutrInfo[nutr.attr_id]}</p>
            })
            }
        </div>
    )
}

export {
    FoodItem,
    Nutrients,
};


