import React, { useState } from 'react';
import './ExpertInsights.css';
import CategoryModal from './CategoryModal';

// --- Updated allInsights array with paths matching your images ---
const allInsights = [
    // --- YOGA ---
    // 10-14 Age Group
    { id: 101, title: "Yoga Pose 1 (10-14)", category: "Yoga", ageGroup: "10-14", imgUrl: "/images/10-14-1.webp", description: "Description for Yoga Pose 1 (10-14)..." },
    { id: 102, title: "Yoga Pose 2 (10-14)", category: "Yoga", ageGroup: "10-14", imgUrl: "/images/10-14-2.jpg", description: "Description for Yoga Pose 2 (10-14)..." },
    { id: 103, title: "Yoga Pose 3 (10-14)", category: "Yoga", ageGroup: "10-14", imgUrl: "/images/10-14-3.png", description: "Description for Yoga Pose 3 (10-14)..." },
    { id: 104, title: "Yoga Pose 4 (10-14)", category: "Yoga", ageGroup: "10-14", imgUrl: "/images/10-14-4.jpg", description: "Description for Yoga Pose 4 (10-14)..." },
    
    // 15-24 Age Group
    { id: 151, title: "Yoga Pose 1 (15-24)", category: "Yoga", ageGroup: "15-24", imgUrl: "/images/15-24-1.jpg", description: "Description for Yoga Pose 1 (15-24)..." },
    { id: 152, title: "Yoga Pose 2 (15-24)", category: "Yoga", ageGroup: "15-24", imgUrl: "/images/15-24-2.jpg", description: "Description for Yoga Pose 2 (15-24)..." },
    { id: 153, title: "Yoga Pose 3 (15-24)", category: "Yoga", ageGroup: "15-24", imgUrl: "/images/15-24-3.jpg", description: "Description for Yoga Pose 3 (15-24)..." },
    { id: 154, title: "Yoga Pose 4 (15-24)", category: "Yoga", ageGroup: "15-24", imgUrl: "/images/15-24-4.gif", description: "Description for Yoga Pose 4 (15-24)..." },

    // 25-35 Age Group
    { id: 251, title: "Yoga Pose 1 (25-35)", category: "Yoga", ageGroup: "25-35", imgUrl: "/images/25-35-1.jpg", description: "Description for Yoga Pose 1 (25-35)..." },
    { id: 252, title: "Yoga Pose 2 (25-35)", category: "Yoga", ageGroup: "25-35", imgUrl: "/images/25-35-2.jpg", description: "Description for Yoga Pose 2 (25-35)..." },
    { id: 253, title: "Yoga Pose 3 (25-35)", category: "Yoga", ageGroup: "25-35", imgUrl: "/images/25-35-3.jpg", description: "Description for Yoga Pose 3 (25-35)..." },
    { id: 254, title: "Yoga Pose 4 (25-35)", category: "Yoga", ageGroup: "25-35", imgUrl: "/images/25-35-4.jpg", description: "Description for Yoga Pose 4 (25-35)..." },
    { id: 255, title: "Yoga Pose 5 (25-35)", category: "Yoga", ageGroup: "25-35", imgUrl: "/images/25-35-5.png", description: "Description for Yoga Pose 5 (25-35)..." },

    // 36-45 Age Group
    { id: 361, title: "Yoga Pose 1 (36-45)", category: "Yoga", ageGroup: "36-45", imgUrl: "/images/36-45-1.jpg", description: "Description for Yoga Pose 1 (36-45)..." },
    { id: 362, title: "Yoga Pose 2 (36-45)", category: "Yoga", ageGroup: "36-45", imgUrl: "/images/36-45-2.webp", description: "Description for Yoga Pose 2 (36-45)..." },
    { id: 363, title: "Yoga Pose 3 (36-45)", category: "Yoga", ageGroup: "36-45", imgUrl: "/images/36-45-3.jpg", description: "Description for Yoga Pose 3 (36-45)..." },

    // 46-55 Age Group
    { id: 461, title: "Yoga Pose 1 (46-55)", category: "Yoga", ageGroup: "46-55", imgUrl: "/images/46-55-1.jpeg", description: "Description for Yoga Pose 1 (46-55)..." },
    { id: 462, title: "Yoga Pose 2 (46-55)", category: "Yoga", ageGroup: "46-55", imgUrl: "/images/46-55-2.jpg", description: "Description for Yoga Pose 2 (46-55)..." },
    { id: 463, title: "Yoga Pose 3 (46-55)", category: "Yoga", ageGroup: "46-55", imgUrl: "/images/46-55-3.jpg", description: "Description for Yoga Pose 3 (46-55)..." },

    // 55+ Age Group
    { id: 551, title: "Yoga Pose 1 (55+)", category: "Yoga", ageGroup: "55+", imgUrl: "/images/55-1.jpg", description: "Description for Yoga Pose 1 (55+)..." },
    { id: 552, title: "Yoga Pose 2 (55+)", category: "Yoga", ageGroup: "55+", imgUrl: "/images/55-2.jpg", description: "Description for Yoga Pose 2 (55+)..." },
    { id: 553, title: "Yoga Pose 3 (55+)", category: "Yoga", ageGroup: "55+", imgUrl: "/images/55-3.jpg", description: "Description for Yoga Pose 3 (55+)..." },

    // --- OTHER CATEGORIES (Add imgUrl and description if you have images for them) ---
    { id: 2, title: "Breaking Taboos", category: "Article", imgUrl: "/images/article-convo.jpg", description: "Learn how to start open and honest conversations..." }, // Example
    { id: 11, title: "Understanding PMS", category: "Article", imgUrl: "/images/article-pms.jpg", description: "An in-depth look at PMS..." }, // Example
    { id: 3, title: "Menstrual Health Basics", category: "Health", imgUrl: "/images/health-basics.jpg", description: "Key factors for good health..." }, // Example
    { id: 4, title: "Foods for a Healthy Period", category: "Food & Drink", imgUrl: "/images/food-healthy.jpg", description: "Discover the best foods..." }, // Example
    { id: 6, title: "Managing Menstruation", category: "Tips & Tricks", imgUrl: "/images/tips-manage.jpg", description: "Practical tips and tricks..." }, // Example
];

const categories = ["Discover", "Tips & Tricks", "Video", "Article", "Health", "Yoga", "Exercise", "Medicine", "Mood", "Food & Drink", "Activity"];
const ageGroups = ["All", "10-14", "15-24", "25-35", "36-45", "46-55", "55+"];

function ExpertInsights() {
    const [activeFilter, setActiveFilter] = useState('Discover');
    const [activeAgeFilter, setActiveAgeFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAgeGroup, setModalAgeGroup] = useState('');

    const filteredInsightsForDisplay = allInsights.filter(insight => {
        if (activeFilter === 'Yoga') return false;
        return activeFilter === 'Discover' || insight.category === activeFilter;
    });

    const handleCategoryClick = (category) => {
        setActiveFilter(category);
        setActiveAgeFilter('All');
        setIsModalOpen(false);
    };

    const handleAgeGroupClick = (ageGroup) => {
        setActiveAgeFilter(ageGroup);
        setModalAgeGroup(ageGroup);
        setIsModalOpen(true);
    };

    return (
        <div className="insights-container">
            <h3>Expert Insights</h3>
            {/* Main Category Filters */}
            <div className="filter-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Conditionally render Age Group Filters */}
            {activeFilter === 'Yoga' && (
                <div className="filter-tabs age-group-filters">
                    {ageGroups.map(ageGroup => (
                        <button
                            key={ageGroup}
                            className={`filter-tab age-tab ${activeAgeFilter === ageGroup ? 'active' : ''}`}
                            onClick={() => handleAgeGroupClick(ageGroup)}
                        >
                            {ageGroup}
                        </button>
                    ))}
                </div>
            )}

            {/* Grid to display insights directly (non-Yoga) */}
            {activeFilter !== 'Yoga' && (
                <div className="insights-grid">
                    {filteredInsightsForDisplay.length > 0 ? (
                        filteredInsightsForDisplay.map(insight => (
                            <div key={insight.id} className="insight-card">
                                {insight.imgUrl && (
                                    <img
                                        src={insight.imgUrl}
                                        alt={insight.title}
                                        className="insight-card-image"
                                    />
                                )}
                                <div className="insight-card-content">
                                    <p>{insight.title}</p>
                                    <span>{insight.category}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results-message">
                            {activeFilter === 'Discover' ? 'Loading insights...' : `No insights found for ${activeFilter}.`}
                        </p>
                    )}
                </div>
            )}
             {/* Prompt specifically for Yoga */}
             {activeFilter === 'Yoga' && !isModalOpen && (
                 <p className="modal-prompt">Select an age group to view Yoga insights.</p>
            )}

            {/* Render the Modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category="Yoga"
                ageGroup={modalAgeGroup}
                insights={allInsights}
            />
        </div>
    );
}

export default ExpertInsights;