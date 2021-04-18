import { Nutrients } from './FoodItem.js';

const FoodPage = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <img src={props.imgUrl} alt={props.title}/>
      <div>
        {/* Nutrition data goes here */}
        <div>
          {/* Macros */}
          <Nutrients
          fullNutrients={props.fullNutrients}
          />
        </div>
        <div>
          {/* Micronutrients (vits and mins) */}
        </div>
      </div>
    </div>
  )
}

export default FoodPage;