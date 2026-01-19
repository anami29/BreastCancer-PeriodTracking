import React, { useState, useEffect } from 'react'; // <-- Move useEffect import here
import './CategoryModal.css';

// Component now accepts ageGroup prop
function CategoryModal({ isOpen, onClose, category, ageGroup, insights }) {
    const [selectedInsight, setSelectedInsight] = useState(null);

    // Filter insights based on category and ageGroup
    const categoryInsights = insights.filter(item => {
        if (item.category !== category) return false;
        if (category === 'Yoga' && ageGroup !== 'All') {
            return item.ageGroup === ageGroup;
        }
        return true;
    });

    const handleImageClick = (insight) => {
        setSelectedInsight(insight);
    };

    const handleBackClick = () => {
        setSelectedInsight(null);
    };

     // Reset detail view when modal closes or category/age changes
     useEffect(() => {
        if (!isOpen) {
            setSelectedInsight(null);
        }
     }, [isOpen, category, ageGroup]); // Add category and ageGroup dependencies

    if (!isOpen) return null;

    // Determine the title for the modal
    const modalTitle = category === 'Yoga' && ageGroup !== 'All' 
        ? `${category} Insights (${ageGroup})` 
        : `${category} Insights`;

    return (
        <div className="category-modal-overlay" onClick={onClose}>
            <div className="category-modal-content" onClick={e => e.stopPropagation()}>
                <button className="category-modal-close-button" onClick={onClose}>&times;</button>

                {!selectedInsight ? (
                    <>
                        <h3>{modalTitle}</h3>
                        <div className="modal-image-grid">
                            {categoryInsights.length > 0 ? (
                                categoryInsights.map(insight => (
                                    <div key={insight.id} className="modal-grid-item" onClick={() => handleImageClick(insight)}>
                                        <img src={insight.imgUrl} alt={insight.title} />
                                        <span>{insight.title}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No insights available for this selection.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="modal-detail-view">
                        <button className="modal-back-button" onClick={handleBackClick}>&lt; Back</button>
                        <h3>{selectedInsight.title}</h3>
                        <img src={selectedInsight.imgUrl} alt={selectedInsight.title} className="detail-image" />
                        <p className="detail-description">{selectedInsight.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Remove the import from the bottom
// import { useEffect } from 'react'; 

export default CategoryModal;