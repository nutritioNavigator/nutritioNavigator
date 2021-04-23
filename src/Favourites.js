import FoodItem from "./FoodItem.js"

const Favourites = (props) => {
    const {faves} = props;

    return (
        <div className="favourites wrapper">
            {faves.map( fave => {
                return (
                    <FoodItem name={fave.name}
                              imgUrl={fave.imgUrl} />
                )
            })}
        </div>
    )
}

export default Favourites;