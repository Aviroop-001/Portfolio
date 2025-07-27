

import "../styling_files/experience.scss";
import { timelineData } from "./Data";
import { Box, Text } from "@chakra-ui/react";
import { MdDateRange, MdWork } from "react-icons/md";

export default function Experience() {
  return (
    <Box
      className="experience"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >


      {/* Main Glass Card */}
      <Box className="glass-card" maxWidth="850px" width="75%">
        <Box className="experience-content">
          <Text className="section-title">
            Professional Journey
          </Text>
          
          <Text className="experience-description">
            My professional evolution through diverse roles, building expertise and delivering impactful solutions.
          </Text>

          {/* Experience Timeline */}
          <Box className="experience-timeline">
            {timelineData.map((exp, index) => (
              <Box key={exp.org + index} className="timeline-item">
                <Box className="timeline-marker">
                  <MdWork className="timeline-icon" />
                </Box>
                
                <Box className="timeline-content">
                  <Box className="experience-card">
                    <Box className="card-header">
                      <Box className="title-row">
                        <Text className="position-title">{exp.position}</Text>
                        <Box className="date-container">
                          <MdDateRange className="date-icon" />
                          <Text className="date">{exp.date}</Text>
                        </Box>
                      </Box>
                      <Box className="company-info">
                        <Text className="company-name">{exp.org}</Text>
                        <Box className="experience-type" style={{backgroundColor: exp.category.color}}>
                          {exp.category.tag}
                        </Box>
                      </Box>
                    </Box>
                    
                    <Text className="experience-details">
                      {exp.text}
                    </Text>
                    
                    {exp.skills && (
                      <Box className="skills-section">
                        <Text className="skills-label">Technologies:</Text>
                        <Text className="skills-list">{exp.skills}</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
