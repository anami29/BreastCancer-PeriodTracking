import React from "react";
import Navbar from "./Navbar";
import ChatWidget from "./ChatWidget";
import "./AssessmentPage.css";
import "./VideoAssessmentPage.css";

const videoData = [
  {
    id: 1,
    title: "Step 1: Begin in the Mirror, Arms at Sides",
    videoId: "-ygucOBbKJA", // Replace with actual step 1 video ID
    description:
      "Stand in front of a mirror with your shoulders straight and your arms on your hips. Look at your breasts.",
  },
  {
    id: 2,
    title: "Step 2: Now, Raise Your Arms",
    videoId: "exampleVideoId2", // Replace with actual YouTube video ID for step 2
    description: "Raise your arms high overhead and look for the same changes.",
  },
  {
    id: 3,
    title: "Step 3: Look for Signs of Fluid",
    videoId: "exampleVideoId3", // Replace with actual YouTube video ID for step 3
    description:
      "Gently squeeze each nipple between your finger and thumb and check for any nipple discharge.",
  },
  {
    id: 4,
    title: "Step 4: Feel Your Breasts While Lying Down",
    videoId: "exampleVideoId4", // Replace with actual YouTube video ID for step 4
    description:
      "Lie down and use a firm, smooth touch with the first few finger pads of your hand, keeping the fingers flat and together.",
  },
  {
    id: 5,
    title: "Step 5: Feel Your Breasts in the Shower",
    videoId: "exampleVideoId5", // Replace with actual YouTube video ID for step 5
    description:
      "Many women find it easiest to feel their breasts when their skin is wet and slippery. Cover your entire breast.",
  },
  {
    id: 6,
    title: "Understanding Breast Cancer Symptoms",
    videoId: "exampleVideoId6", // Replace with actual YouTube video ID
    description: "Learn about common signs and when to see a doctor.",
  },
];

function VideoAssessmentPage() {
  return (
    <div className="assessment-container">
      <Navbar />
      <main className="assessment-content">
        <h1>Guided Video Assessments</h1>
        <p>
          Watch these videos to learn how to perform self-assessments
          effectively.
        </p>
        <div className="video-list">
          {videoData.map((video) => (
            <div key={video.id} className="video-item">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <div className="video-responsive">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}

export default VideoAssessmentPage;
