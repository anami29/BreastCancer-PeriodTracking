import React from 'react';
import './InfoCard.css';

// Component now accepts an optional 'onClick' handler and 'currentMood'
function InfoCard({ title, value, icon, onClick, currentMood }) {
    
    // Determine the content based on whether a mood is selected
    const displayTitle = currentMood ? `Today's Mood: ${currentMood.name}` : title;
    const displayIcon = currentMood ? currentMood.icon : icon;

    // Make the card clickable only if an onClick handler is provided
    const cardClass = onClick ? "info-card-widget clickable" : "info-card-widget";
    const clickHandler = onClick ? onClick : undefined;

    return (
        <div className={cardClass} onClick={clickHandler}>
            <span className="info-icon">{displayIcon}</span>
            <div className="info-text">
                {/* Don't display the original title if a mood is set */}
                <p>{displayTitle}</p> 
                {/* Only display value if it exists AND no mood is set */}
                {value && !currentMood && <h4>{value}</h4>}
            </div>
        </div>
    );
}
export default InfoCard;