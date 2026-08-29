import React, { useMemo } from 'react';
import "../styling_files/skills.scss";
import { Box } from "@chakra-ui/react";
import { 
  FiCode, 
  FiCloud, 
  FiCpu, 
  FiDatabase, 
  FiTool, 
  
} from "react-icons/fi";

export default function Skills() {
  const skillCategories = useMemo(() => [
    {
      id: 'LANGUAGES',
      name: 'Languages',
      icon: <FiCode />,
      skills: ["JavaScript/TypeScript", "Go", "Python", "SQL", "C++", "Java"]
    },
    {
      id: 'BACKEND_CLOUD',
      name: 'Backend & Cloud',
      icon: <FiCloud />,
      skills: ["Node.js", "NestJS", "REST", "gRPC", "AWS", "GCP", "Docker", "Kubernetes", "Terraform", "NATS JetStream"]
    },
    {
      id: 'AI_DATA',
      name: 'AI & Data Eng',
      icon: <FiCpu />,
      skills: ["LangChain", "LangGraph", "RAG", "LLM agents", "PyTorch", "TensorFlow", "Whisper", "Kafka", "DuckDB", "Pandas"]
    },
    {
      id: 'DATABASES',
      name: 'Databases & Cache',
      icon: <FiDatabase />,
      skills: ["PostgreSQL", "pgvector", "Redis", "MongoDB", "ClickHouse"]
    },
    {
      id: 'TOOLS_INFRA',
      name: 'Tools & Practices',
      icon: <FiTool />,
      skills: ["Git", "GitHub Actions", "CI/CD", "Prometheus", "Grafana", "OpenTelemetry"]
    }
  ], []);

  return (
    <Box className="skills-container modern-ux">
      <div className="skills-grid">
        {skillCategories.map(cat => (
          <div key={cat.id} className="skill-category-card">
            <div className="category-header">
              <span className="category-icon">{cat.icon}</span>
              <h3 className="category-name">{cat.name}</h3>
            </div>
            <div className="category-tags">
              {cat.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}
