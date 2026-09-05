import React, { useState } from 'react';
import "../styling_files/experience.scss";
import { timelineData } from "./Data";
import { Box } from "@chakra-ui/react";
import { FiCalendar, FiArrowRight, FiZap, FiExternalLink } from "react-icons/fi";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  const handleOpenPlayground = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/playground');
    window.dispatchEvent(new Event('popstate'));
  };

  const roleMetricsMap = {
    "CommerceIQ": [
      "⚡ 15× Bug Triage Speedup",
      "🛡️ OpenTelemetry Golden Path",
      "☁️ S3 + AWS Lambda Event Pipeline"
    ],
    "Airbook": [
      "⚡ DuckDB High-Efficiency ETL",
      "🤖 CodeLlama NLQ-to-SQL",
      "📊 Multi-Warehouse Pipeline"
    ],
    "Listed": [
      "👥 11M User Recommendation Engine",
      "🎙️ Whisper Speech-to-Text Ads",
      "🔗 BERT Semantic Link Engine"
    ],
    "Fi Ellements": [
      "⚡ Responsive UI Modules",
      "🎨 Fintech State Workflows"
    ]
  };

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

              {/* Role Highlight Metrics Banner */}
              {roleMetricsMap[timelineData[activeTab].org] && (
                <div className="role-highlight-banner">
                  {roleMetricsMap[timelineData[activeTab].org].map((m, i) => (
                    <span key={i} className="highlight-pill">{m}</span>
                  ))}
                </div>
              )}

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

              {/* Dedicated Playground Route Trigger for CommerceIQ */}
              {timelineData[activeTab].org === "CommerceIQ" && (
                <div className="architecture-showcase-wrapper">
                  <button 
                    className="architecture-toggle-btn"
                    onClick={handleOpenPlayground}
                  >
                    <FiZap className="btn-zap-icon" />
                    <span className="btn-text">
                      ⚡ Open Interactive LangGraph Multi-Agent Playground
                    </span>
                    <span className="btn-badge">Playground Canvas ↗</span>
                    <FiExternalLink className="arrow-icon" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}
