import { Fragment, useCallback, useContext, useState } from "react";
import { Button, Col, Form, Input, Row, Tabs, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { request } from "../../server/request";
import { useEffect } from "react";
import { IMG_URL } from "../../const";
import { setAuthCookies } from "../../utils/setAuthCookies";
import { AuthContext } from "../../context/AuthContext";

const { useForm } = Form;
const { TextArea } = Input;

const AdminAccount = () => {
  let items = [
    {
      label: "Information",
      key: "info",
      children: <Information />,
    },
    {
      label: "Password",
      key: "pass",
      children: <Password />,
    },
  ];
  return (
    <Fragment>
      <Tabs defaultActiveKey="info" centered items={items} />
    </Fragment>
  );
};

const Information = () => {
  const {token} = useContext(AuthContext)
  const [form] = useForm();
  const [imgLoading, setImgLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const getUserData = useCallback(() => {
    request("auth/me", { headers: { Authorization: `Bearer ${token}`} } ).then(({ data }) => {
      form.setFieldsValue(data);
      setImageUrl(data.photo);
    });
  }, [form, token]);

  useEffect(() => {
    getUserData();
  }, [callback, getUserData]);

  const handleChange = async (e) => {
    try {
      setImgLoading(true);
      // await request.delete("");
      let form = new FormData();
      form.append("file", e.file.originFileObj);
      await request.post("auth/upload", form);
      let res = await request.post("upload", form);
      console.log(res);
      setCallback(!callback);
      getUserData();
    } catch (err) {
      console.log(err);
    } finally {
      setImgLoading(false);
    }
  };

  const submit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/details", values);
      message.success("Edited successfully !");
      getUserData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Row>
      <Col lg={6}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          // beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={IMG_URL + imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            <div>
              {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
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
      </Col>
      <Col lg={18}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={submit}
        >
          <Form.Item
            name="first_name"
            label="First name"
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
            label="Last name"
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
            label="Username"
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
            name="info"
            label="Info"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
              {
                pattern: "",
                message: "+998999400807",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const Password = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const submit = async (values) => {
    try {
      setLoading(true);
      let { data } = await request.put("auth/password", values);
      setAuthCookies(data);
      message.success("Changed successfully !");
      form.resetFields();
    } catch (err) {
      message.error(err.response.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form form={form} layout="vertical" autoComplete="off" onFinish={submit}>
      <Form.Item
        name="currentPassword"
        label="Current Password"
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
        name="newPassword"
        label="New password"
        rules={[
          {
            required: true,
            message: "Please fill this field !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminAccount;
