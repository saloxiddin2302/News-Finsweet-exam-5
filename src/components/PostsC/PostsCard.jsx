import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./posts.css";
import { IMG_URL } from "../../const";

const PostsCard = ({ title, description, category, _id, photo }) => {
  return (
    <div className="posts_card_flex">
      <img src={IMG_URL + photo?._id + "." + photo?.name?.split(".")[1]} alt="PostImage" />
      <div className="posts_text">
        <p>{category.name}</p>
        <h2>{title}</h2>
        <p className="line_clamp">{description}</p>
        <Link className="lnkRead" to={`${_id}`}>Read More</Link>
      </div>
    </div>
  );
};

PostsCard.propTypes = {
  _id: PropTypes.number,
  title: PropTypes.string,
  photo: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
};

export default PostsCard;
