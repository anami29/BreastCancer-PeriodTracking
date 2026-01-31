import React from "react";
import "./SelfExamGuide.css";

// 1. Import your local images from the assets folder
import step1Image from "../assets/images/step-1.jpg";
import step2Image from "../assets/images/step-2.jpg";
import step4Image from "../assets/images/step-4.jpg";
import step5Image from "../assets/images/step-5.jpg";

// 2. Update the stepsData array to use the imported images
const stepsData = [
  {
    title: "Step 1: Begin in the Mirror, Arms at Sides",
    content:
      "Stand in front of a mirror with your shoulders straight and your arms on your hips. Look at your breasts.",
    img: step1Image, // Use the imported image variable
    lookFor: [
      "Usual size, shape, and color.",
      "Evenly shaped without visible distortion or swelling.",
      "Dimpling, puckering, or bulging of the skin.",
      "A nipple that has changed position or an inverted nipple.",
      "Redness, soreness, rash, or swelling.",
    ],
  },
  {
    title: "Step 2: Now, Raise Your Arms",
    content: "Raise your arms high overhead and look for the same changes.",
    img: step2Image, // You can reuse images if they apply to multiple steps
    lookFor: [
      "Dimpling, puckering, or bulging of the skin.",
      "A nipple that has changed position or an inverted nipple.",
      "Redness, soreness, rash, or swelling.",
    ],
  },
  {
    title: "Step 3: Look for Signs of Fluid",
    content:
      "While you're at the mirror, gently squeeze each nipple between your finger and thumb and check for any nipple discharge (this could be a watery, milky, or yellow fluid, or blood).",
    img: step2Image,
    lookFor: ["Any fluid coming out of one or both nipples."],
  },
  {
    title: "Step 4: Feel Your Breasts While Lying Down",
    content:
      "Lie down and place your right arm behind your head. Using your left hand, use a firm, smooth touch with the first few finger pads of your hand, keeping the fingers flat and together. Use a circular motion, about the size of a quarter.",
    img: step4Image,
    lookFor: [
      "Lumps, knots, or any changes that feel different from the rest of the breast tissue.",
    ],
  },
  {
    title: "Step 5: Feel Your Breasts in the Shower",
    content:
      "Many women find it easiest to feel their breasts when their skin is wet and slippery. Cover your entire breast, using the same hand movements described in Step 4.",
    img: step5Image,
    lookFor: ["Any new lumps or changes that you didn't notice before."],
  },
];

const doctorNote =
  "If you see or feel any of these changes, bring them to your doctor’s attention without delay.";
const videoId = "-ygucOBbKJA";

function SelfExamGuide() {
  return (
    <div className="guide-container">
      <h3>How to Perform a Self-Exam</h3>

      <div className="doctor-note-section">
        <span className="note-icon">⚠️</span>
        <p>{doctorNote}</p>
      </div>

      {stepsData.map((step, index) => (
        <div key={index} className="step-item">
          <div className="step-content">
            <h4>{step.title}</h4>
            <p>{step.content}</p>
            <div className="look-for-section">
              <h5>What should you look for?</h5>
              <ul>
                {step.lookFor.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <img src={step.img} alt={step.title} className="step-image" />
        </div>
      ))}

      {/* <div className="video-section">
        <h4>dddVideo Guide</h4>
        <div className="video-responsive">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div> */}
    </div>
  );
}

export default SelfExamGuide;
