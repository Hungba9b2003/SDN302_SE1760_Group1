import React, { useState } from "react";
<<<<<<< HEAD
import axios from "axios";
=======
import "../module/Register.css"; // Import CSS vào component
>>>>>>> 8f2c448cf2c692a1a1dfd3b10ca551cfd9ea3664

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      alert("User registered successfully");
    } catch (error) {
      console.error("There was an error registering the user!", error);
=======
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Vui lòng nhập tên đầy đủ của bạn";
    if (!email) errors.email = "Vui lòng nhập email";
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email không hợp lệ";
    if (!password) errors.password = "Vui lòng nhập mật khẩu";
    if (password.length < 6) errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      console.log({ username, email, password });
>>>>>>> 8f2c448cf2c692a1a1dfd3b10ca551cfd9ea3664
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
=======
    <div className="main">
      <form className="form" id="form-1" onSubmit={handleRegister}>
        <h3 className="heading">Đăng ký tài khoản</h3>
        <div className="spacer"></div>

        <div className={`form-group ${error.username ? "invalid" : ""}`}>
          <label className="form-label" htmlFor="username">Tên đăng nhập</label>
          <input
            className="form-control"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="form-message">{error.username}</span>
        </div>

        <div className={`form-group ${error.email ? "invalid" : ""}`}>
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="form-message">{error.email}</span>
        </div>

        <div className={`form-group ${error.password ? "invalid" : ""}`}>
          <label className="form-label" htmlFor="password">Mật khẩu</label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="form-message">{error.password}</span>
        </div>

        <button className="form-submit" type="submit">Đăng ký</button>
      </form>
>>>>>>> 8f2c448cf2c692a1a1dfd3b10ca551cfd9ea3664
    </div>
  );
};

<<<<<<< HEAD
export default Register;
=======
export default Register;
>>>>>>> 8f2c448cf2c692a1a1dfd3b10ca551cfd9ea3664
