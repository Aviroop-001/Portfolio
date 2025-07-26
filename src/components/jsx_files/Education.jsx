import { useState } from "react";
import "../styling_files/education.scss";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { IoSchool } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { educationData } from "./Data";

export default function Education() {

  return (
          <Box
        className="education"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >


      {/* Main Glass Card */}
      <Box className="glass-card" maxWidth="900px" width="90%" padding={["2rem", "3rem"]}>
        <Box className="education-content">
          <Text className="section-title">
            Education Journey
          </Text>
          
          <Text className="education-description">
            My academic path in computer science and technology, building the foundation for innovation.
          </Text>

          {/* Education Timeline */}
          <Box className="education-timeline">
            {educationData.map((edu, index) => (
              <Box key={edu.org} className="timeline-item">
                <Box className="timeline-marker">
                  <IoSchool className="timeline-icon" />
                </Box>
                
                <Box className="timeline-content">
                  <Box className="education-card">
                    {/* Always visible: Title and CGPA */}
                    <Box className="card-preview">
                      <Text className="degree-title">{edu.position}</Text>
                      <Text className="cgpa-display">
                        {edu.text.match(/\d+\.?\d*\s*CGPA/i)?.[0] || edu.text}
                      </Text>
                    </Box>

                    {/* Hover details */}
                    <Box className="card-details">
                      <Box className="date-container">
                        <MdDateRange className="date-icon" />
                        <Text className="date">{edu.date}</Text>
                      </Box>
                      <Box className="institution-info">
                        <Text className="institution-name">{edu.org}</Text>
                        <Box className="institution-type" style={{backgroundColor: edu.category.color}}>
                          {edu.category.tag}
                        </Box>
                      </Box>
                      <Text className="education-details">
                        {edu.text}
                      </Text>
                    </Box>
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
