import React from "react";
import Navbar from "./Navbar";
import SelfExamGuide from "./SelfExamGuide";
import ChatWidget from "./ChatWidget"; // 1. Import the new component
import "./AssessmentPage.css";

function AssessmentPage() {
  return (
    <div className="assessment-container">
      <Navbar />
      <main className="assessment-content">
        <SelfExamGuide />
      </main>
      <ChatWidget /> {/* 2. Add the component here */}
    </div>
  );
}

export default AssessmentPage;
