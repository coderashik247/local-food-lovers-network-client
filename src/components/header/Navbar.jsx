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
      .then(() => toast.success("Successfully logged out"))
      .catch((err) => toast.error(err));
    setUserOpen(false);
  };

  const links = (
    <>
      {[
        "/",
        "/all-reviews",
        "/add-reviews",
        "/my-reviews",
        "/about",
        "/faq",
      ].map((path, idx) => {
        const names = [
          "Home",
          "All Food",
          "Add Reviews",
          "My Reviews",
          "About",
          "FAQ",
        ];
        return (
          <li key={idx}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-bold text-lg border-b-2 px-3 text-green-500"
                  : "text-bold text-lg px-3"
              }
              to={path}
            >
              {names[idx]}
            </NavLink>
          </li>
        );
      })}
    </>
  );

  return (
    <Container className="border-b border-green-500">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-4xl text-green-500 fontShadows">
            Food Lovers
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
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
                    alt="User"
                  />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500"></span>
                </div>
              </button>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="btn bg-green-500 hover:bg-green-600 text-white"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
