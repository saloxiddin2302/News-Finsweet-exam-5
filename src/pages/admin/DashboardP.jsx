import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Card, Col, Row } from "antd";
import { fetchUsers } from "./../../redux/actions/userActions";
import { fetchCategories } from "../../redux/actions/categoryActions";

const DashboardP = () => {
  const dispatch = useDispatch();
  const { totalCategories } = useSelector((state) => state.category);
  const { totalUsers } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <Row gutter={9}>
      <Col lg={8}>
        <Card title="Total categories">
          <p>{totalCategories}</p>
        </Card>
      </Col>
      <Col lg={8}>
        <Card title="Total users">
          <p>{totalUsers}</p>
        </Card>
      </Col>
      <Col lg={8}>
        <Card title="Total posts">
          <p>{totalCategories}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardP;
