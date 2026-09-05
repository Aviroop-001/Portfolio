import React, { useState, useEffect } from 'react';
import "../styling_files/experience.scss";
import { timelineData } from "./Data";
import { Box } from "@chakra-ui/react";
import { FiCalendar, FiArrowRight, FiZap, FiX, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import AgenticSystemVisualizer from "./AgenticSystemVisualizer";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle body scroll lock & Esc key listener when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <Box className="experience-container modern-ux">
      <Box className="experience-layout">
        <div className="tabs-column">
          {timelineData.map((item, idx) => (
            <button 
              key={idx}
              className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="tab-title">{item.position}</span>
              <span className="tab-company">{item.org}</span>
            </button>
          ))}
        </div>
        
        <div className="content-column">
          {timelineData[activeTab] && (
            <div className="experience-details">
              <h3 className="role-title">
                {timelineData[activeTab].position}{" "}
                <span className="company-name">@ {timelineData[activeTab].org}</span>
              </h3>

              <div className="date-badge">
                <FiCalendar /> {timelineData[activeTab].date}
              </div>

              <ul className="impact-list">
                {timelineData[activeTab].bullets && timelineData[activeTab].bullets.map((desc, i) => (
                  <li key={i}>
                    <FiArrowRight className="bullet-icon"/> <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {timelineData[activeTab].skills && (
                <div className="tech-tags">
                  {timelineData[activeTab].skills.split(', ').map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}

              {/* Fullscreen Architecture Showcase Modal Trigger for CommerceIQ */}
              {timelineData[activeTab].org === "CommerceIQ" && (
                <div className="architecture-showcase-wrapper">
                  <button 
                    className="architecture-toggle-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FiZap className="btn-zap-icon" />
                    <span className="btn-text">
                      ⚡ Launch Interactive LangGraph Multi-Agent Architecture
                    </span>
                    <span className="btn-badge">Full-screen Canvas ↗</span>
                    <FiExternalLink className="arrow-icon" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>

      {/* Full-Screen WorkOS Visualizer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="architecture-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sticky Header Bar */}
            <div className="modal-header-bar">
              <div className="modal-brand-info">
                <FiZap className="brand-icon" />
                <span className="brand-title">CommerceIQ Enterprise Deep-Dive</span>
                <span className="brand-sep">•</span>
                <span className="brand-sub">LangGraph Multi-Agent Architecture</span>
              </div>

              <button 
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <span>Close</span>
                <FiX className="close-icon" />
                <span className="esc-hint">Esc</span>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="modal-scroll-content">
              <AgenticSystemVisualizer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
