import PropTypes from "prop-types";
import Img from '../assets/postcard/card-image.png'
import './posts.css'

const MyPosts = ({ title, description, category }) => {
  return (
        <div className="posts_card_flex">
          <img src={Img} alt="" />
          <div className="posts_text">
            <p>{category.name}</p>
            <h2>{title}</h2>
            <p className="line_clamp">{description}</p>
          </div>
        </div>
  );
};

MyPosts.propTypes = {
  _id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
};

export default MyPosts;