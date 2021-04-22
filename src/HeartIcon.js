import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faHeart } from '@fortawesome/free-solid-svg-icons';


const HeartIcon = (props) => {
    const {addToFaves, removeFromFaves, fave} = props;

    return (
        <FontAwesomeIcon icon={faHeart}
                         onClick={ !fave ? () => addToFaves() : () => removeFromFaves() }
                         className={ fave ? "faved" : "" }
        />
    )
}

export default HeartIcon;