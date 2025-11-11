import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Container from "./Container/Container";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [userOpen, setUserOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("successfully Logout"))
      .catch((err) => toast.error(err));
    setUserOpen(false);
  };
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-bold text-lg border-b-2 px-3 text-[#a9ba28]"
              : "text-bold text-lg  px-3"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-bold text-lg border-b-2 px-3 text-[#a9ba28]"
              : "text-bold text-lg  px-3"
          }
          to="/all-food"
        >
          All Food
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-bold text-lg border-b-2 px-3 text-[#a9ba28]"
              : "text-bold text-lg  px-3"
          }
          to="/add-recipes"
        >
          Add Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-bold text-lg border-b-2 px-3 text-[#a9ba28]"
              : "text-bold text-lg  px-3"
          }
          to="/my-reviews"
        >
          My Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-bold text-lg border-b-2 px-3 text-[#a9ba28]"
              : "text-bold text-lg  px-3"
          }
          to="/about"
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-bold text-lg border-b-2 px-3 text-[#a9ba28]"
              : "text-bold text-lg  px-3"
          }
          to="/faq"
        >
          FAQ
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <Container>
        <div className="navbar  ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {" "}
                {links}{" "}
              </ul>
            </div>
            <a className="btn btn-ghost text-4xl text-[#a9ba28] fontShadows">
              Food Lovers
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1"> {links} </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    type="button"
                    className="flex mx-auto items-center justify-center transition-all mt-6 lg:mt-0"
                  >
                    <div className="relative inline-block">
                      <img
                        className="inline-block h-9.5 w-9.5 rounded-full ring-2 ring-white dark:ring-gray-800"
                        src={user?.photoURL}
                        alt="Image Description"
                      />
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-[#a9ba28]"></span>
                    </div>
                  </button>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-[#a9ba28] rounded-md hover:bg-[#74801f] transition-all"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link className="btn" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
