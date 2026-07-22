import React, { useState } from 'react';
import "../styling_files/experience.scss";
import { timelineData } from "./Data";
import { Box, Text } from "@chakra-ui/react";
import { MdBusinessCenter } from "react-icons/md";
import { FiCalendar, FiCode, FiLayers } from "react-icons/fi";

export default function Experience() {
  const [filter, setFilter] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Roles' },
    { id: 'Full-time', label: 'Full-Time' },
    { id: 'Internship', label: 'Internships' },
    { id: 'Volunteer', label: 'Leadership' }
  ];

  const filteredData = filter === 'ALL' 
    ? timelineData 
    : timelineData.filter(item => item.category?.tag === filter);

  return (
    <Box className="experience-container">
      <Box className="experience-header">
        <Text className="section-title">
          Professional Journey
        </Text>
        <Text className="experience-description">
          A track record of engineering scalable platforms, AI solutions, distributed backend services, and high-performance applications.
        </Text>

        {/* Category Filter Tabs */}
        <Box className="filter-tab-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </Box>
      </Box>

      {/* Experience Cards Stream */}
      <Box className="experience-stream">
        {filteredData.map((exp, index) => {
          const skillsList = exp.skills ? exp.skills.split(',').map(s => s.trim()) : [];

          return (
            <Box key={exp.org + exp.position + index} className="experience-card-wrapper">
              <Box className="card-top-row">
                <Box className="role-meta">
                  <Box className="company-badge-icon">
                    <MdBusinessCenter />
                  </Box>
                  <Box className="role-titles">
                    <Text className="position-title">{exp.position}</Text>
                    <Text className="company-name">{exp.org}</Text>
                  </Box>
                </Box>

                <Box className="date-pill">
                  <FiCalendar className="pill-icon" />
                  <span>{exp.date}</span>
                </Box>
              </Box>

              <Box className="card-body-text">
                <Text>{exp.text}</Text>
              </Box>

              {/* Tag Badges */}
              <Box className="card-footer-tags">
                <span className={`tag-pill category-tag ${exp.category?.tag?.toLowerCase()}`}>
                  <FiLayers className="pill-icon" />
                  {exp.category?.tag}
                </span>

                {skillsList.map((skill) => (
                  <span key={skill} className="tag-pill tech-tag">
                    <FiCode className="pill-icon" />
                    {skill}
                  </span>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
