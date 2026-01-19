import React from "react";
import "./BlogCard.css";

function BlogCard({ post }) {
  // We no longer need to calculate a Google search URL here.

  return (
    <div className="blog-card">
      <img src={post.imageUrl} alt={post.title} className="blog-card-image" />
      <div className="blog-card-content">
        <h3 className="blog-card-title">{post.title}</h3>

        {/* This link now uses the custom URL from your data */}
        <a
          href={post.readMoreUrl}
          className="read-more-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default BlogCard;
