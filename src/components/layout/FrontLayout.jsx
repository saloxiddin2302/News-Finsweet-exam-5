import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <main style={{ padding: "65px 0"}}>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
