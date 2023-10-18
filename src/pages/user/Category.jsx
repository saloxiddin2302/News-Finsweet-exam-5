import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Load/Loading";
import CategoryPosts from "../../components/CatePost/CategoryPosts";
import Free from "../../components/Fre/Free";
import { Input, Pagination } from "antd";
import { request } from "../../server/request";
import { PG_LIMIT } from "../../const";

const Category = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState({ name: "", description: "" });
  const { name, description } = category;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        let { data } = await request.get(`/post?category=${id}&search=${search}&page=${page}&limit=${PG_LIMIT}`);
        setData(data.data);
        setTotal(data.pagination.total);
      } catch (err) {
        console.log(err.message);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };


    const getCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        let { data } = await request.get(`/category/${id}`);
        setCategory(data);
      } catch (err) {
        console.log(err.message);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getData();
    getCategory();
  }, [id, search, page]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  

  return (
    <div className="main">
      <div className="head container">
        <h2>{name.toUpperCase()}</h2>
        <p>{description}</p>
        <h3>BLOG {"< " + name.toUpperCase()}</h3>
      </div>
      <div className="container">
        <Input
          className="categorypostsinput"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        <h2 className="contaner" style={{ textAlign: "center", padding: "20px 0px" }}>Total: {total}</h2>
        <span></span>
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : data?.length !== 0 ? (
          <Fragment>
            {data.map((post) => (
              <CategoryPosts key={post._id} {...post} />
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {total == 1 || total == 0 ? '' : <Pagination
                current={page}
                total={total}
                pageSize={PG_LIMIT}
                onChange={(pageNum) => setPage(pageNum)}
              /> }
            </div>
          </Fragment>
        ) : (
          <Free />
        )}
      </div>
    </div>
  );
};

export default Category;