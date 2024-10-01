import React, { useEffect, useState } from "react";
import "./Authentication.css";
// import "./RegisterPopup.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import axios from "axios";
import OtpInput from "react-otp-input";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [currState, setCurrState] = useState("Register");
  const [confirmPassword, setConfirmPassword] = "";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [timer, setTimer] = useState(30);
  const [prevAction, setPrevAction] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  // const [Form, setForm] = useState({""});
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
  const handleRegister = async () => {
    try {
      if (role === "") {
        document.getElementById("message").textContent =
          "Please choose role before register";
        document.getElementById("message").style.display = "block";
        return;
      }
      if (timer == 30) {
        handleResendOtp();
      }
      setCurrState("Otp");

      if (otp === "123456") {
        navigate("/authentication/login", { registerSuccess: "oke" });
      } else {
        document.getElementById("messageOtp").textContent =
          "OTP nhập không đúng";
        document.getElementById("messageOtp").style.display = "block";
        return;
      }
      alert("User registered successfully");
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
        role,
        name,
        phone,
        address,
      });
    } catch (error) {
      console.error("There was an error registering the user!", error);
    }
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
            <button onClick={handleRegister}>Xác nhận</button>
          </div>
        </div>
      </div>
    </>
  );

  const registerForm = (
    <>
      <div className="wrapper"></div>
      <div className="content-wrapper">
        <div className="register">
          <div
            className={`register-container ${
              role === "customer" ? "register-size" : ""
            }`}
          >
            <div className="register-title">
              <h2>Create Account</h2>
              <img src={assets.cross_icon} alt="" />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "1rem" }}>Choose your role:</p>
                <select
                  style={{ marginLeft: "10px", height: "2rem" }}
                  className="select_role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    document.getElementById("message2").style.display = "none";
                  }}
                >
                  <option value={""}>Choose role</option>
                  <option value={"customer"}>Customer</option>
                  <option value={"restaurant"}>Restaurant</option>
                </select>
              </div>
            </div>

            <div className="register-inputs">
              {role === "customer" && (
                <>
                  <div className="input-row">
                    <div className="half-width">
                      <label>Email:</label>
                      <input
                        type="text"
                        placeholder="Your email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="half-width">
                      <label>Full Name:</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="half-width">
                      <label>Password:</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="half-width">
                      <label>Phone:</label>
                      <input
                        type="text"
                        placeholder="Your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="half-width">
                      <label>Return Password:</label>
                      <input
                        type="password"
                        placeholder="Retype Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="half-width">
                      <label>Address:</label>
                      <input
                        type="text"
                        placeholder="Your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="half-width">
                    <label>Avatar:</label>
                    <input
                      type="file"
                      onChange={(e) => setAvatar(e.target.files[0])}
                    />
                  </div> */}
                </>
              )}

              {role === "restaurant" && (
                <>
                  <div className="input-row">
                    <div className="half-width">
                      <label>Email:</label>
                      <input
                        type="text"
                        placeholder="Your email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="half-width">
                      <label>Restaurant Name:</label>
                      <input
                        type="text"
                        placeholder="Enter restaurant name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="half-width">
                      <label>Password:</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="half-width">
                      <label>Phone:</label>
                      <input
                        type="text"
                        placeholder="Your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="half-width">
                      <label>Return Password:</label>
                      <input
                        type="password"
                        placeholder="Retype Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="half-width">
                      <label>Restaurant address:</label>
                      <input
                        type="text"
                        placeholder="Restaurant address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="half-width">
                    <label>Avatar:</label>
                    <input
                      type="file"
                      onChange={(e) => setAvatar(e.target.files[0])}
                    />
                  </div> */}
                </>
              )}
            </div>
            <div
              className="message"
              id="message"
              style={{ color: "red", display: "none" }}
            ></div>
            <button
              onClick={() => {
                setPrevAction("Register");
                handleRegister();
              }}
            >
              Create account
            </button>

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
      {currState === "Register" && registerForm}
      {currState === "Otp" && otpForm}
    </div>
  );
};

export default Register;
