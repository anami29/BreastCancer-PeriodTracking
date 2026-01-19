import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import PeriodTracker from './PeriodTracker';
import CycleChart from './CycleChart';
import InfoCard from './InfoCard';
import ExpertInsights from './ExpertInsights';
import Awards from './Awards';
import MoodModal from './MoodModal'; // 1. Import the MoodModal
import Confetti from 'react-confetti'; // 1. Import Confetti
import useWindowSize from 'react-use/lib/useWindowSize'; // Helper to get window size
import MenstruationTips from './MenstruationTips'; // 1. Import the new component
import './MenstruationPage.css';

function MenstruationPage() {
    // --- RE-ADD STREAK STATE & FETCHING ---
    const [streakData, setStreakData] = useState(null);
    const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null); // To
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiProps, setConfettiProps] = useState({}); // To customize particles
    const { width, height } = useWindowSize();

    useEffect(() => {
        const fetchStreakData = async () => {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/auth/streak`, {
                        params: { email: userEmail }
                    });
                    setStreakData(response.data);
                } catch (error) {
                    console.error("Failed to fetch streak data:", error);
                }
            }
        };
        fetchStreakData();
    }, []);
    // --- END of re-added code ---

    const openMoodModal = () => setIsMoodModalOpen(true);
    // Function to handle closing the modal
    const closeMoodModal = () => setIsMoodModalOpen(false);
    // Function to update the selected mood
    const handleMoodSelection = (mood) => {
        setSelectedMood(mood); // Update the mood state
        
        // Customize confetti based on mood
        let particles = ['✨']; // Default sparkle
        if (mood.name === 'Happy' || mood.name === 'Funny') {
            particles = ['😊', '😂', '⭐', '💖'];
        } else if (mood.name === 'Sad' || mood.name === 'Stressed') {
            particles = ['😢', '😩', '💧'];
        } else if (mood.name === 'Boring') {
            particles = ['😑', '💤'];
        } else if (mood.name === 'Relaxed') {
             particles = ['😌', '🧘', '🍃'];
        }
        
        setConfettiProps({
            recycle: false,
            numberOfPieces: 400, // Increased number of pieces
            gravity: 0.15, // Slightly faster fall
            confettiSource: {
              x: 0, // Start from the full width
              y: 0,
              w: width, // Across the entire top
              h: 0
            },
            initialVelocityY: 10,
            initialVelocityX: 0, // No sideways initial push
            lateralVelocity: 0, // No sideways movement while falling
            drawShape: ctx => {
                ctx.font = '1.5em sans-serif';
                // Emojis don't need rotation, fillText handles color
                ctx.fillText(particles[Math.floor(Math.random() * particles.length)], 0, 0);
            }
        });
        setShowConfetti(true); // Trigger the animation

        // Hide confetti after a few seconds
        setTimeout(() => setShowConfetti(false), 6000); // 4 seconds duration
    };
    return (
        <div className="menstruation-container">
            {/* Pass streak to Navbar */}
                        {showConfetti && <Confetti width={width} height={height} {...confettiProps} />}

            <Navbar currentStreak={streakData?.currentStreak} />
            <main className="menstruation-grid">
                <div className="grid-item greeting">
                    <h2>Good Morning, Kavita!</h2>
                </div>
                <div className="grid-item search-bar">
                    <input type="text" placeholder="🔍 Search" />
                </div>

                <div className="grid-item period-tracker"><PeriodTracker /></div>

                <div className="grid-item sidebar-widgets">
                    <CycleChart />
                    {/* Pass streak data to Awards */}
                    <Awards streakData={streakData} />
                </div>

                <div className="grid-item feeling-group">
                    <h3 className="section-title">How are you feeling today</h3>
                    <div className="card-pair">
                        <InfoCard 
                            title="Share With Us Your Day" 
                            icon="😊" 
                            onClick={openMoodModal} 
                            currentMood={selectedMood} 
                        />
<MenstruationTips />                    </div>
                </div>

                <div className="grid-item other-info-group">
                    <h3 className="section-title">Other Information</h3>
                    <div className="card-pair">
                        <InfoCard title="Weight" value="00Kg" icon="⚖️" />
                        <InfoCard title="Water" value="00ml" icon="💧" />
                    </div>
                </div>

<div className="grid-item expert-insights"><ExpertInsights /></div>            </main>
{/* Conditionally render the mood modal */}
{isMoodModalOpen && <MoodModal onClose={closeMoodModal} onMoodSelect={handleMoodSelection} />}        </div>
    );
}

export default MenstruationPage;