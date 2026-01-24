import React from "react";
import "./Navbar.css";

// The component accepts 'currentStreak' as a prop
function Navbar({ currentStreak }) {
  // Determine the value to display: use currentStreak if it's a valid number, otherwise default to 0
  const displayStreak =
    typeof currentStreak === "number" && currentStreak > 0 ? currentStreak : 0;

  return (
    <nav className="navbar">
      <div className="navbar-brand">bribs</div>
      <div className="navbar-links">
        {/* Display the streak count, defaulting to 0 */}
        <span className="navbar-streak">🔥 {displayStreak} Day Streak</span>
        <a href="/dashboard">Home</a>
        <a href="/nearby-hospitals">Find Help</a>
        <a href="/profile">Profile</a>
      </div>
    </nav>
  );
}

export default Navbar;
