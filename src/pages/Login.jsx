import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Navbar from "../components/header/Navbar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { googleSignIn, signInWithEmailPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailPassword(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location?.state ? location.state : "/");
        toast.success("Login Successful");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location?.state ? location.state : "/");
        toast.success("Login Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[450px] mt-15">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl text-black mt-5 font-semibold text-center fontBricolage">
            Login now!
          </h1>
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <button
                  onClick={handleTogglePasswordShow}
                  className="btn btn-xs top-2 right-5 absolute"
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>

              {/*  Forgot Password */}
              <div className="text-left mt-2">
                <Link className="link link-hover text-green-600">
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-neutral text-white mt-4">Login</button>
            </fieldset>

            <p className="font-semibold text-center pt-5">
              Don’t Have An Account?{" "}
              <Link
                className="text-blue-600 underline font-semibold"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="mx-6 mb-3 btn border-2 border-green-600 rounded-2xl  text-green-600  hover:bg-green-600 hover:text-white font-semibold"
          >
            <FaGoogle className="text-red-500" />
            Login with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
