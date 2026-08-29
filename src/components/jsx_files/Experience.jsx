import React, { useState } from 'react';
import "../styling_files/experience.scss";
import { timelineData } from "./Data";
import { Box } from "@chakra-ui/react";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

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
              <h3 className="role-title">{timelineData[activeTab].position} <span className="company-name">@ {timelineData[activeTab].org}</span></h3>
              <div className="date-badge">
                <FiCalendar /> {timelineData[activeTab].date}
              </div>
              <ul className="impact-list">
                {timelineData[activeTab].bullets && timelineData[activeTab].bullets.map((desc, i) => (
                  <li key={i}><FiArrowRight className="bullet-icon"/> <span>{desc}</span></li>
                ))}
              </ul>
              {timelineData[activeTab].skills && (
                <div className="tech-tags">
                  {timelineData[activeTab].skills.split(', ').map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}
