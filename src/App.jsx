import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FrontLayout from "./components/layout/FrontLayout";
import AdminLayout from "./components/layout/AdminLayout";


import AboutP from "./pages/user/AboutP";


import RegisterP from "./pages/user/RegisterP";


import UserAccountP from "./pages/user/UserAccountP";
import NotFoundP from "./pages/NotFoundP";
import DashboardP from "./pages/admin/DashboardP";
import UsersP from "./pages/admin/UsersP";
import AllPosts from "./pages/admin/AllPosts";
import CategoriesP from "./pages/admin/CategoriesP";

import { AuthContext } from "./context/AuthContext";
import Category from "./pages/user/Category";

import LoginP from "./pages/user/LoginP";

import MyPostsP from "./pages/user/MyPostsP";
import PostP from "./pages/user/PostP";
import PostsP from "./pages/user/PostsP";
import HomeP from "./pages/user/HomeP";
import AdminAccountP from "./pages/admin/AdminAccountP";



function App() {
  let { isAuthenticated,role } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomeP />} />
          <Route path="about" element={<AboutP />} />
          <Route path="login" element={<LoginP />} />
          <Route path="register" element={<RegisterP />} />
          <Route path="posts" element={<PostsP />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="posts/:id" element={<PostP />} />
          {isAuthenticated && role==="user"&& (
            <Fragment>
              <Route path="my-posts" element={<MyPostsP />} />
              <Route path="account-user" element={<UserAccountP />} />
            </Fragment>
          )}
        </Route>
        {isAuthenticated && role==="admin"&& (
          <Fragment>
            <Route path="/" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardP />} />
              <Route path="users" element={<UsersP />} />
              <Route path="categories" element={<CategoriesP />} />
              <Route path="all-posts" element={<AllPosts />} />
              <Route path="admin-account" element={<AdminAccountP />} />
            </Route>
          </Fragment>
        )}
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
