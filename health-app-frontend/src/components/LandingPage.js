import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { name, email, password });
    navigate("/dashboard");
  };

  const handleGuestClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="landing-container">
      <h1 className="slogan">Your Health, Your Control.</h1>
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login / Sign Up</button>
        </form>
      </div>
      <div className="guest-mode">
        <p>or</p>
        <button onClick={handleGuestClick} className="guest-button">
          Continue as Guest (Scroll for free)
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
