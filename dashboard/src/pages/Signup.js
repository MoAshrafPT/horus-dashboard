import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Snackbar from "../components/Snackbar";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [attemptedSignup, setAttemptedSignup] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPasswordConfirm, setTouchedPasswordConfirm] = useState(false);
  const [showSignupError, setShowSignupError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipConfirm, setShowTooltipConfirm] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  let yourBearerToken = "";

  axios.defaults.withCredentials = true;

  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

  const checkUsernameAvailability = async () => {
    axios
      .get(`http://localhost:8000/api/v1/users/usernameAvailable/${username}`)
      .then((res) => {
        console.log(res);
        setUsernameAvailable(true);
      })
      .catch((err) => {
        console.log(err);
        setUsernameAvailable(false);
      });
  };

  const checkEmailAvailability = async () => {
    axios
      .get(`http://localhost:8000/api/v1/users/emailAvailable/${email}`)
      .then((res) => {
        console.log(res);
        setEmailAvailable(true);
      })
      .catch((err) => {
        console.log(err);
        setEmailAvailable(false);
      });
  };

  const handleSignupErrorClose = () => {
    setShowSignupError(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/users/signup", {
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        phone: phone,
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
        setAttemptedSignup(true);
        setShowSignupError(true);
      });
  };

  useEffect(() => {
    setIsValidEmail(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setIsValidPassword(
      password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    );
    setIsValidPhone(phone.match(/^01[0-2,5]{1}[0-9]{8}$/i));
    setIsValidUsername(username.match(/^[a-zA-Z0-9_]{3,16}$/));
    setIsValidPasswordConfirm(password === passwordConfirm);
  }, [username, email, password, passwordConfirm, phone]);

  return (
    <>
      {showSignupError && (
        <Snackbar
          message="An error occurred. Please try again."
          show={showSignupError}
          onClose={handleSignupErrorClose}
          type="error"
        />
      )}
      <div className="p-6 h-screen flex  justify-center items-center ">
        <form
          onSubmit={handleSignup}
          className="flex flex-col bg-white justify-center z-30 shadow-md h-auto rounded-xl lg:w-96 sm:w-80 min-w-80 transform animate-slideUp"
        >
          <h1 className="text-center text-3xl mt-2 ">Signup</h1>
          <div className="p-4">
            <input
              type="text"
              placeholder="Email"
              className={`p-2 w-full rounded-lg  bg-inherit mt-4 ring-1 ${
                touchedEmail && (!isValidEmail || !emailAvailable)
                  ? "ring-red-600"
                  : "ring-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={() => {
                setTouchedEmail(true);
                checkEmailAvailability();
              }}
              onFocus={() => {
                setTouchedEmail(false);
              }}
            />
            {touchedEmail && !email && (
              <p className="text-red-500">This field is required</p>
            )}
            {touchedEmail && !isValidEmail && email && (
              <p className="text-red-500">Invalid email</p>
            )}
            {touchedEmail && !emailAvailable && email && (
              <p className="text-red-500">Email is already taken</p>
            )}

            <input
              type="text"
              placeholder="Username"
              className={`p-2 w-full rounded-lg mt-4  bg-inherit ring-1 ${
                touchedUsername && (!isValidUsername || !usernameAvailable)
                  ? "ring-red-600"
                  : "ring-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onBlur={() => {
                setTouchedUsername(true);
                checkUsernameAvailability();
              }}
              onFocus={() => {
                setTouchedUsername(false);
              }}
            ></input>

            {touchedUsername && !username && (
              <p className="text-red-500">This field is required</p>
            )}
            {touchedUsername && !isValidUsername && username && (
              <p className="text-red-500">
                Username must be 3-16 characters, alphanumeric, underscores
                allowed
              </p>
            )}
            {touchedUsername && !usernameAvailable && username && (
              <p className="text-red-500">Username is already taken</p>
            )}

            <input
              type="text"
              placeholder="phone"
              className={`p-2 w-full rounded-lg mt-4  bg-inherit ring-1 ${
                touchedUsername && !isValidPhone
                  ? "ring-red-600"
                  : "ring-slate-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              onBlur={() => {
                setTouchedPhone(true);
              }}
              onFocus={() => {
                setTouchedPhone(false);
              }}
            ></input>

            {touchedPhone && !phone && (
              <p className="text-red-500">This field is required</p>
            )}
            {touchedPhone && !isValidPhone && phone && (
              <p className="text-red-500">
                Please enter a valid egyptian number
              </p>
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
                onFocus={() => {
                  setTouchedPassword(false);
                }}
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

            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className={`p-2 w-full  rounded-lg mt-4 ring-1 bg-inherit ${
                  touchedPasswordConfirm && !isValidPasswordConfirm
                    ? "ring-red-600"
                    : "ring-slate-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onBlur={() => setTouchedPasswordConfirm(true)}
                onFocus={() => {
                  setTouchedPasswordConfirm(false);
                }}
              />
              <div
                className="absolute inset-y-0 right-5 pl-3  
                    flex items-center  
                    translate-y-2
                    "
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                onMouseEnter={() => setShowTooltipConfirm(true)}
                onMouseLeave={() => setShowTooltipConfirm(false)}
              >
                {showPasswordConfirm ? (
                  <FaRegEyeSlash className="text-gray-500 hover:text-gray-50" />
                ) : (
                  <FaRegEye className="text-gray-500 hover:text-gray-50" />
                )}

                {showTooltipConfirm && (
                  <div className="absolute top-1 left-4 mt-8 p-2 text-xs text-nowrap  bg-black rounded">
                    {showPasswordConfirm ? "Hide password" : "Show password"}
                  </div>
                )}
              </div>
            </div>
            {touchedPasswordConfirm && !passwordConfirm && (
              <p className="text-red-500">This field is required</p>
            )}

            {touchedPasswordConfirm &&
              !isValidPasswordConfirm &&
              passwordConfirm && (
                <p className="text-red-500 max-w-xs">Passwords do not match</p>
              )}

            <button
              disabled={!email || !password}
              className={`${
                !email ||
                !password ||
                !phone ||
                !isValidPhone ||
                !isValidUsername ||
                !isValidEmail ||
                !isValidPassword ||
                !isValidPasswordConfirm ||
                !emailAvailable ||
                !usernameAvailable ||
                !passwordConfirm
                  ? "bg-gray-500"
                  : "bg-blue-600 hover:bg-teal-600 text-white hover:z-20 transition duration-200 ease-in-out transform hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }  p-2 rounded-lg w-full mt-4 `}
            >
              Signup
            </button>
            <p className="text-center mt-4 ">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
