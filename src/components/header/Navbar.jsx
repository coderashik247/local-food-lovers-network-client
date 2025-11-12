import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Container from "./Container/Container";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Successfully logged out"))
      .catch((err) => toast.error(err.message || err));
    setUserOpen(false);
  };

  const links = [
    { path: "/", name: "Home" },
    { path: "/all-reviews", name: "All Food" },
    { path: "/add-reviews", name: "Add Reviews" },
    { path: "/my-reviews", name: "My Reviews" },
    { path: "/about", name: "About" },
    { path: "/favorite", name: "Favorite" },
    { path: "/faq", name: "FAQ" },
  ].map((link, idx) => (
    <li key={idx}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-bold text-lg border-b-2 px-6 text-green-500"
            : "font-bold text-lg px-6"
        }
        to={link.path}
      >
        {link.name}
      </NavLink>
    </li>
  ));

  return (
    <Container className="border-b border-green-500">
      <div className="navbar flex justify-between items-center">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost"
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {mobileOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-2 w-52 p-2 shadow">
                {links}
              </ul>
            )}
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="btn btn-ghost text-4xl text-green-500 fontShadows">
              Food Lovers
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center justify-center transition-all"
              >
                <div className="relative inline-block">
                  <img
                    className="h-10 w-10 rounded-full ring-2 ring-white"
                    src={user.photoURL}
                    alt="User"
                  />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500"></span>
                </div>
              </button>
              {userOpen && (
                <ul className="absolute right-0 mt-2 w-52 bg-base-100 rounded-box shadow p-2 z-10">
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
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
