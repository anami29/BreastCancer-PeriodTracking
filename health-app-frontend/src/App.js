import React from "react";
// --- UPDATE THIS LINE to include 'Navigate' ---
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// We no longer need LandingPage, so its import can be removed.
// import LandingPage from './components/LandingPage';

import SelectionDashboard from "./components/SelectionDashboard";
import BreastCancerPage from "./components/BreastCancerPage";
import AssessmentPage from "./components/AssessmentPage";
import ProfilePage from "./components/ProfilePage";
import MenstruationPage from "./components/MenstruationPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* This route now works because Navigate is imported */}
          <Route path="/" element={<Navigate to="/signup" />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<SelectionDashboard />} />
          <Route path="/breast-cancer" element={<BreastCancerPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/menstruation" element={<MenstruationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
