import React, { useState, useEffect } from "react";
import "./WellnessTip.css";

const allTips = [
  "Stay hydrated! Drinking enough water is crucial for your overall health.",
  "Aim for 30 minutes of moderate activity most days of the week.",
  "Incorporate more leafy greens into your diet for essential nutrients.",
  "Practice mindfulness for 5-10 minutes to reduce stress.",
  "Ensure you get 7-9 hours of quality sleep each night.",
  "Don't forget to schedule your annual check-up with your doctor.",
  "Limit processed foods and added sugars for better health.",
  "Take short breaks to stretch if you sit for long periods.",
];

function getThreeRandomTips() {
  const shuffled = [...allTips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function WellnessTip() {
  const [displayedTips, setDisplayedTips] = useState([]);
  // --- NEW: State to control the animation ---
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setDisplayedTips(getThreeRandomTips());

    const intervalId = setInterval(() => {
      setIsAnimating(true); // 1. Start the 'out' animation

      // 2. Wait for the animation to finish before changing the tips
      setTimeout(() => {
        setDisplayedTips(getThreeRandomTips());
        setIsAnimating(false); // 3. Remove the class to allow the 'in' animation
      }, 500); // This duration must match your CSS animation time
    }, 6000); // Change tips every 4 seconds

    return () => clearInterval(intervalId);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="wellness-container">
      <h3>{getGreeting()}, Kavita!</h3>
      <p className="tip-intro">Here are your wellness tips for today:</p>

      {/* 4. Apply the animation class conditionally */}
      <div className={`tip-list ${isAnimating ? "slide-out" : "slide-in"}`}>
        {displayedTips.map((tip, index) => (
          <div key={index} className="tip-list-item">
            <span className="tip-icon">✨</span>
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WellnessTip;
