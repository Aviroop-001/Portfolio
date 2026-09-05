import React, { useState } from 'react';
import "../styling_files/experience.scss";
import { timelineData } from "./Data";
import { Box } from "@chakra-ui/react";
import { FiCalendar, FiArrowRight, FiZap, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import AgenticSystemVisualizer from "./AgenticSystemVisualizer";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [showVisualizer, setShowVisualizer] = useState(true);

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

              {/* Embedded Multi-Agent Architecture Visualizer for CommerceIQ */}
              {timelineData[activeTab].org === "CommerceIQ" && (
                <div className="architecture-showcase-wrapper">
                  <button 
                    className={`architecture-toggle-btn ${showVisualizer ? 'active' : ''}`}
                    onClick={() => setShowVisualizer(!showVisualizer)}
                  >
                    <FiZap className="btn-zap-icon" />
                    <span className="btn-text">
                      {showVisualizer ? 'Collapse Multi-Agent System Visualizer' : '⚡ Explore Live LangGraph Multi-Agent Architecture'}
                    </span>
                    <span className="btn-badge">WorkOS Canvas</span>
                    {showVisualizer ? <FiChevronUp className="arrow-icon" /> : <FiChevronDown className="arrow-icon" />}
                  </button>

                  <AnimatePresence>
                    {showVisualizer && (
                      <motion.div 
                        className="embedded-visualizer-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <AgenticSystemVisualizer />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}
