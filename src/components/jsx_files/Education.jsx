import React from 'react';
import "../styling_files/education.scss";
import { Box } from "@chakra-ui/react";
import { educationData } from "./Data";

export default function Education() {
  return (
    <Box className="education-compact-container">
      <div className="education-compact-grid">
        {educationData.map((edu, idx) => (
          <div key={idx} className="edu-compact-card">
            <div className="edu-card-top">
              <div className="edu-degree">{edu.position}</div>
              <div className="edu-grade-row">
                <span className="edu-cgpa-badge">{edu.text}</span>
              </div>
            </div>
            
            <div className="edu-card-details">
              <span className="edu-school">{edu.org}</span>
              <span className="edu-year">{edu.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}
