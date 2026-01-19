import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CycleChart.css';

function CycleChart() {
    // State to hold the cycle lengths fetched from the API
    const [cycleLengths, setCycleLengths] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCycleHistory = async () => {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                try {
                    const response = await axios.get(`http://localhost:8081/api/cycle/history`, {
                        params: { email: userEmail }
                    });
                    // Store the fetched cycle lengths (we'll take the last 11 for the chart)
                    setCycleLengths(response.data.slice(-11));
                } catch (error) {
                    console.error("Failed to fetch cycle history:", error);
                    // Set empty array on error so it doesn't crash
                    setCycleLengths([]);
                }
            } else {
                 setCycleLengths([]); // Set empty if no user email
            }
            setLoading(false);
        };

        fetchCycleHistory();
    }, []); // Run once on component load

    // Find the min/max length for scaling the bars (optional but looks better)
    const minLength = cycleLengths.length > 0 ? Math.min(...cycleLengths) : 20;
    const maxLength = cycleLengths.length > 0 ? Math.max(...cycleLengths) : 40;
    const range = maxLength - minLength || 1; // Avoid division by zero

    if (loading) {
        return <div className="cycle-chart-widget">Loading Chart...</div>;
    }

    return (
        <div className="cycle-chart-widget">
            <header>
                <h4>Cycle Length</h4>
                {/* We can make this dynamic later */}
                <span>Recent Cycles</span>
            </header>
            <div className="chart-body">
                {/* If no data, show placeholder */}
                {cycleLengths.length === 0 ? (
                    <p className="no-data-message">Log your period dates to see your cycle history.</p>
                ) : (
                    // Map over the fetched data to create bars
                    cycleLengths.map((length, index) => {
                        // Calculate bar height relative to min/max
                        const barHeightPercent = ((length - minLength) / range) * 50 + 30; // Scale height (30% to 80%)
                        return (
                            <div key={index} className="bar-wrapper">
                                <div className="bar" style={{ height: `${barHeightPercent}%` }}></div>
                                <span className="bar-label">{length}</span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
export default CycleChart;