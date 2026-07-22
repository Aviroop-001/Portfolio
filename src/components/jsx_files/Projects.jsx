import React, { useState } from 'react';
import "../styling_files/projects.scss";
import { projectsData } from "./Data";
import { Box, Text, Image } from "@chakra-ui/react";
import { AiOutlineLink } from "react-icons/ai";
import { VscGithubAlt } from "react-icons/vsc";
import { FiZap, FiLayers } from "react-icons/fi";

export default function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const activeProject = projectsData[selectedProjectIndex] || projectsData[0];

  const projectTechMap = {
    "Blogetra": ["ReactJS", "Node.js", "Express.js", "MongoDB", "REST API", "Auth"],
    "Collab.io": ["ReactJS", "Node.js", "Express.js", "REST API", "Real-time Sync"],
    "Radius": ["ReactJS", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    "Intelligram": ["React Native Expo", "Firebase", "Redux", "Real-time CRUD"],
    "User Dashboard": ["ReactJS", "React Query", "JSON Server", "Tailwind CSS"]
  };

  const projectMetricsMap = {
    "Blogetra": "Fullstack Blog with User Authentication & Full CRUD",
    "Collab.io": "100+ Registered Users • <150ms Response Times",
    "Radius": "Bi-directional WebSocket Communication & Chat",
    "Intelligram": "Cross-platform Mobile App with Firebase Backend",
    "User Dashboard": "Realtime State Management & Employee Tracking"
  };

  return (
    <Box className="projects-showcase-container">
      {/* Header */}
      <Box className="projects-header">
        <Text className="section-title">
          Featured Engineering Projects
        </Text>
        <Text className="projects-description">
          A showcase of fullstack applications, real-time collaboration platforms, and mobile apps built for performance and scale.
        </Text>
      </Box>

      {/* Project Selector Tab Bar */}
      <Box className="project-selector-tabs">
        {projectsData.map((project, index) => (
          <button
            key={project.id}
            className={`project-tab-btn ${selectedProjectIndex === index ? 'active' : ''}`}
            onClick={() => setSelectedProjectIndex(index)}
          >
            <FiZap className="btn-icon" />
            <span>{project.title}</span>
          </button>
        ))}
      </Box>

      {/* Active Project Card View */}
      <Box className="active-project-card">
        <Box className="project-grid-layout">
          {/* Left Column: Image Preview */}
          <Box className="project-preview-wrapper">
            <Image 
              src={activeProject.image} 
              alt={activeProject.title}
              className="project-img"
            />
            <span className="live-status-pill">
              <span className="pulse-dot" /> LIVE APP
            </span>
          </Box>

          {/* Right Column: Details & Tech */}
          <Box className="project-details-column">
            <Box className="details-header">
              <Text className="project-title-text">{activeProject.title}</Text>
              {projectMetricsMap[activeProject.title] && (
                <span className="metric-pill">
                  <FiLayers className="icon" />
                  {projectMetricsMap[activeProject.title]}
                </span>
              )}
            </Box>

            <Text className="project-description-text">
              {activeProject.description}
            </Text>

            {/* Tech Stack Badges */}
            {projectTechMap[activeProject.title] && (
              <Box className="tech-badges-group">
                {projectTechMap[activeProject.title].map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </Box>
            )}

            {/* Action Buttons */}
            <Box className="project-action-btns">
              {activeProject.liveLink && (
                <a 
                  href={activeProject.liveLink}
                  className="glass-button primary-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineLink className="button-icon" />
                  <span>Live Demo</span>
                </a>
              )}

              {activeProject.repo && (
                <a 
                  href={activeProject.repo}
                  className="glass-button secondary-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <VscGithubAlt className="button-icon" />
                  <span>Source Code</span>
                </a>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
