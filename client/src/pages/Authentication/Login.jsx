import React, { useEffect, useState } from "react";
import "./Authentication.css";
// import "./RegisterPopup.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { assets } from "../../assets/assets";
import axios from "axios";
import OtpInput from "react-otp-input";

const Login = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [Form, setForm] = useState({""});

  const handleLogin = async () => {
    console.log(username);
    console.log(password);
    if (role === "") {
      document.getElementById("message").textContent =
        "Please choose role before login";
      document.getElementById("message").style.display = "block";
      return;
    }
    navigate("/");
    try {
      const response = await axios.post(
        "http://localhost:6969/api/auth/login",
        {
          username,
          password,
        }
      );
      alert("Login successful");
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  const loginForm = (
    <>
      <div className="wrapper"></div>
      <div className="content-wrapper">
        <div className="login">
          <div className="login-container">
            <div className="login-title">
              <h2>Login</h2>
              <img
                src={assets.cross_icon}
                alt=""
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <div>
              Choose your role:
              <select
                className="select_role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  document.getElementById("message").style.display = "none";
                }}
              >
                <option value={""}>Choose role</option>
                <option value={"customer"}>Customer</option>
                <option value={"restaurant"}>Restaurant</option>
                <option value={"admin"}>Admin</option>
              </select>
            </div>
            <div className="login-inputs">
              <label>Email:</label>
              <input
                type="text"
                placeholder="Your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              className="message"
              id="message"
              style={{ color: "red", display: "none" }}
            ></div>
            <p style={{ textAlign: "right" }}>
              <span
                onClick={() => {
                  navigate("/authentication/forgetPassword");
                  document.getElementById("message").style.display = "none";
                }}
              >
                Forget password?
              </span>
            </p>
            <button onClick={handleLogin}>Login</button>

            <p>
              Create a new account?{" "}
              <span
                onClick={() => {
                  navigate("/authentication/register");
                  document.getElementById("message").style.display = "none";
                }}
              >
                Click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return <div>{currState === "login" && loginForm}</div>;
};

export default Login;
