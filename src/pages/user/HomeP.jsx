import './HomeP.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  useEffect, useState } from 'react';
import Loading from '../../components/Load/Loading';
import Free from '../../components/Fre/Free';
import PostCard from '../../components/PostC/PostCard';
import CardCategory from '../../components/CardCate/CardCategory';
import { Link } from 'react-router-dom';
import { request } from '../../server/request';



const HomeP = () => {

  const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 2000,
  prevArrow: <button className="slick-prev">Previous</button>,
  nextArrow: <button className="slick-next">Next</button>,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        
      },
    },
    {
      breakpoint: 675, // Bu o'lchamga yetgandagina
      settings: {
        slidesToShow: 1, // 2 ta slayd ko'rinadi
      },
    },
    {
      breakpoint: 500, // Bu o'lchamga yetgandagina
      settings: {
        slidesToShow: 1, // Faqat bir ta slayd ko'rinadi
        slidesToScroll: 2, // Va bir ta slayd o'tadi
      },
    },
  ],
};


    const [post, setData] = useState([]);
    const [categor, setDatacate] = useState([]);
    const [showcase,setDatashow]=useState({user:"",description:"",category:"",_id:"", title:""});
    const {user,description,category,_id, title} =showcase;
    const [loading, setLoading] = useState(true)
    const [error, setError ] = useState(null); // Yangi o'zgaruvchi yaratamiz

    const getData0 = async () => {
        setLoading(true);
        setError(null);
        try {
          let { data } = await request.get(`/post/lastone`);
          setDatashow(data)
        } catch (err){
          console.log(err.message);
          setError("Something went wrong. Please try again later.");
        } finally{
          setLoading(false)
        }
    }

    const getData1 = async () => {
        setLoading(true);
        setError(null);
        try {
          let { data } = await request.get(`/post/lastones`);
          setData(data)
        } catch (err){
          console.log(err.message);
          setError("Something went wrong. Please try again later.");
        } finally{
          setLoading(false)
        }
    }
    const getData2 = async () => {
        setLoading(true);
        setError(null);
        try {
          let { data } = await request.get(`/category`);
          setDatacate(data.data)
        } catch (err){
          console.log(err.message);
          setError("Something went wrong. Please try again later.");
        } finally{
          setLoading(false)
        }
    }

    
    useEffect(() =>{
      getData0();
      getData1();
      getData2();
      document.querySelector("head title").textContent = "Najot News || HOME";
    }, [])


  return (
    <section>
    <div className="homePa">
        <div className='text container'>
            <p className='p1'>Posted on <strong>{category.name}</strong></p>
            <h2  className='hh1 line_clamp'>{title}</h2><br />
            <p className='p2'>By <span className='james'>{user.first_name} {user.last_name}</span> || October 17.2023</p>
            <p className='p3 line_clamp'>{description}</p>
            <Link to={`posts/${_id}`} className='buttonn'>Read more</Link>
        </div>
    </div>


    <div style={{ padding: "45px" }}>
        <div className='container'>
          <div className='text_popular'>
            <h2>Popular blogs</h2>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Slider {...settings}>
              {post?.length !== 0 ? (
                post.map((pr) => <PostCard key={pr._id} {...pr} />)
              ) : (
                <Free />
              )}
            </Slider>
          )}
        </div>
    </div>

    <div style={{ padding: "45px" }}>
        <div className='container'>
          <h2 style={{textAlign: 'center'}}>Choose A Catagory</h2>
          {loading ? (
            <Loading />
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Slider {...settings}>
              {categor.length !== 0 ? (
                categor.map((pr) => <CardCategory key={pr._id} {...pr} />)
              ) : (
                <Free />
              )}
            </Slider>
          )}
        </div>
    </div>

    </section>
  );
};

export default HomeP;
