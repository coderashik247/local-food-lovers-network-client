import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import Home from "../pages/Home";

const MainLayouts = () => {
  return (
    <>
      <Home></Home>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayouts;
