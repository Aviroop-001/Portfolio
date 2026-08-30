import React, { useState, useEffect } from 'react';
import "../styling_files/blogs.scss";
import { Box } from "@chakra-ui/react";
import { FiExternalLink, FiClock } from "react-icons/fi";

export default function Blogs() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const rssUrl = "https://medium.com/feed/@banerjeeaviroop01";
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        if (data && data.items) {
          // Keep only the 3 most recent articles
          setArticles(data.items.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching Medium blogs:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper to extract a clean text snippet if needed, though Medium's description contains HTML
  const extractSnippet = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    const text = doc.body.textContent || "";
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Box className="blogs-modern-container">
      <div className="blogs-header">
        <h2 className="section-title">Technical Writing</h2>
        <p className="section-subtitle">
          I occasionally write about software engineering, system design, and building AI agents.
        </p>
      </div>

      <div className="blogs-grid">
        {loading ? (
          // Skeleton loaders
          [1, 2, 3].map(n => (
            <div key={n} className="blog-card skeleton">
              <div className="skeleton-img"></div>
              <div className="skeleton-text title"></div>
              <div className="skeleton-text desc"></div>
            </div>
          ))
        ) : error ? (
          <div className="error-state">
            <p>Could not load articles. Check out my Medium profile directly!</p>
            <a href="https://medium.com/@banerjeeaviroop01" target="_blank" rel="noopener noreferrer" className="medium-link">
              Read on Medium <FiExternalLink />
            </a>
          </div>
        ) : (
          articles.map((article) => {
            // Some Medium RSS images are hidden in description or thumbnail
            const imageUrl = article.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
            
            return (
              <a 
                key={article.guid} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="blog-card"
              >
                <div className="blog-image-wrapper">
                  <img src={imageUrl} alt={article.title} loading="lazy" />
                  <div className="read-overlay">
                    <span>Read Article</span>
                    <FiExternalLink />
                  </div>
                </div>
                
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <FiClock /> {formatDate(article.pubDate)}
                    </span>
                    {article.categories && article.categories.length > 0 && (
                      <span className="blog-tag">{article.categories[0]}</span>
                    )}
                  </div>
                  
                  <h3 className="blog-title">{article.title}</h3>
                  <p className="blog-snippet">{extractSnippet(article.description)}</p>
                </div>
              </a>
            );
          })
        )}
      </div>
      
      {!loading && !error && (
        <div className="blogs-footer">
          <a 
            href="https://medium.com/@banerjeeaviroop01" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="view-all-btn"
          >
            View all on Medium ↗
          </a>
        </div>
      )}
    </Box>
  );
}
