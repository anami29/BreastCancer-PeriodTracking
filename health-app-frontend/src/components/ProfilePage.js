import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./ProfilePage.css";

// We'll change the fallback text from 'N/A' to '--|--'
const InfoField = ({ label, value }) => (
  <div className="info-field">
    <span className="info-label">{label}</span>
    <span className="info-value">{value || "--|--"}</span>
  </div>
);

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/profile`,
            {
              params: { email: userEmail },
            }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      }
    };
    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page-container">
      <Navbar />
      <main className="profile-content">
        <header className="profile-header">
          <img
            src="https://"
            alt={profileData.name}
            className="profile-avatar"
          />
          <div className="profile-header-info">
            <h2>
              {profileData.name} <span className="status-active">Active</span>
            </h2>
            {/* Also change the fallback here */}
            <p>
              ID: {profileData.id.substring(0, 6)} •{" "}
              {profileData.phone || "--|--"}
            </p>
          </div>
        </header>

        <div className="profile-details">
          <section className="info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <InfoField label="First Name" value={profileData.name} />
              <InfoField label="Last Name" value={profileData.lastName} />
              <InfoField label="Father Name" value={profileData.fatherName} />
              <InfoField label="Age" value={profileData.age} />
              <InfoField label="Gender" value={profileData.gender} />
              <InfoField label="Phone Number" value={profileData.phone} />
              <InfoField label="Email Id" value={profileData.email} />
              <InfoField label="Address" value={profileData.address} />
              <InfoField
                label="Date of Birth"
                value={profileData.dateOfBirth}
              />
              <InfoField label="Blood Group" value={profileData.bloodGroup} />
              <InfoField
                label="Marital Status"
                value={profileData.maritalStatus}
              />
            </div>
          </section>

          <section className="info-section">
            <h3>Medical Information</h3>
            <div className="info-grid">
              <InfoField
                label="Primary Physician"
                value={profileData.primaryPhysician}
              />
              <InfoField
                label="Known Allergies"
                value={profileData.knownAllergies}
              />
              <InfoField
                label="Chronic Conditions"
                value={profileData.chronicConditions}
              />
              <InfoField
                label="Current Medication"
                value={profileData.currentMedication}
              />
              <InfoField
                label="Previous Surgeries"
                value={profileData.previousSurgeries}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
