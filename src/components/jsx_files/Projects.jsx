import "../styling_files/projects.scss";
import { useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { VscGithubAlt } from "react-icons/vsc";
import { projectsData } from "./Data";
import {
  Box, 
  Text, 
  Image,
  Button
} from "@chakra-ui/react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <Box
      className="projects"
      id="projects"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >


      {/* Main Glass Card */}
      <Box className="glass-card" maxWidth="850px" width="90%">
        <Box className="projects-content">
          <Text className="section-title">
            Featured Projects
          </Text>
          
          <Text className="projects-description">
            A showcase of my technical expertise and problem-solving abilities through innovative web applications.
          </Text>

          {/* Project Navigation */}
          <Box className="project-nav">
            {projectsData.map((project, index) => (
              <button
                key={project.id}
                className={`nav-button ${selectedProject === index ? 'active' : ''}`}
                onClick={() => setSelectedProject(index)}
              >
                {project.title}
              </button>
            ))}
          </Box>

          {/* Current Project Display */}
          <Box className="project-showcase">
            <Box className="project-card">
              <Box className="project-content">
                <Box className="project-image">
                  <Image 
                    src={projectsData[selectedProject].image} 
                    alt={projectsData[selectedProject].title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    borderRadius="12px"
                  />
                </Box>
                
                <Box className="project-info">
                  <Text className="project-title">
                    {projectsData[selectedProject].title}
                  </Text>
                  
                  <Text className="project-description">
                    {projectsData[selectedProject].description}
                  </Text>
                </Box>
              </Box>
              
              <Box className="project-actions">
                <a 
                  href={projectsData[selectedProject].liveLink}
                  className="glass-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineLink className="button-icon" />
                  <span>Live Demo</span>
                  <Box className="button-shimmer" />
                </a>
                
                {projectsData[selectedProject].repo && (
                  <a 
                    href={projectsData[selectedProject].repo}
                    className="glass-button secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <VscGithubAlt className="button-icon" />
                    <span>Source Code</span>
                    <Box className="button-shimmer" />
                  </a>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
