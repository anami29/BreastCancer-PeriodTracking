import React, { useState, useEffect } from "react"; // Import hooks
import axios from "axios"; // Import axios
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import ImageCarousel from "./ImageCarousel";
import AwarenessStats from "./AwarenessStats";
import Awards from "./Awards";
import WellnessTip from "./WellnessTip"; // 1. Import the new component
import ChatWidget from "./ChatWidget"; // 1. Import the new component

const blogData = [
  {
    id: 1,
    title: "Understanding Early Detection",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500",
    readMoreUrl:
      "https://www.nationalbreastcancer.org/early-detection-of-breast-cancer/",
  },
  {
    id: 2,
    title: "Myth vs. Fact",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500",
    readMoreUrl: "https://www.bcrf.org/breast-cancer-myths-and-facts/",
  },
  {
    id: 3,
    title: "Nutrition and Lifestyle",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500",
    readMoreUrl:
      "https://www.aicr.org/cancer-prevention/food-facts/learn-about-breast-cancer/",
  },
  {
    id: 4,
    title: "Genetic Testing",
    imageUrl: "images.jpeg",
    readMoreUrl:
      "https://www.cancer.org/cancer/types/breast-cancer/risk-and-prevention/genetic-testing-for-breast-cancer.html",
  },
  {
    id: 5,
    title: "Life After Treatment",
    imageUrl:
      "https://images.unsplash.com/photo-1578496479532-350b9184e1b8?w=500",
    readMoreUrl: "https://www.breastcancer.org/treatment/survivorship",
  },
];

function BreastCancerPage() {
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
            }
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
        {/* 1. Carousel at the top */}
        <div className="carousel-wrapper">
          <ImageCarousel />
        </div>

        {/* 2. Side-by-side info widgets */}
        <div className="info-widgets-container">
          <WellnessTip />
          <AwarenessStats />
          <Awards streakData={streakData} />
        </div>

        {/* 3. Self-assessment button */}
        <div className="assessment-cta-container">
          <Link to="/assessment" className="assessment-button">
            Take a Self Assessment Test
          </Link>
        </div>

        {/* 4. Blog section */}
        <h1 className="dashboard-title">Blog for breast cancer awareness</h1>
        <div className="blog-list">
          {blogData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <ChatWidget /> {/* 2. Add the component here */}
    </div>
  );
}

export default BreastCancerPage;
