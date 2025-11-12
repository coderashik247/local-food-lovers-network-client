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
    { path: "/all-reviews", name: "All Reviews" },
    { path: "/add-reviews", name: "Add Reviews" },
    { path: "/my-reviews", name: "My Reviews" },
    { path: "/about", name: "About" },
    { path: "/favorite", name: "Favorite" },
    { path: "/faq", name: "FAQ" },
  ];

  return (
    <div>
      <nav className="flex justify-between items-center   container py-4 mx-auto  relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 rounded-full border-2 border-green-500 shadow-sm"
          />
          <span className="text-3xl fontShadows text-green-500 hover:text-green-600 transition-all">
            Food Lovers
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6 items-center">
          {links.map((link, idx) => (
            <li key={idx}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-lg border-b-2 border-green-500 text-green-600"
                    : "font-semibold text-lg text-gray-700 hover:text-green-500 transition-all"
                }
                to={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserOpen(!userOpen)}
                className="relative focus:outline-none"
              >
                <img
                  src={user.photoURL}
                  alt="User"
                  className="h-10 w-10 rounded-full ring-2 ring-green-500 shadow-md"
                />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white animate-pulse"></span>
              </button>
              {userOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-20">
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-center py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg flex flex-col lg:hidden z-10 animate-slideDown overflow-hidden">
            {links.map((link, idx) => (
              <li key={idx} className="border-b last:border-b-0">
                <NavLink
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 text-green-600 font-semibold bg-green-50"
                      : "block px-4 py-3 text-gray-700 hover:text-green-500 hover:bg-green-50 transition-all"
                  }
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <div className="border-b-1 border-green-300"></div>
    </div>
  );
};

export default Navbar;
