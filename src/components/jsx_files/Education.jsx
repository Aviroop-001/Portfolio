import React from 'react';
import "../styling_files/education.scss";
import { Box } from "@chakra-ui/react";
import { IoSchoolOutline, IoCalendarOutline } from "react-icons/io5";
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
    <Box className="education-modern-container">
      <div className="education-grid">
        {educationData.map((edu, idx) => (
          <div key={idx} className="education-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <IoSchoolOutline />
              </div>
              <div className="grade-badge">
                {edu.text.match(/\d+(\.\d+)?/)?.[0] || ""} {edu.text.includes('CGPA') ? 'CGPA' : '%'}
              </div>
            </div>
            
            <div className="card-body">
              <h3 className="degree-title">{edu.position}</h3>
              <p className="school-name">{edu.org}</p>
              
              <div className="date-row">
                <IoCalendarOutline />
                <span>{edu.date}</span>
              </div>
            </div>

            {courseworkMap[edu.org] && (
              <div className="coursework-section">
                <div className="coursework-tags">
                  {courseworkMap[edu.org].map((course, i) => (
                    <span key={i} className="course-tag">{course}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Box>
  );
}
