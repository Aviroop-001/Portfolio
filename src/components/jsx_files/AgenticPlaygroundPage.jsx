import React, { useEffect } from 'react';
import { FiArrowLeft, FiZap, FiGithub } from 'react-icons/fi';
import AgenticSystemVisualizer from './AgenticSystemVisualizer';
import '../styling_files/agenticPlayground.scss';

export default function AgenticPlaygroundPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/#experience';
    }
  };

  return (
    <div className="playground-page-container">
      {/* Top Sticky Navbar */}
      <nav className="playground-navbar">
        <button className="back-btn" onClick={handleBack}>
          <FiArrowLeft className="arrow-icon" />
          <span>Back to Portfolio</span>
        </button>

        <div className="playground-title-badge">
          <FiZap className="zap-icon" />
          <span>CommerceIQ Deep-Dive • LangGraph Playground</span>
        </div>

        <a 
          href="https://github.com/Aviroop-001" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FiGithub className="gh-icon" />
          <span>GitHub</span>
        </a>
      </nav>

      {/* Visualizer Body */}
      <div className="playground-body">
        <AgenticSystemVisualizer />
      </div>
    </div>
  );
}
