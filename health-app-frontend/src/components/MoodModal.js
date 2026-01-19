import React from 'react';
import './MoodModal.css'; // We'll create this next

const moods = [
    { name: 'Happy', icon: '😊' },
    { name: 'Sad', icon: '😢' },
    { name: 'Boring', icon: '😑' },
    { name: 'Funny', icon: '😂' },
    { name: 'Stressed', icon: '😩' },
    { name: 'Relaxed', icon: '😌' },
];

// This component receives functions to close itself and set the mood
function MoodModal({ onClose, onMoodSelect }) {
    
    const handleMoodClick = (mood) => {
        onMoodSelect(mood); // Update the mood in the parent component
        onClose(); // Close the modal
    };

    return (
        <div className="mood-modal-overlay" onClick={onClose}>
            <div className="mood-modal-content" onClick={e => e.stopPropagation()}>
                <button className="mood-modal-close-button" onClick={onClose}>&times;</button>
                <h3>How are you feeling today?</h3>
                <div className="mood-options">
                    {moods.map(mood => (
                        <button 
                            key={mood.name} 
                            className="mood-option"
                            onClick={() => handleMoodClick(mood)}
                        >
                            <span className="mood-icon">{mood.icon}</span>
                            <span>{mood.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MoodModal;