import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import "./SelfAssessmentPage.css";

import AwarenessStats from "./AwarenessStats";
import Awards from "./Awards";
import WellnessTip from "./WellnessTip";
import ChatWidget from "./ChatWidget";
import "./BreastCancerPage.css";
import blogData from "../data/blogData";

function SelfAssessmentPage() {
  const [streakData, setStreakData] = useState({ currentStreak: 0 });

  useEffect(() => {
    const fetchStreakData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/auth/streak`,
            {
              params: { email: userEmail },
            },
          );
          setStreakData(response.data);
        } catch (error) {
          console.error("Failed to fetch streak data:", error);
        }
      }
    };
    fetchStreakData();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar currentStreak={streakData.currentStreak} />
      <main className="dashboard-main-content">
        {/* Different section instead of carousel and info widgets */}
        <div className="self-assessment-intro">
          <h1>Self-Assessment for Breast Cancer Awareness</h1>
          <p>
            Regular self-assessment is key to early detection. Choose your
            preferred method below to learn how to perform a breast self-exam.
          </p>
        </div>

        {/* Two buttons for self assessment */}
        <div className="assessment-options-container">
          {/* Option 1: Image-based Assessment */}
          <Link to="/assessment" className="assessment-option-button">
            <img
              src="https://www.cancertherapyadvisor.com/wp-content/uploads/sites/12/2024/09/BreastCancerMonth_2024_V4_Signs-of-BC.jpg"
              alt="Image-based Assessment"
            />
            <h3>Self Assessment with Images</h3>
            <p>Step-by-step guide with visual aids.</p>
          </Link>

          {/* Option 2: Video-based Assessment */}
          <Link to="/video-assessment" className="assessment-option-button">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.al951IwZJbJxoPtX1xJomQHaD4?pid=Api&P=0&h=180"
              alt="Video-based Assessment"
            />
            <h3>Self Assessment with Videos</h3>
            <p>Guided videos for detailed instructions.</p>
          </Link>
        </div>

        {/* Blog section */}
        <h1 className="dashboard-title">Blog for breast cancer awareness</h1>
        <div className="blog-list">
          {blogData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}

export default SelfAssessmentPage;
