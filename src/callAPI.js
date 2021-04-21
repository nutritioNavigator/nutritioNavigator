import axios from "axios";
import { nutrInfo, vitsAndMins } from "./constants.js";

const callAPI = async (search) => {
    // create array of keys of the wanted nutrients, and parse int
    const wantedNutrientIds = Object.keys(nutrInfo).map(n => +n);
    const wantedVMIds = Object.keys(vitsAndMins).map(n => +n);

    const apiId = "338f3631";
    const apiKey = "22d6ce3bf3f9c8d2a561f57b78ff91d8";
    const response = await axios({
        url: "https://trackapi.nutritionix.com/v2/search/instant",
        method: "GET",
        dataResponse: "json",
        headers: {
            "x-app-id": apiId,
            "x-app-key": apiKey
        },
        params: {
            query: search,
            detailed: true,
        }
    });

    const data = response.data.common;

    const newState= [];

    for (let i = 0; i < data.length; i++) {
        const fullNutrients = data[i].full_nutrients;

        newState.push({
            name: data[i].food_name,
            imgUrl: data[i].photo.thumb,
            servingInfo: {
                servingQty: data[i].serving_qty,
                servingWeight: data[i].serving_weight_grams,
                servingUnit: data[i].serving_unit,
            },
            macroNutrients: fullNutrients.filter(nutrient => wantedNutrientIds.includes(nutrient.attr_id)),
            microNutrients: fullNutrients.filter(nutrient => wantedVMIds.includes(nutrient.attr_id))
        })
    }
    return newState;
}

export default callAPI;