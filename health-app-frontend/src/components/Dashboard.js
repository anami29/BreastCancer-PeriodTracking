import React from "react";
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import "./Dashboard.css";

// Mock data for the blog posts
// Replace your existing blogData array with this one
const blogData = [
  {
    id: 1,
    title: "Understanding Early Detection",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500",
    // Paste your first custom link here
    readMoreUrl:
      "https://www.nationalbreastcancer.org/early-detection-of-breast-cancer/",
  },
  {
    id: 2,
    title: "Myth vs. Fact",
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500",
    // Paste your second custom link here
    readMoreUrl: "https://www.breastcancer.org/facts-statistics/myths-vs-facts",
  },
  {
    id: 3,
    title: "Nutrition and Lifestyle",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500",
    // Paste your third custom link here
    readMoreUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5982158/",
  },
];

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dashboard-main-content">
        <h1 className="dashboard-title">Blog for breast cancer awareness</h1>
        <div className="blog-list">
          {blogData.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
