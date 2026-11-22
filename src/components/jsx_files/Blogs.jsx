import React, { useState, useEffect } from 'react';
import "../styling_files/blogs.scss";
import { Box } from "@chakra-ui/react";
import { FiExternalLink, FiClock } from "react-icons/fi";

// Pre-seeded articles ensure zero-latency initial render and immunity to third-party RSS caching delays
const defaultArticles = [
  {
    title: "How We Slashed Auth Latency by 99% (224ms → 2.4ms) and Saved 1M+ API Calls a Day",
    pubDate: "2026-11-22 10:25:23",
    link: "https://medium.com/@banerjeeaviroop01/how-we-slashed-auth-latency-by-99-224ms-2-4ms-and-saved-1m-api-calls-a-day-186e93d1e84f",
    guid: "https://medium.com/p/186e93d1e84f",
    author: "Aviroop Banerjee",
    thumbnail: "https://cdn-images-1.medium.com/max/1024/0*Hn8btMad7K4z-Rq5",
    description: "A deep-dive into dismantling a distributed N+1 fan-out, migrating to stateless signed JWTs, and engineering 0% outage-driven logouts in enterprise microservices.",
    categories: ["performance", "low-latency", "platform-engineering", "authentication"]
  },
  {
    title: "5 AI Tools That Can Save You Hours Every Week (2025 Edition)",
    pubDate: "2025-09-05 06:11:25",
    link: "https://medium.com/@banerjeeaviroop01/5-ai-tools-that-can-save-you-hours-every-week-2025-edition-63670f6625e2",
    guid: "https://medium.com/p/63670f6625e2",
    author: "Aviroop Banerjee",
    thumbnail: "https://cdn-images-1.medium.com/max/740/1*XDCD7DGWnq8k_mODcx8G7Q.jpeg",
    description: "We live in a world where AI is no longer 'the future' — it's here, quietly taking over the small, boring tasks that eat up our time. Here are 5 AI tools that can boost your productivity without overwhelming you.",
    categories: ["artificial-intelligence"]
  },
  {
    title: "What is CDN?",
    pubDate: "2023-09-21 18:51:52",
    link: "https://medium.com/@banerjeeaviroop01/what-is-cdn-44bc3f048d18",
    guid: "https://medium.com/p/44bc3f048d18",
    author: "Aviroop Banerjee",
    thumbnail: "https://cdn-images-1.medium.com/max/982/1*Bxf8zhsrTQ6Xzqp0Q-3lDQ.png",
    description: "The internet is an incredible place, a digital realm that connects billions of users and hosts an unimaginable amount of data. In the quest for faster, more reliable internet experiences, Content Delivery Networks (CDNs) emerge as the shining knight.",
    categories: ["engineering", "technology"]
  }
];

export default function Blogs() {
  const [articles, setArticles] = useState(defaultArticles);
  const [loading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const rssUrl = "https://medium.com/feed/@banerjeeaviroop01";
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        if (data && data.items && data.items.length > 0) {
          // Merge fetched items with defaultArticles, de-duplicating by guid or link
          const map = new Map();
          [...defaultArticles, ...data.items].forEach(item => {
            const key = item.guid || item.link;
            if (!map.has(key)) {
              map.set(key, item);
            }
          });

          // Sort descending by pubDate and keep top 3
          const merged = Array.from(map.values())
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
            .slice(0, 3);

          setArticles(merged);
        }
      } catch (err) {
        console.error("Error fetching Medium blogs:", err);
        // We already have defaultArticles, so don't show an error state if defaults are present
        if (defaultArticles.length === 0) {
          setError(true);
        }
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

  // Helper to extract the first image from Medium's HTML content
  const extractImage = (article) => {
    // Try rss2json parsed thumbnail first
    if (article.thumbnail && article.thumbnail.indexOf('api.rss2json.com') === -1) {
      return article.thumbnail;
    }
    
    // Parse the actual HTML body to find the first image tag
    const htmlContent = article.content || article.description || "";
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    const imgElement = doc.querySelector('img');
    if (imgElement && imgElement.src) {
      return imgElement.src;
    }

    // Fallback abstract tech image
    return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
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
            const imageUrl = extractImage(article);
            
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
