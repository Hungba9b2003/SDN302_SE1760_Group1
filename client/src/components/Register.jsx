import React, { useState } from "react";
import "../module/Register.css"; // Import CSS vào component

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    }
  };

  return (
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
    </div>
  );
};

export default Register;