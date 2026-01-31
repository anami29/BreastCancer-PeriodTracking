import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// The component accepts 'currentStreak' as a prop
function Navbar({ currentStreak }) {
  // Determine the value to display
  const displayStreak =
    typeof currentStreak === "number" && currentStreak > 0 ? currentStreak : 0;

  return (
    <nav className="navbar">
      <div className="navbar-brand">bribs</div>

      <div className="navbar-links">
        {/* Streak */}
        <span className="navbar-streak">🔥 {displayStreak} Day Streak</span>

        {/* Dashboard */}
        <Link to="/dashboard">📊 Dashboard</Link>

        {/* Home → Breast Cancer Page */}
        <Link to="/breast-cancer">🏠 Home</Link>

        {/* Nearby Hospitals */}
        <Link to="/nearby-hospitals">🩺 Find Help</Link>

        {/* Profile */}
        <Link to="/profile">👤 Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
