import React, { useState } from 'react';
import './PeriodTracker.v2.css'; // Make sure this matches your CSS file name
import PeriodLogModal from './PeriodLogModal';

function PeriodTracker() {
    const days = [1, 2, 3, 4, 5, 6, 7];
    const activeDay = 4; // Example active day

    const getCurrentDateFormatted = () => {
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'long' };
        return today.toLocaleDateString('en-US', options); // e.g., "Sun, 26 October"
    };
    //
    const [isModalOpen, setIsModalOpen] = useState(false);
    // --- THIS IS THE CORRECTED LINE ---
    // We need both the variable and the function to set it (even if not used yet)
    const [hasPeriodData, setHasPeriodData] = useState(false); 

    return (
        <div className="period-tracker-widget">
            <div className="widget-header">
                <span>🗓️</span>
<span>{getCurrentDateFormatted()}</span>            </div>
            
            {/* Conditional rendering based on hasPeriodData */}
            {hasPeriodData ? (
                <> {/* Show this if there IS period data */}
                    <div className="cycle-arc-container">
                        {days.map(day => (
                            <div key={day} className={`day-number ${day === activeDay ? 'active' : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="widget-body">
                        <p>Period in,</p>
                        <h1>4 Day</h1> {/* Make this dynamic later */}
                        <span>Lower chance to get pregnant</span>
                    </div>
                </>
            ) : (
                <> {/* Show this placeholder if there is NO period data */}
                 <div className="cycle-arc-container" style={{ visibility: 'hidden' }}> {/* Keep space but hide */}
                     {days.map(day => <div key={day} className="day-number">{day}</div>)}
                 </div>
                 <div className="widget-body no-data-placeholder">
                     <h4>No period data available yet</h4>
                     <button className="enter-data-link" onClick={() => setIsModalOpen(true)}>
                         Please enter your last cycle info.
                     </button>
                 </div>
                </>
            )}

            <div className="bottom-arc-shape"></div>

            {/* Conditionally render the modal */}
            {isModalOpen && <PeriodLogModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
export default PeriodTracker;