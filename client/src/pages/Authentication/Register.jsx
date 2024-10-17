import React, { useEffect, useState } from "react";
import "./Authentication.css";
// import "./RegisterPopup.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import axios from "axios";
import OtpInput from "react-otp-input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [currState, setCurrState] = useState("Register");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [oldEmail, setOldEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  // const [Form, setForm] = useState({""});

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
      setOldEmail(oldEmail);
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        oldEmail: oldEmail,
        email: email,
        role: role,
      });
      document.getElementById("message-otp").textContent =
        "OTP lasts for 10 minutes !";
    } catch (error) {
      return error.response
        ? error.response.data
        : { message: "An error occurred" };
    }
  };

  let checkTimeout;

  const checkEmail = async (e) => {
    setOtp("");
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      document.getElementById("message-email").textContent =
        "Invalid email format";
      return;
    } else {
      document.getElementById("message-email").textContent = "";

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/check-email",
          {
            email: emailValue,
          }
        );
        const message = response.data.message;
        if (message) {
          setEmailAvailable(true);
          document.getElementById("message-email").style.color = "green";
          document.getElementById("message-email").textContent = message;
        }
      } catch (error) {
        document.getElementById("message-email").style.color = "red";
        document.getElementById("message-email").textContent =
          error.response.data.message;
      }
    }
  };

  const handleRegister = async () => {
    try {
      if (role === "") {
        document.getElementById("message").textContent =
          "Please choose role before register";
        document.getElementById("message").style.display = "block";
        return;
      }
      const inputs = document.querySelectorAll("#register input");
      let isEmpty = false;
      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          isEmpty = true;
        }
      });
      if (isEmpty) {
        document.getElementById("message-register").textContent =
          "Fields cannot be left blank !";
        return;
      }
      if (password !== confirmPassword) {
        document.getElementById("message-register").textContent =
          "Confirm password is wrong !";
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("otp", otp);

      // Kiểm tra dữ liệu trước khi gửi
      console.log("Sending data:", { email, password, role, name, phone });

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message === "Account registered successfully") {
        alert("User registered successfully");
        navigate("/authentication/login");
      }
      const message = response.data.errorList[0]?.message; // Tránh lỗi nếu errorList không tồn tại
      if (message) {
        document.getElementById("message-register").textContent = message;
        return;
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
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
      <span id="message-otp" style={{ color: "green" }}></span>
      {/* Phần tử hiển thị thông báo lỗi */}
    </div>
  );

  const registerForm = (
    <>
      <div className="wrapper"></div>
      <div className="content-wrapper">
        <div className="register">
          <div
            className={`register-container ${
              role === "Customer" ? "register-size" : ""
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
                    setEmail(""),
                      setPhone(""),
                      setPassword(""),
                      setConfirmPassword(""),
                      setName(""),
                      setRole(e.target.value);
                  }}
                >
                  <option value={""}>Choose role</option>
                  <option value={"Customer"}>Customer</option>
                  <option value={"Restaurant"}>Restaurant</option>
                </select>
              </div>
            </div>

            <div className="register-inputs" id="register">
              {role === "Customer" && (
                <>
                  <div className="input-row">
                    <div className="half-width">
                      <label>Email:</label>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Your email"
                          onChange={(e) => {
                            document.getElementById(
                              "message-email"
                            ).textContent = "";
                            setEmailAvailable(false);
                            clearTimeout(checkTimeout);
                            checkTimeout = setTimeout(() => {
                              checkEmail(e);
                            }, 2000);
                          }}
                        />
                      </div>
                      <p id="message-email" style={{ color: "red" }}></p>
                    </div>
                    <div className="half-width">
                      <label>Full Name:</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <p id="name-message" style={{ color: "red" }}></p>
                    </div>
                  </div>
                  {emailAvailable && OtpEnter}

                  <div className="input-row">
                    <div className="half-width">
                      <label>Password:</label>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
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
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
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
                    <div className="half-width"></div>
                  </div>
                </>
              )}

              {role === "Restaurant" && (
                <>
                  <div className="input-row">
                    <div className="half-width">
                      <label>Email:</label>
                      <input
                        type="text"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                      <label>Password:</label>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
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
                  <div className="input-row">
                    <div className="half-width">
                      <label>ID card number:</label>
                      <br></br>
                      <input
                        type="text"
                        placeholder="Retype Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="half-width">
                    <label>Front photo of ID card:</label>
                    <input
                      type="file"
                      placeholder="Retype Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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

            <button
              onClick={() => {
                handleRegister();
              }}
            >
              Create account
            </button>
            <p
              className="message"
              id="message-register"
              style={{ color: "red" }}
            ></p>

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
  return <div>{currState === "Register" && registerForm}</div>;
};

export default Register;

// const otpForm = (
//   <>
//     <div className="wrapper"></div>
//     <div className="login">
//       <div className="login-container">
//         <div className="login-title" style={{ justifyContent: "center" }}>
//           <h2>Enter OTP to active account</h2>
//         </div>
//         <OtpInput
//           value={otp}
//           onChange={(e) => {
//             setOtp(e);
//             console.log(otp);
//           }}
//           numInputs={6}
//           renderSeparator={<span style={{ width: "10px" }}></span>}
//           containerStyle={{ justifyContent: "center" }}
//           inputStyle={{ width: "2em", height: "3em", textAlign: "center" }}
//           renderInput={(props) => <input {...props} />}
//         />

//         <div className="otp-container">
//           <div
//             className="message"
//             id="messageOtp"
//             style={{
//               margin: "0 0 20px 0",
//               textAlign: "center",
//               color: "red",
//               display: "none",
//             }}
//           ></div>
//           <p className="otp-message">Have you received OTP yet?</p>
//           <button
//             onClick={handleResendOtp}
//             disabled={resendDisabled}
//             className={`resend-otp ${resendDisabled ? "disabled" : ""}`}
//           >
//             {resendDisabled
//               ? `Please try again later ${timer} second...`
//               : "Resend OTP"}
//           </button>
//         </div>
//         <div className="otp-actions">
//           <button onClick={handleBack}>Quay lại</button>
//           <button onClick={handleRegister}>Xác nhận</button>
//         </div>
//       </div>
//     </div>
//   </>
// );
