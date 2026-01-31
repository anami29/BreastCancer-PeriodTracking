import React from "react";
import "./NearbyHospitals.css";
import Navbar from "./Navbar";

const NearbyHospitals = () => {
  return (
    <>
      <Navbar />
      <div className="nearby-hospitals">
        <div className="container">
          <h1>🏥 Nearby Breast Care Hospitals</h1>
          <p>
            Find trusted hospitals for mammography, screening and breast health
            care.
          </p>

          {/* Map Section */}
          <div className="map-section">
            <iframe
              title="Tata Memorial Hospital Map"
              src="https://www.google.com/maps?q=Tata+Memorial+Hospital+Parel+Mumbai&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          {/* Hospital Card */}
          <div className="hospital-card featured">
            <h3>🏥 Tata Memorial Hospital</h3>
            <p className="address">Parel, Mumbai, Maharashtra</p>

            <div className="details">
              <p>🩻 Mammography: ₹1,500 – ₹2,500</p>
              <p>🔬 Ultrasound: ₹1,000 – ₹1,800</p>
              <p>🧫 Biopsy: ₹3,000 – ₹6,000</p>
              <p>⭐ Rating: 4.5</p>
            </div>

            <a
              href="https://maps.google.com/?q=Tata+Memorial+Hospital+Mumbai"
              target="_blank"
              rel="noreferrer"
              className="direction-btn"
            >
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NearbyHospitals;
