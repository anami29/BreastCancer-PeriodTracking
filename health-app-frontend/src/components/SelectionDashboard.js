import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // 1. Import the Navbar
import "./SelectionDashboard.css";

function SelectionDashboard() {
  return (
    // Use a React Fragment <> to hold both components
    <>
      <Navbar /> {/* 2. Place the Navbar at the top */}
      <div className="selection-container">
        <Link to="/breast-cancer" className="selection-card breast-cancer-card">
          <div className="card-content">
            <h2>Breast Cancer</h2>
            <p>Learn & Explore More</p>
          </div>
        </Link>
        <Link to="/menstruation" className="selection-card menstruation-card">
          <div className="card-content">
            <h2>Menstruation</h2>
            <p>Explore More</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default SelectionDashboard;
