import PropTypes from "prop-types";

const Home = ({ _id, category, user, description }) => {
  return (
    <div className='text container'>
      <p>{_id}</p>
          <p className='p1'>Posted {category.name}</p>
          <h2  className='hh1'>{category.description}</h2><br />
          <p className='p2'>By <span className='james'>{user.first_name}</span> {user.last_name} || October.17.2023</p>
          <p className='p3'>{description}</p>
          <button className='buttonn'><a href="https://najottalim.uz/">Read More </a></button>
    </div>
  );
};

Home.propTypes = {
  _id: PropTypes.string,
  user: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
};

export default Home;