import React, { useState, useEffect } from 'react';
import './MenstruationTips.css'; // We'll create this next

const menstruationTips = [
    "Track your cycle to understand your body's patterns.",
    "Stay hydrated, especially during your period.",
    "Gentle exercise like walking or yoga can help ease cramps.",
    "Iron-rich foods can help combat fatigue during menstruation.",
    "Prioritize sleep to help manage mood swings and energy levels.",
    "Listen to your body and rest when you need to."
];

function MenstruationTips() {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        // Set up an interval to change the tip index every 5 seconds
        const intervalId = setInterval(() => {
            setCurrentTipIndex(prevIndex => (prevIndex + 1) % menstruationTips.length);
        }, 5000); // 5000 milliseconds = 5 seconds

        // Cleanup function to stop the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <div className="tips-widget-container">
            <span className="tips-icon">💡</span>
            <div className="tips-text-content">
                <p className="tips-title">Daily Insight</p>
                {/* Add key prop to force re-render for animation */}
                <p key={currentTipIndex} className="tip-text fade-in-out">
                    {menstruationTips[currentTipIndex]}
                </p>
            </div>
        </div>
    );
}

export default MenstruationTips;