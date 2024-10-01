import React, { useEffect, useState } from "react";
import "./Authentication.css";
// import "./RegisterPopup.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { assets } from "../../assets/assets";
import axios from "axios";
import OtpInput from "react-otp-input";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("forgetPassword");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [timer, setTimer] = useState(30);
  // const [Form, setForm] = useState({""});
  const [prevAction, setPrevAction] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const handleForgetPassword = async () => {
    if (role === "") {
      document.getElementById("message").textContent =
        "Please choose role before login";
      document.getElementById("message").style.display = "block";
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
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
  const handleResendOtp = () => {
    setResendDisabled(true);
    console.log("Resend OTP");
    setTimer(30);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBack = () => {
    setCurrState(prevAction);
    console.log("Back to previous step");
  };
  const otpForm = (
    <>
      <div className="wrapper"></div>
      <div className="login">
        <div className="login-container">
          <div className="login-title" style={{ justifyContent: "center" }}>
            <h2>Vui lòng nhập OTP</h2>
          </div>
          <OtpInput
            value={otp}
            onChange={(e) => {
              setOtp(e);
              console.log(otp);
            }}
            numInputs={6}
            renderSeparator={<span style={{ width: "10px" }}></span>}
            containerStyle={{ justifyContent: "center" }}
            inputStyle={{ width: "2em", height: "3em", textAlign: "center" }}
            renderInput={(props) => <input {...props} />}
          />

          <div className="otp-container">
            <div
              className="message"
              id="messageOtp"
              style={{
                margin: "0 0 20px 0",
                textAlign: "center",
                color: "red",
                display: "none",
              }}
            ></div>
            <p className="otp-message">Have you received OTP yet?</p>
            <button
              onClick={handleResendOtp}
              disabled={resendDisabled}
              className={`resend-otp ${resendDisabled ? "disabled" : ""}`}
            >
              {resendDisabled
                ? `Vui lòng thử lại sau ${timer} giây...`
                : "Gửi lại OTP"}
            </button>
          </div>
          <div className="otp-actions">
            <button onClick={handleBack}>Quay lại</button>
            <button
              onClick={() => {
                setCurrState("resetPassword");
                alert("OTP is correctly!");
              }}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
  const resetPasswordForm = (
    <>
      <div className="wrapper"></div>
      <div className="content-wrapper">
        <div className="login">
          <div className="login-container">
            <div className="login-title">
              <h2>Forget Password</h2>
              <img src={assets.cross_icon} alt="" />
            </div>
            <div className="login-inputs">
              Please enter the email you use to log in*
              <label>New password:</label>
              <input
                type="text"
                placeholder="Enter your new password"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Confirm new password:</label>
              <input
                type="text"
                placeholder="Enter your new password again"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div
              className="message"
              id="message"
              style={{ color: "red", display: "none" }}
            ></div>

            <button
              onClick={() => {
                navigate("/authentication/login");
                alert("Password changed successfully !");
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
            <div className="login-title">
              <h2>Forget Password</h2>
              <img src={assets.cross_icon} alt="" />
            </div>
            <div className="login-inputs">
              Please enter new password you use to log in*
              <label>New password:</label>
              <input
                type="text"
                placeholder="Enter your new password"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Confirm new password:</label>
              <input
                type="text"
                placeholder="Enter your new password again"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div
              className="message"
              id="message"
              style={{ color: "red", display: "none" }}
            ></div>
            <button
              onClick={() => {
                setCurrState("otp");
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div>
      {currState === "forgetPassword" && forgetPasswordForm}
      {currState === "otp" && otpForm}
      {currState === "resetPassword" && resetPasswordForm}
    </div>
  );
};

export default ForgetPassword;
