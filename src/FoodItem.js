import { nutrInfo, vitsAndMins } from "./constants.js"

const FoodItem = (props) => {
    return (
        <>
            <h2>{props.name}</h2>
            <div className="imgContainer">
                <img src={props.imgUrl} alt="" />
            </div>
        </>
    )
}

const Servings = (props) => {
    return (
        <>
            <p>Serving quantity: {props.qty}</p>
            <p>Serving weight: {props.weight} g</p>
            <p>Serving unit: {props.unit}</p>
        </>
    )
}

const Nutrients = (props) => {
    const fullNutrients = props.fullNutrients;

    // create array of keys of the wanted nutrients, and parse int
    const wantedNutrientIds = Object.keys(nutrInfo).map(n => +n);
    const wantedVMIds = Object.keys(vitsAndMins).map(n => +n);
    // create array of only objects we want from API array
    const selectedNutrients = fullNutrients.filter(nutrient => wantedNutrientIds.includes(nutrient.attr_id));
    const selectedVitAndMins = fullNutrients.filter(nutrient => wantedVMIds.includes(nutrient.attr_id));

    return (
        <div className="foodNutrients">
            <h3>Nutritional Info:</h3>
            <div>
                <h4>Macronutrients</h4>
                {
                selectedNutrients.map(nutr => {
                    return <p>{nutr.value} {nutrInfo[nutr.attr_id].unit} {nutrInfo[nutr.attr_id].name}</p>
                })
                }
            </div>
            <div>
                <h4>Micronutrients</h4>
                {
                selectedVitAndMins.map(nutr => {
                    return <p >{nutr.value} {vitsAndMins[nutr.attr_id].unit} {vitsAndMins[nutr.attr_id].name}</p> 
                })
                }
            </div>
        </div>
    )
}



export {
    FoodItem,
    Servings,
    Nutrients,
};


