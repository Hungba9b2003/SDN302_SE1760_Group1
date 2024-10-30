import React, { useEffect, useState } from "react";
import "./Authentication.css";
// import "./RegisterPopup.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import { assets } from "../../assets/assets";
import axios from "axios";
import OtpInput from "react-otp-input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currState, setCurrState] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [Form, setForm] = useState({""});
  const token = localStorage.getItem("token");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const checkToken = async () => {
      const currentToken = localStorage.getItem("token");
      console.log(currentToken);
      if (currentToken) {
        try {
          await axios.post("http://localhost:5000/api/auth/check-token", {
            token: currentToken,
          });
          alert("You have not logged in to your account!");
          navigate("/");
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
    };

    // Chỉ chạy checkToken nếu đường dẫn là "/"
    if (location.pathname === "/authentication/login") {
      checkToken();
    }
  }, [location.pathname, navigate]);
  const handleLogin = async () => {
    // if (role === "") {
    //   document.getElementById("message").textContent =
    //     "Please choose role before login";
    //   document.getElementById("message").style.display = "block";
    //   return;
    // }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { token, role, email, password }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
      }
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      document.getElementById("message").textContent =
        error.response.data.message;
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
                }}
              >
                <option value={""}>Choose role</option>
                <option value={"Customer"}>Customer</option>
                <option value={"Restaurant"}>Restaurant</option>
                <option value={"Admin"}>Admin</option>
              </select>
            </div>
            <div className="login-inputs">
              <label>Email:</label>
              <input
                type="text"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ width: "100%" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Return Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    transform: "translateY(12.5%)",
                    right: "20px",
                    zIndex: 1,
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Icon con mắt */}
                </span>
              </div>
            </div>
            <div
              className="message"
              id="message"
              style={{ color: "red" }}
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
