import React, { useEffect, useState } from "react";
import "./Authentication.css";
// import "./RegisterPopup.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { assets } from "../../assets/assets";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("forgetPassword");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [timer, setTimer] = useState(30);
  // const [Form, setForm] = useState({""});
  const [prevAction, setPrevAction] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(false);
  const token = localStorage.getItem("token");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleResendOtp = async (email) => {
    setResendDisabled(true);
    console.log("Resend OTP");
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        token,
        type: "forgetPassword",
        email: email,
      });
      document.getElementById("message-otp").textContent =
        "OTP lasts for 10 minutes !";
    } catch (error) {
      return error.response
        ? error.response.data
        : { message: "An error occurred" };
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          otp,
          email: email,
        }
      );
      if (response.status === 200) {
        setCurrState("resetPassword");
      }
    } catch (error) {
      console.log(error.message);
      document.getElementById("message").style.color = "red";
      document.getElementById("message").textContent =
        error.response.data.message;
    }
  };
  const checkEmailExists = async () => {
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").textContent = "Invalid email format";
      return;
    } else {
      document.getElementById("message").textContent = "";

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/check-email",
          {
            type: "forgetPassword",
            email: email,
          }
        );
        const message = response.data.message;
        if (response.status === 200) {
          document.getElementById("message").style.color = "green";
          document.getElementById("message").textContent =
            response.data.message;
          setEmailAvailable(true);
          handleResendOtp(email);
        }
      } catch (error) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent =
          error.response.data.message;
      }
    }
  };

  const OtpEnter = (
    <div>
      <label>Enter OTP:</label>
      <br></br>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        style={{ height: "38.18px", marginLeft: "7px" }}
        onClick={() => handleResendOtp(email)}
        disabled={resendDisabled}
        className={`resend-otp ${resendDisabled ? "disabled" : ""}`}
      >
        {resendDisabled ? `Wait ${timer}S` : "Get OTP"}
      </button>
      <br></br>
      <span id="message-otp" style={{ color: "red" }}></span>
      {/* Phần tử hiển thị thông báo lỗi */}
    </div>
  );
  const handleForgetPassword = async () => {
    if (password !== confirmPassword) {
      document.getElementById("message-register").textContent =
        "Confirm password is wrong !";
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forget-password",
        {
          email,
          password,
        }
      );
      alert("Password changed successfully !");
      navigate("/authentication/login");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const resetPasswordForm = (
    <>
      <div className="wrapper"></div>
      <div className="content-wrapper">
        <div className="login">
          <div className="login-container">
            <div className="login-title">
              <h2>Change password:</h2>
            </div>
            <div className="login-inputs">
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "20px",
                    transform: "translateY(12.5%)",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="login-inputs">
                <label>Return Password:</label>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{ width: "100%" }}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Return Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      transform: "translateY(12.5%)",
                      right: "20px",
                      zIndex: 1,
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    {/* Icon con mắt */}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="message"
              id="message"
              style={{ color: "red", display: "none" }}
            ></div>

            <button
              onClick={() => {
                handleForgetPassword();
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
  const forgetPasswordForm = (
    <>
      <div className="wrapper"></div>
      <div className="content-wrapper">
        <div className="login">
          <div className="login-container">
            <div className="">
              <h2 style={{ textAlign: "center" }}>Forgot password</h2>
            </div>
            <div className="login-inputs">
              <span style={{ color: "red" }}>
                Please enter the email you use to log in*
              </span>
              <label>Your email:</label>
              <input
                type="text"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => {
                  setOtp(""), setEmailAvailable(false);
                  setEmail(e.target.value);
                  document.getElementById("message").textContent = "";
                }}
              />
              {emailAvailable && OtpEnter}
            </div>

            <div
              className="message"
              id="message"
              style={{ color: "red" }}
            ></div>

            {!emailAvailable ? (
              <button
                onClick={() => {
                  checkEmailExists();
                }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  handleSubmitOtp();
                }}
              >
                Reset password
              </button>
            )}

            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/authentication/login");
                }}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div>
      {currState === "forgetPassword" && forgetPasswordForm}
      {currState === "resetPassword" && resetPasswordForm}
    </div>
  );
};

export default ForgetPassword;
