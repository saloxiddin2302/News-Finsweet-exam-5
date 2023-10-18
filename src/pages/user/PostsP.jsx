import { Input } from "antd";
import "./posts.css";
import { Fragment, useEffect, useState } from "react";
import { PAGE_LIMIT } from "../../const";
import Loading from "../../components/Load/Loading";
import PostsCard from "../../components/PostsC/PostsCard";
import Free from "../../components/Fre/Free";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Pagination } from "react-bootstrap";
import { request } from "../../server/request";

const PostsP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // let { signal, abort } = new AbortController()
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await request.get(
          `/post?search=${search}&page=${page}&limit=${PAGE_LIMIT}`
        );
        setData(data.data);
        setTotal(data.pagination.total);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
    document.querySelector("head title").textContent = "News || POSTS";
    // return () => {
    //   abort()
    // };
  }, [search, page]);

  const handleSearch = (e) => {
    setPage(1);
    setSearch(e.target.value);
  };

  const getPage = (key) => {
    setPage(key);
  };

  const items = [];
  for (let i = 1; i <= Math.ceil(total / PAGE_LIMIT); i++) {
    items.push(
      <Pagination.Item key={i} onClick={() => getPage(i)} active={i === page}>
        {i}
      </Pagination.Item>
    );
  }

  let pagination = total > PAGE_LIMIT && <Pagination>{items}</Pagination>;

  return (
    <section className="container">
      <div className="container posts_search_text">
        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <h2>All posts</h2>
      </div>
      <h2
        className="contaner"
        style={{ textAlign: "center", padding: "0px 0px" }}
      >
        Total: {total}
      </h2>
      <div className="All_posts_card container">
        {loading ? (
          <Loading />
        ) : data.length !== 0 ? (
          <Fragment>
            {data.map((post) => (
              <PostsCard key={post._id} {...post} />
            ))}
            {pagination}
          </Fragment>
        ) : (
          <Free />
        )}
      </div>
    </section>
  );
};

export default PostsP;
