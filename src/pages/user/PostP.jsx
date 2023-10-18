import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import img from "../../assets/post.png"
import logo from "../../assets/Image.png"
import "./posp.scss"
import { request } from "../../server/request";
import { IMG_URL } from "../../const";
const PostP = () => {
  const [post,setPost]=useState({title:"",description:"",category:"",user:"",tags:"", photo: ""});
  const params=useParams();
  const id=params.id;
  const{title,description,user,category,tags,photo}=post;
  
  useEffect(() => {
    const getPost = async () => {
      try {
        let {data} = await request.get(`/post/${id}`);
        setPost(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPost();
  }, [id]);
  return (
    <section>
      <div className="container">
        <div className="postpage">
          <img className="apa" src={(IMG_URL + photo?._id + "." + photo.name?.split(".")[1])} alt="" />
          <div className="texts">
            <div className="head">
              <div>
              <img src={logo} alt="" />
              </div>
              <div>
                <h5>

                {user.first_name}
                <span className="lastname">

                {user.last_name}
                </span>
                </h5>
                <span>Posted on 27th January 2022</span>
              </div>
            </div>
            <h2 className="title">{title}</h2>
            <h6>
              {category.name} (#{tags})
            </h6>

            <h1 className="desc">{description}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostP;
