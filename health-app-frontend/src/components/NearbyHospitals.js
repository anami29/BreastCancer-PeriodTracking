import React, { useState, useEffect } from "react";
import "./NearbyHospitals.css";

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a location to search");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5001/find-hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: searchQuery }),
      });

      const data = await response.json();

      if (response.ok) {
        setHospitals(data);
      } else {
        setError(data.error || "Failed to find hospitals");
      }
    } catch (err) {
      setError("Failed to connect to the hospital finder service");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch("http://localhost:5001/find-hospitals", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat: latitude, lon: longitude }),
          });

          const data = await response.json();

          if (response.ok) {
            setHospitals(data);
          } else {
            setError(data.error || "Failed to find hospitals");
          }
        } catch (err) {
          setError("Failed to connect to the hospital finder service");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(
          "Failed to get your location. Please check your location permissions.",
        );
        setLoading(false);
      },
    );
  };

  return (
    <div className="nearby-hospitals">
      <div className="container">
        <h1>Find Nearby Hospitals</h1>
        <p>Get help quickly by finding hospitals near you or any location</p>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter city, state, or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="location-section">
            <button
              onClick={handleCurrentLocation}
              className="location-btn"
              disabled={loading}
            >
              {loading ? "Getting Location..." : "Use My Current Location"}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {hospitals.length > 0 && (
          <div className="hospitals-grid">
            {hospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h3>{hospital.name}</h3>
                <p className="address">{hospital.address}</p>
                <div className="coordinates">
                  <small>
                    Lat: {hospital.latitude.toFixed(4)}, Lon:{" "}
                    {hospital.longitude.toFixed(4)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}

        {hospitals.length === 0 && !loading && !error && (
          <div className="no-results">
            <p>
              Enter a location or use your current location to find nearby
              hospitals
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitals;
