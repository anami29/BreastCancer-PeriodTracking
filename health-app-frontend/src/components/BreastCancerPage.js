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

import "./BreastCancerPage.css"; // Add CSS for modal styling

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
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    menarcheAge: "",
    maternalHistory: "no",
    paternalHistory: "no",
    parity: "",
    hrtUse: "no",
    brcaStatus: "unknown",
    biopsyHistory: "no",
  });
  const [riskResult, setRiskResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          // Fetch streak data for breast cancer section
          const streakResponse = await axios.get(
            `http://localhost:8081/api/streak/breastcancer`,
            {
              params: { email: userEmail },
            },
          );
          setStreakData(streakResponse.data);

          // Fetch profile data
          const profileResponse = await axios.get(
            `http://localhost:8081/api/profile`,
            {
              params: { email: userEmail },
            },
          );
          setProfileData(profileResponse.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.age ||
      !formData.height ||
      !formData.weight ||
      !formData.menarcheAge
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/risk-assessment/calculate",
        formData,
      );
      setRiskResult(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error calculating risk. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRiskResult(null);
    setFormData({
      age: "",
      height: "",
      weight: "",
      menarcheAge: "",
      maternalHistory: "no",
      paternalHistory: "no",
      parity: "",
      hrtUse: "no",
      brcaStatus: "unknown",
      biopsyHistory: "no",
    });
  };

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
          <Link to="/self-assessment" className="assessment-button">
            Self Assessment Options
          </Link>
          <button onClick={openModal} className="assessment-button">
            Start Risk Questionnaire
          </button>
        </div>

        {/* 5. Blog section */}
        <h1 className="dashboard-title">Blog for breast cancer awareness</h1>
        <div className="blog-list">
          {blogData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>

            {!riskResult ? (
              <>
                <h2>Breast Cancer Risk Assessment</h2>
                <form className="risk-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Age:</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="120"
                      />
                    </div>
                    <div className="form-group">
                      <label>Height (cm):</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="50"
                        max="250"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Weight (kg):</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                        step="0.1"
                        min="20"
                        max="300"
                      />
                    </div>
                    <div className="form-group">
                      <label>Age at First Menstruation:</label>
                      <input
                        type="number"
                        name="menarcheAge"
                        value={formData.menarcheAge}
                        onChange={handleInputChange}
                        required
                        min="8"
                        max="18"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Number of Children:</label>
                      <input
                        type="number"
                        name="parity"
                        value={formData.parity}
                        onChange={handleInputChange}
                        min="0"
                        max="10"
                      />
                    </div>
                    <div className="form-group">
                      <label>BRCA Status:</label>
                      <select
                        name="brcaStatus"
                        value={formData.brcaStatus}
                        onChange={handleInputChange}
                      >
                        <option value="unknown">Unknown</option>
                        <option value="negative">Negative</option>
                        <option value="positive">Positive</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Maternal Breast Cancer History:</label>
                      <select
                        name="maternalHistory"
                        value={formData.maternalHistory}
                        onChange={handleInputChange}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Paternal Breast Cancer History:</label>
                      <select
                        name="paternalHistory"
                        value={formData.paternalHistory}
                        onChange={handleInputChange}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>HRT Use:</label>
                      <select
                        name="hrtUse"
                        value={formData.hrtUse}
                        onChange={handleInputChange}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Previous Breast Biopsy:</label>
                      <select
                        name="biopsyHistory"
                        value={formData.biopsyHistory}
                        onChange={handleInputChange}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? "Calculating..." : "Calculate Risk"}
                  </button>
                </form>
              </>
            ) : (
              <div className="risk-result">
                <h2>Risk Assessment Results</h2>
                <div className="result-summary">
                  <h3>{riskResult.risk_level}</h3>
                  <p>
                    <strong>Lifetime Risk:</strong>{" "}
                    {riskResult.lifetime_risk_percentage}%
                  </p>
                  <p>
                    <strong>Risk Score:</strong> {riskResult.risk_score}
                  </p>
                  <p>
                    <strong>Model Used:</strong> {riskResult.model_used}
                  </p>
                </div>

                <div className="recommendations">
                  <h4>Personalized Recommendations:</h4>
                  <ul>
                    {riskResult.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <button className="close-result-button" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ChatWidget /> {/* 2. Add the component here */}
    </div>
  );
}

export default BreastCancerPage;
