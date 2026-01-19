import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          loginIdentifier,
          password,
        }
      );
      // Save the user's email, which is now returned from the backend
      localStorage.setItem("userEmail", response.data.email);
      setMessage(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data || "Login failed.");
      } else {
        setMessage("Could not connect to the server.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email or Phone Number</label>
            <input
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="switch-auth">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
