import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, fetchUsers } from "../../redux/actions/userActions";
import { Button, Form, Input, Modal, Pagination, Table, message } from "antd";
import { PER_LIMIT } from "../../const";
import { request } from "../../server/request";
import { ExclamationCircleFilled } from "@ant-design/icons";


const { useForm } = Form;

const { TextArea } = Input;

const { confirm } = Modal;



const UsersP = () => {
  const columns = [
    {
      title: 'First_name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last_name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      render: ({_id}) => (
        <div style={{display: "flex", justifyContent: "space-between", gap: "10px"}}>
            <Button type="primary" onClick={() => editStudent(_id)}>Edit</Button>
            <Button type="primary" danger onClick={() => deleteStudent(_id)}>Delete</Button>
        </div>
      )
    },
  ];

  const dispatch = useDispatch()
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPageUser] = useState(1)
  const [selected, setSelected] = useState(null)
  
  const {users, totalUsers, loading} = useSelector(state => state.user)
  useEffect(() => {
    dispatch(fetchUsers(page))
  }, [dispatch, page]);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      console.log(values);
      selected ? await request.put("user/", values) : await request.post("user", values)
      dispatch(fetchUsers())
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addStudent = () => {
    setSelected(null);
    form.resetFields()
    showModal()
  }

  async function editStudent (id) {
    setSelected(id)
    showModal()
    try {
      let { data } = await request.get(`user/${id}`);
      form.setFieldsValue(data.data)
    } catch (err) {
      console.log(err);
    }
  }
  
  async function deleteStudent (id) {
    confirm({
      title: 'Do you want to delete this category?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        message.success("Deleted successfully !")
        dispatch(deleteUserAction(id))
      },
    });
  }

  return (
    <div>
      {loading ? (
      "...Loading"
      ) : (
      <div>
        <Table 
        pagination={false}
        title={() => 
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h1>Total: {totalUsers}</h1>
            <Button type="primary" onClick={addStudent}>Add Students</Button>
          </div>}
         dataSource={users} 
         columns={columns} 
         />
         <br />
         <Pagination pageSize={PER_LIMIT} current={page} onChange={(page) => setPageUser(page)} total={totalUsers} />
         <Modal 
          title="User" 
          open={isModalOpen} 
          okText={selected ? "Save User" : "Add User"}
          onOk={handleOk} 
          onCancel={handleCancel}
        >
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item
                name="first_name"
                label="FirstName"

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
                name="last_name"
                label="LastName"
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
                name="username"
                label="UserName"
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
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please fill this field !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
        </Modal>
      </div>
      )}

    </div>
  )
};

export default UsersP;
