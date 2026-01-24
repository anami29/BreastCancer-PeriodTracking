import React, { useState, useEffect } from "react";
import "./AwarenessStats.css";

// Expanded array with more awareness facts
const factsData = [
  "1 in 8 women will be diagnosed with breast cancer in her lifetime.",
  "When detected early in the localized stage, the 5-year survival rate is 99%.",
  "Over 85% of cases occur in women with no family history of breast cancer.",
  "Monthly self-exams and regular clinical exams are key to early detection.",
  "Breast cancer is the most common cancer among women worldwide.",
  "Regular mammograms can reduce breast cancer mortality by up to 30%.",
  "Early detection through screening saves lives and reduces treatment costs.",
  "Breast cancer can occur in men too, though it's rare (about 1% of cases).",
  "Maintaining a healthy weight and staying active can reduce breast cancer risk.",
  "Knowing your family history helps in assessing personal risk factors.",
  "Breast cancer survival rates have improved significantly over the past decades.",
  "Self-awareness and regular check-ups are crucial for prevention.",
  "Breast cancer research has led to better treatments and higher survival rates.",
  "Education and awareness campaigns play a vital role in early detection.",
  "Support groups and counseling help patients cope with diagnosis and treatment.",
];

function getThreeRandomFacts() {
  const shuffled = [...factsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function AwarenessStats() {
  const [displayedFacts, setDisplayedFacts] = useState([]);
  // --- NEW: State to control the animation ---
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setDisplayedFacts(getThreeRandomFacts());

    const intervalId = setInterval(() => {
      setIsAnimating(true); // 1. Start the 'out' animation

      // 2. Wait for the animation to finish before changing the facts
      setTimeout(() => {
        setDisplayedFacts(getThreeRandomFacts());
        setIsAnimating(false); // 3. Remove the class to allow the 'in' animation
      }, 500); // This duration must match your CSS animation time
    }, 6000); // Change facts every 6 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="stats-container">
      <h3>Here are your Awareness & Facts</h3>
      <p className="fact-intro">Stay informed about breast cancer:</p>

      {/* 4. Apply the animation class conditionally */}
      <div className={`fact-list ${isAnimating ? "slide-out" : "slide-in"}`}>
        {displayedFacts.map((fact, index) => (
          <div key={index} className="fact-list-item">
            <span className="fact-icon">🎗️</span>
            <p>{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AwarenessStats;
