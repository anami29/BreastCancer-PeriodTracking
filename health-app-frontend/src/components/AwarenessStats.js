import React from "react";
import "./AwarenessStats.css"; // We'll create this file next

// A simple array to hold our facts
const factsData = [
  "1 in 8 women will be diagnosed with breast cancer in her lifetime.",
  "When detected early in the localized stage, the 5-year survival rate is 99%.",
  "Over 85% of cases occur in women with no family history of breast cancer.",
  "Monthly self-exams and regular clinical exams are key to early detection.",
];

function AwarenessStats() {
  return (
    <div className="stats-container">
      <h3>Awareness & Facts</h3>
      <ul className="facts-list">
        {factsData.map((fact, index) => (
          <li key={index}>
            <span className="fact-icon">🎗️</span>
            <p>{fact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AwarenessStats;
