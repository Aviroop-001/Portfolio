import React, { useState } from 'react';
import "../styling_files/projects.scss";
import { projectsData } from "./Data";
import { Box, Text, Image } from "@chakra-ui/react";
import { AiOutlineLink } from "react-icons/ai";
import { VscGithubAlt } from "react-icons/vsc";
import { FiLayers, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const projectTechMap = {
    "Generative AI & Financial Reporting Platform": ["Python", "RandomForest", "LightGBM", "Gemini", "GitHub Actions"],
    "Blogetra": ["ReactJS", "Node.js", "Express.js", "MongoDB", "REST API"],
    "Collab.io": ["ReactJS", "Node.js", "Express.js", "Real-time Sync"],
    "Radius": ["ReactJS", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    "Intelligram": ["React Native Expo", "Firebase", "Redux", "Real-time CRUD"],
    "User Dashboard": ["ReactJS", "React Query", "JSON Server", "Tailwind CSS"]
  };

  const projectMetricsMap = {
    "Generative AI & Financial Reporting Platform": "Ensemble ML • SMOTE • Gemini Automation",
    "Blogetra": "Fullstack Blog • Auth • REST API",
    "Collab.io": "100+ Active Users • <150ms Latency",
    "Radius": "Bi-directional WebSockets • Chat",
    "Intelligram": "Cross-Platform Mobile App • Firebase",
    "User Dashboard": "Realtime State • Employee Tracking"
  };

  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 2);

  return (
    <Box className="projects-showcase-container">
      {/* Header */}
      <Box className="projects-header">
        <Text className="projects-description">
          A showcase of fullstack applications, real-time collaboration platforms, and AI-powered data systems built for performance and scale.
        </Text>
      </Box>

      {/* Modern 2-Column Bento Spotlight Cards Grid */}
      <div className="projects-bento-grid">
        {visibleProjects.map((project) => (
          <div key={project.id} className="project-bento-card">
            {/* Card Image Preview */}
            <div className="card-preview-container">
              <Image 
                src={project.image} 
                alt={project.title}
                className="card-img"
              />
              <span className="live-status-pill">
                <span className="pulse-dot" /> {project.liveLink ? 'LIVE APP' : 'OPEN SOURCE'}
              </span>
            </div>

            {/* Card Content Details */}
            <div className="card-content">
              <div className="card-top-row">
                <h3 className="project-card-title">{project.title}</h3>
                {projectMetricsMap[project.title] && (
                  <span className="metric-pill">
                    <FiLayers className="icon" />
                    {projectMetricsMap[project.title]}
                  </span>
                )}
              </div>

              <p className="project-card-desc">{project.description}</p>

              {/* Tech Stack Badges */}
              {projectTechMap[project.title] && (
                <div className="tech-badges-group">
                  {projectTechMap[project.title].map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="project-action-btns">
                {project.liveLink && (
                  <a 
                    href={project.liveLink}
                    className="glass-button primary-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineLink className="button-icon" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.repo && (
                  <a 
                    href={project.repo}
                    className="glass-button secondary-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <VscGithubAlt className="button-icon" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expand / Collapse Toggle Button */}
      {projectsData.length > 2 && (
        <div className="projects-expand-wrapper">
          <button 
            className="projects-toggle-btn"
            onClick={() => setShowAll(!showAll)}
          >
            <span>{showAll ? 'Show Fewer Projects' : `Show All Projects (${projectsData.length - 2} More)`}</span>
            {showAll ? <FiChevronUp className="arrow-icon" /> : <FiChevronDown className="arrow-icon" />}
          </button>
        </div>
      )}
    </Box>
  );
}
