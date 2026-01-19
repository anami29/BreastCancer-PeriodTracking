import React, { useState } from 'react';
import axios from 'axios';
import './PeriodLogModal.css';

function PeriodLogModal({ onClose }) {
    const [periodStartDate, setPeriodStartDate] = useState('');
    // --- NEW: State for duration ---
    const [periodDuration, setPeriodDuration] = useState('');
    const [message, setMessage] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem('userEmail');

        // --- UPDATED: Check both fields ---
        if (!userEmail || !periodStartDate || !periodDuration) {
            setMessage('Please fill in all fields.');
            return;
        }

        // --- UPDATED: Prepare data to send ---
        // Convert duration to a number
        const duration = parseInt(periodDuration, 10);
        if (isNaN(duration) || duration <= 0) {
            setMessage('Please enter a valid number of days.');
            return;
        }

        try {
            // --- UPDATED: Send start date and duration ---
            // NOTE: We need to update the backend API endpoint to accept 'duration'
            await axios.post('http://localhost:8081/api/cycle/log', {
                email: userEmail,
                date: periodStartDate,
                duration: duration // Sending duration
            });
            setMessage('Data saved successfully!');
            setTimeout(() => {
                onClose();
                window.location.reload(); 
            }, 1500);
        } catch (error) {
            console.error("Failed to log period data:", error);
            setMessage(error.response?.data || 'Failed to save data. Please try again.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                <h3>Enter Your Last Period Info</h3>
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="periodStartDate">Start Date:</label>
                        <input
                            type="date"
                            id="periodStartDate"
                            value={periodStartDate}
                            onChange={(e) => setPeriodStartDate(e.target.value)}
                            required
                        />
                    </div>
                    {/* --- NEW: Duration Input Field --- */}
                    <div className="form-group">
                        <label htmlFor="periodDuration">Number of Days:</label>
                        <input
                            type="number"
                            id="periodDuration"
                            value={periodDuration}
                            onChange={(e) => setPeriodDuration(e.target.value)}
                            min="1"
                            placeholder="e.g., 5"
                            required
                        />
                    </div>
                    <button type="submit" className="save-button">Save Data</button>
                    {message && <p className="modal-message">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default PeriodLogModal;