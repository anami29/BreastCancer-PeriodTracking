import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/auth/signup", {
        name,
        email,
        phone,
        dateOfBirth,
        password,
      });

      setMessage("Signup successful! Redirecting to dashboard...");

      // --- CHANGE 1: Save the user's email so the app knows they are logged in ---
      localStorage.setItem("userEmail", email);

      // --- CHANGE 2: Redirect to the dashboard instead of the login page ---
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data || "An error occurred.");
      } else {
        setMessage("Could not connect to the server.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
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
          <button type="submit">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="switch-auth">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
