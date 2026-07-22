import React from 'react';
import "../styling_files/education.scss";
import { Box, Text } from "@chakra-ui/react";
import { IoSchoolOutline, IoRibbonOutline, IoCalendarOutline } from "react-icons/io5";
import { educationData } from "./Data";

export default function Education() {
  const courseworkMap = {
    "Maulana Abul Kalam Azad University of Technology": [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Software Architecture",
      "Machine Learning"
    ],
    "Aditya Academy Sr. Secondary": [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science (Python)"
    ],
    "Aditya Academy Secondary": [
      "Mathematics",
      "Science",
      "Social Science"
    ]
  };

  return (
    <Box className="education-compact-container">
      {/* Header */}
      <Box className="education-header">
        <Text className="section-title">
          Academic Foundation
        </Text>
        <Text className="education-description">
          Computer Science & Engineering background focused on software architecture, distributed systems, algorithms, and core engineering.
        </Text>
      </Box>

      {/* 3-Column Compact Grid (Fits on screen without scrolling) */}
      <Box className="education-cards-grid">
        {educationData.map((edu, index) => {
          const cgpaMatch = edu.text.match(/\d+\.?\d*\s*CGPA/i);
          const cgpaText = cgpaMatch ? cgpaMatch[0] : null;
          const coursework = courseworkMap[edu.org] || [];

          return (
            <Box key={edu.org + index} className="compact-edu-card">
              <Box className="card-top">
                <Box className="edu-icon-badge">
                  <IoSchoolOutline />
                </Box>

                <Box className="badges-group">
                  {cgpaText && (
                    <span className="cgpa-pill">
                      <IoRibbonOutline className="icon" />
                      {cgpaText}
                    </span>
                  )}
                  <span className="date-pill">
                    <IoCalendarOutline className="icon" />
                    {edu.date}
                  </span>
                </Box>
              </Box>

              <Box className="card-titles">
                <Text className="degree-name">{edu.position}</Text>
                <Text className="institution-name">{edu.org}</Text>
              </Box>

              <Text className="edu-details-text">{edu.text}</Text>

              {/* Coursework Tags */}
              {coursework.length > 0 && (
                <Box className="coursework-box">
                  <Text className="coursework-label">FOCUS & COURSEWORK:</Text>
                  <Box className="course-pills-row">
                    {coursework.map((course) => (
                      <span key={course} className="course-pill">
                        {course}
                      </span>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
