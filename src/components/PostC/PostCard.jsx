import PropTypes from "prop-types";
// import postImg from "../../assets/postcard/card-image.png"
import './PostCard.css'
import { Link } from "react-router-dom";
import { IMG_URL } from "../../const";

const PostCard = ({title, description, user, _id, photo }) => {
  return (
    <div className='card'>
        <img className="aas" src={IMG_URL + photo?._id + "." + photo?.name?.split(".")[1]} alt="Img" />
        <div>
          <p className="user_info_postcard"> By <a href="">{user.first_name} {user.last_name}</a> | Aug 23 2021</p><br />
          <div className="popular_text">
            <h2 className="line_clamp2">{title}</h2><br />
            <p className="line_clamp2">{description}</p>
            <Link className="lnkRead" to={`/posts/${_id}`}>Read More</Link>
          </div>
        </div>
    </div>
  );
};

PostCard.propTypes = {
  _id: PropTypes.number,
  title: PropTypes.string,
  photo: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.string,
};

export default PostCard;