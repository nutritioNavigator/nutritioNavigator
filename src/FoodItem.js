import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const FoodItem = (props) => {
    return (
        <> 
            <Link to={`/common/${props.name}`} >
                <div id={props.name} className="foodItem">
                    <h2>{props.name}</h2>
                    <div className="imgContainer">
                        <img src={props.imgUrl} alt={props.name} />
                    </div>
                    {/* <HeartIcon /> */}
                </div>
            </Link>
        </>
    )
}

export default FoodItem;


