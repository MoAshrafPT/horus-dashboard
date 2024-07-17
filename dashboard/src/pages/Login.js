import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Snackbar from "../components/Snackbar";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  let yourBearerToken = "";

  axios.defaults.withCredentials = true;

  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

  const handleLoginErrorClose = () => {
    setShowLoginError(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, username, password);
    axios
      .post(
        "http://localhost:8000/api/v1/users/login",
        {
          username: username,
          email: email,
          password: password,
        },
        config
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", res.data.data.user.username);
        localStorage.setItem("email", res.data.data.user.email);
        localStorage.setItem("id", res.data.data.user._id);
        localStorage.setItem("phone", res.data.data.user.phone);
        localStorage.setItem("createdAt", res.data.data.user.createdAt);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        setAttemptedLogin(true);
        setShowLoginError(true);
      });
  };

  useEffect(() => {
    setIsValidEmail(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setIsValidPassword(
      password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    );
    setIsValidUsername(username.match(/^[a-zA-Z0-9_]{3,16}$/));
  }, [email, password]);

  return (
    <>
      {showLoginError && (
        <Snackbar
          message="Invalid email or password"
          show={showLoginError}
          onClose={handleLoginErrorClose}
          type="error"
        />
      )}
      <div className="p-6 h-screen flex  justify-center items-center ">
        <form
          onSubmit={handleLogin}
          className="flex flex-col backdrop-blur-sm bg-white justify-center z-30 shadow-md h-auto rounded-xl lg:w-96 sm:w-80 min-w-80 transform animate-slideUp"
        >
          <h1 className="text-center text-3xl mt-2 ">Login</h1>
          <div className="p-4">
            <input
              type="text"
              placeholder="Email or Username"
              className={`p-2 w-full  rounded-lg mt-4 ring-1 bg-inherit ${
                touchedEmail && !isValidEmail && !isValidUsername
                  ? "ring-red-600"
                  : "ring-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setUsername(e.target.value);
              }}
              onBlur={() => setTouchedEmail(true)}
              onFocus={()=> setTouchedEmail(false)}
            />
            {touchedEmail && !email && (
              <p className="text-red-500">This field is required</p>
            )}
            {touchedEmail && !isValidEmail && !isValidUsername && email && (
              <p className="text-red-500">Invalid email or username</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`p-2 w-full  rounded-lg mt-4 ring-1 bg-inherit ${
                  touchedPassword && !isValidPassword
                    ? "ring-red-600"
                    : "ring-slate-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouchedPassword(true)}
                onFocus={()=> setTouchedPassword(false)}
              />
              <div
                className="absolute inset-y-0 right-5 pl-3  
                    flex items-center  
                    translate-y-2
                    "
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {showPassword ? (
                  <FaRegEyeSlash className="text-gray-500 hover:text-blue-400" />
                ) : (
                  <FaRegEye className="text-gray-500 hover:text-blue-400" />
                )}

                {showTooltip && (
                  <div className="absolute top-1 left-4 mt-8 p-2 text-xs text-nowrap  bg-black rounded text-white">
                    {showPassword ? "Hide password" : "Show password"}
                  </div>
                )}
              </div>
            </div>
            {touchedPassword && !password && (
              <p className="text-red-500">This field is required</p>
            )}

            {touchedPassword && !isValidPassword && password && (
              <p className="text-red-500 max-w-xs">
                Password must contain at least 8 characters, one uppercase
                letter, one lowercase letter, and one number
              </p>
            )}

            <button
              type="submit"
              disabled={!email || !password}
              className={`${
                !email || !password
                  ? "bg-gray-500"
                  : "bg-blue-600 hover:bg-teal-600 hover:z-20 text-white transition duration-200 ease-in-out transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }  p-2 rounded-lg w-full mt-4 `}
            >
              Login
            </button>
            <p className="text-center mt-4 ">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500">
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
