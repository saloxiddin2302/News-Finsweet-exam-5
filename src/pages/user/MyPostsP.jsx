import { useEffect, useState } from "react";
import { request } from "../../server/request";
import { Form, Input, Modal, Select } from 'antd';
// import img from '../../assets/right.png'
import './mypost.css'
import { IMG_URL } from "../../const";
import { useForm } from "react-hook-form";

const MyPostsP = () => {
  const [posts, setPosts] = useState([]);
  const [form] = Form.useForm();
  const {
    register,
    handleSubmit,
  } = useForm()
  
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const validateMessages = {
    required: "Please fill this area!",
  };
  const onSubmit = (data) => {
    console.log(data)
  }

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("post/user");
        setPosts(data.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPosts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const submit = () => {
    setIsModalOpen(false);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };



  return (
    <section className="all_mypost container">
      <div className="head_text_mypost">
        <div>
          <h4>My Posts</h4>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" onClick={showModal}>Add Post</button>
        </div>
      </div>
      <hr />
      <input type="text" placeholder="Search...." />

      <div className="card_all_mypost">
          {posts.map(({ category, title, description, _id, photo }) => (
            <div className="card_mypost" key={_id}>
              <img src={IMG_URL + photo?._id + "." + photo.name?.split(".")[1]} alt="Img" />
              <div className="text_mypost">
                <p>{category.name}</p>
                <h2>{title}</h2>
                <p>{description}</p>
                <button className="btn btn-primary">Edit</button>
                &nbsp;<button className="btn btn-danger">Delete</button>
              </div>
            </div>      
          ))}
      </div>

      <Modal title="Add" open={isModalOpen} onOk={submit} onCancel={hideModal} >
         <Form onSubmit={handleSubmit(onSubmit)} name="form_item_path" layout="vertical" form={form} validateMessages={validateMessages}>
            <Form.Item name="Title" label="Title" rules={[{ required: true, message: "Please fill this field !", }]}>
              <Input {...register("title")}  placeholder="Title" />
            </Form.Item>

            <Form.Item name="Description" label="Description" rules={[{ required: true, message: "Please fill this field !", }]}>
              <Input.TextArea {...register("description")} placeholder="Description" />
            </Form.Item>

            <Form.Item name="Tags" label="Tag" rules={[{ required: true, message: "Please fill this field !", }]}>
              <Input {...register("tags")} placeholder="Tags" />
            </Form.Item>

            <Form.Item name="category"label="Category" rules={[{required: true, message: "Please fill this field !",},]}>
             <Select
                {...register("select")}
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'jack',
                    label: 'Jack',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'Yiminghe',
                    label: 'yiminghe',
                  },
              ]}
            />
          </Form.Item>
          </Form>
      </Modal>
    </section>
  );
};

export default MyPostsP;
