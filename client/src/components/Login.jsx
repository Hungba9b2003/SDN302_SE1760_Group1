<<<<<<< HEAD
import React, { useState } from "react";
=======
import { useState } from "react";
>>>>>>> 8f2c448cf2c692a1a1dfd3b10ca551cfd9ea3664
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setToken(response.data.token);
      alert("Login successful");
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default Login;
