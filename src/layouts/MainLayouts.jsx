import Navbar from "../components/header/Navbar";
import { Outlet } from "react-router";

const MainLayouts = () => {
  return (
    <>
      <div className="bg-[#a9ba2818]">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayouts;
