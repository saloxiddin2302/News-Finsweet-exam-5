import PropTypes from "prop-types";
import Icon from "../../assets/cardcategor/Icon.svg"
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import './card.css';

const CardCategory = ({ _id, name, description }) => {
  return (
    <div className='card hover'>
      <Link to={`/category/${_id}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="pad">
          <img style={{width: "60px"}} src={Icon} alt="" />
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

CardCategory.propTypes = {
  _id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  // avatar: PropTypes.string,
  // lastName: PropTypes.string,
  // firstName: PropTypes.string,
  // phoneNumber: PropTypes.number,
  // email: PropTypes.string,
};

export default CardCategory;