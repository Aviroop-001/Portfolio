import "../styling_files/skills.scss";
import { useState } from "react";
import {
  Tag,
  TagLabel, 
  Box, 
  Text
} from "@chakra-ui/react";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      name: 'Languages',
      skills: ["JavaScript","Python", "Golang", "TypeScript", "C++", "C","HTML","CSS","SQL","SASS", "SCSS"]
    },
    {
      name: 'Frameworks',
      skills: [
        "Node.js", "Express.js", "Django", "Flask", "Gin", "ReactJS", "React Native", 
        "Mongoose", "jQuery", "Redux", "TensorFlow", "Keras", "Pandas", "Numpy", 
        "Pyplot", "Scrapy", "Beautiful Soup"
      ]
    },
    {
      name: 'Tools & Cloud',
      skills: [
        "AWS", "GCP", "Supabase", "Snowflake", "MongoDB", "MySQL", "PostgreSQL", 
        "Linux", "REST API", "Web Scraping", "Git", "Docker", "Kubernetes", 
        "Terraform", "CI/CD"
      ]
    },
    {
      name: 'Specializations',
      skills: [
        "Machine Learning", "Large Language Models", "Natural Language Processing", 
        "Data Science", "System Design", "Software Architecture"
      ]
    }
  ];

  return (
          <Box
        className="skills"
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
        <Box className="skills-content">
          <Text className="section-title">
            Technical Expertise
          </Text>
          
          <Text className="skills-description">
            A comprehensive toolkit spanning full-stack development, cloud architecture, and emerging technologies.
          </Text>

          {/* Category Navigation */}
          <Box className="category-nav">
            {categories.map((category, index) => (
              <button
                key={category.name}
                className={`nav-button ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
              >
                {category.name}
              </button>
            ))}
          </Box>

          {/* Skills Display */}
          <Box className="skills-showcase">
            <Box className="skills-grid">
              {categories[activeCategory].skills.map((skill, index) => (
                <Box key={skill} className="skill-tag" style={{animationDelay: `${index * 0.1}s`}}>
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

  
