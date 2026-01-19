import React from 'react';
import axios from 'axios'; // Import axios
import './Awards.css';


const Checkmark = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Component now accepts 'streakData' as a prop
function Awards({ streakData, section }) {
    // Show loading state if data hasn't arrived
    const handleCheckIn = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail || !section) {
            console.error("Missing email or section for check-in");
            return; // Don't proceed if email or section is missing
        }
        try {
            await axios.post(`http://localhost:8081/api/streak/checkin/${section}`, { email: userEmail });
            alert('Streak updated!'); // Simple feedback
            // TODO: Ideally, re-fetch the streak data here to update the UI instantly
        } catch (error) {
            console.error("Failed to check in:", error);
            alert('Failed to update streak.');
        }
    };
    if (!streakData) {
        return (
            <div className="awards-container loading-state">
                <div className="spinner"></div>
                <p>Loading Streak...</p>
            </div>
        );
    }

    // Determine week completion based on current streak
    const weekData = [
        { day: 'M', completed: streakData.currentStreak >= 1 },
        { day: 'T', completed: streakData.currentStreak >= 2 },
        { day: 'W', completed: streakData.currentStreak >= 3 },
        { day: 'T', completed: streakData.currentStreak >= 4 },
        { day: 'F', completed: streakData.currentStreak >= 5 },
        { day: 'S', completed: streakData.currentStreak >= 6 },
        { day: 'S', completed: streakData.currentStreak >= 7 },
    ];

    return (
        <div className="awards-container">
            <header className="awards-header">
                <h3>⚡️ Streak</h3>
                {/* Updated Button */}
                <button onClick={handleCheckIn} className="view-details-button">
                    Complete Today's Streak
                </button>
            </header>

            <section className="current-streak">
                <span className="streak-days">{streakData.currentStreak}</span>
                <span className="streak-unit">days</span>
            </section>

            <section className="weekly-view">
                {weekData.map((item, index) => (
                    <div key={index} className="day-circle-wrapper">
                        <div className={`day-circle ${item.completed ? 'completed' : ''}`}>
                            {item.completed && <Checkmark />}
                        </div>
                        <span className="day-label">{item.day}</span>
                    </div>
                ))}
            </section>

            <footer className="awards-footer">
                <div className="footer-stat">
                    <span className="stat-label">Longest Streak</span>
                    <div>
                        <span className="stat-value">{streakData.longestStreak}</span>
                        <span className="stat-unit">days</span>
                    </div>
                </div>
                <div className="footer-stat">
                    <span className="stat-label">Total Posts</span>
                    <span className="stat-value">{streakData.totalPosts}</span>
                </div>
            </footer>
        </div>
    );
}

export default Awards;