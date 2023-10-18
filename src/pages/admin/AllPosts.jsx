import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction, fetchCategories } from "../../redux/actions/categoryActions";
import { Button, Form, Image, Input, Modal, Pagination, Table, Upload, message } from "antd";
import { getImage } from "../../utils/getImage";
import { ExclamationCircleFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { request } from "../../server/request";
import { PER_PAGE } from "../../const";


const { useForm } = Form;

const { TextArea } = Input;

const { confirm } = Modal;

const AllPosts = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      render: (photo) => ( 
        <Image height={40} src={getImage(photo)}/>
      )
    },
    {
      title: 'Actions',
      render: ({_id}) => (
        <Fragment>
            <Button type="primary" onClick={() => editCategory(_id)}>Edit</Button>
            <Button type="primary" danger onClick={() => deleteCategory(_id)}>Delete</Button>
        </Fragment>
      )
    },
  ];
  // useEffect(() =>{
  //     document.querySelector("head title").textContent = "Najot News || CategoriesP";
  // }, [])
  const [form] = useForm();
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1)

  const {categories, totalCategories, loading} = useSelector(state => state.category)
  useEffect(() => {
    dispatch(fetchCategories(page))
  }, [dispatch, page]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields()
      values.photo = photo._id;
      selected ? await request.put(`category/${selected}`, values) : await request.post("category", values)
      dispatch(fetchCategories())
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addCategory = () => {
    setSelected(null);
    form.resetFields()
    setPhoto(null)
    showModal()
  }

  async function editCategory (id) {
    showModal();
    setSelected(id)
    try {
      let {data} = await request.get(`category/${id}`);
      form.setFieldsValue(data);
      setPhoto(data.photo)
    } catch (err) {
      console.log(err);
    }
  }

  function deleteCategory (id) {
    confirm({
      title: 'Do you want to delete this category?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        dispatch(deleteCategoryAction(id))
        message.success("Deleted successfully !")
      },
    });
  }


  const handleChange = async (e) => {
    try {
      let formData = new FormData();
      formData.append("file", e.file.originFileObj)
      let { data } = await request.post("upload", formData)
      setPhoto(data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {loading ? (
      "...Loading"
      ) : (
      <div>
        <Table
          pagination={false}
          title={() => (
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <h2>Total: {totalCategories}</h2>
              <Button type="primary" onClick={addCategory}>Add Posts</Button>
            </div>
          )}
          dataSource={categories} columns={columns}
        />
        <br />
        <Pagination pageSize={PER_PAGE} current={page} onChange={(page) => setPage(page)} total={totalCategories} />
        <Modal 
          title="Category" 
          open={isModalOpen} 
          okText={selected ? "Save Category" : "Add Category"}
          onOk={handleOk} 
          onCancel={handleCancel}
        >
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item>
                <Upload
                  className="category-image"
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  {photo ? (
                    <img
                      src={getImage(photo)}
                      alt="avatar"
                      style={{
                        
                        height: "100%",
                      }}
                    />
                  ) : (
                    <div>
                      {loading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                name="name"
                label="Category Name"
                rules={[
                  {
                    required: true,
                    message: "Please fill this field !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please fill this field !",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
            </Form>
        </Modal>
      </div>
      )}

    </div>
  )
};

export default AllPosts;
