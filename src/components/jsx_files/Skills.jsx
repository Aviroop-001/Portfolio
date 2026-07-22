import React, { useState, useMemo } from 'react';
import "../styling_files/skills.scss";
import { Box, Text } from "@chakra-ui/react";
import { 
  FiCode, 
  FiCloud, 
  FiCpu, 
  FiDatabase, 
  FiTool, 
  FiZap,
  FiCheckCircle
} from "react-icons/fi";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

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
      name: 'AI & Data Engineering',
      icon: <FiCpu />,
      skills: ["LangChain", "LangGraph", "RAG", "LLM agents", "prompt engineering", "PyTorch", "TensorFlow", "Whisper", "Kafka", "DuckDB", "Pandas"]
    },
    {
      id: 'DATABASES',
      name: 'Databases & Caching',
      icon: <FiDatabase />,
      skills: ["PostgreSQL", "pgvector", "Elasticsearch", "Redis", "DynamoDB", "MongoDB", "Redshift", "Snowflake"]
    },
    {
      id: 'OBSERVABILITY',
      name: 'Observability & Tools',
      icon: <FiTool />,
      skills: ["OpenTelemetry", "Prometheus", "Jenkins", "GitHub Actions (CI/CD)", "Git", "Linux"]
    }
  ], []);

  // Compute filtered skills list based on active category tab & search query
  const displayedCategories = useMemo(() => {
    return skillCategories
      .map(cat => {
        if (activeCategory !== 'ALL' && cat.id !== activeCategory) {
          return null;
        }

        const filteredSkills = cat.skills.filter(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredSkills.length === 0 && searchQuery.trim() !== '') {
          return null;
        }

        return {
          ...cat,
          skills: searchQuery.trim() !== '' ? filteredSkills : cat.skills
        };
      })
      .filter(Boolean);
  }, [skillCategories, activeCategory, searchQuery]);

  const totalSkillCount = useMemo(() => {
    return skillCategories.reduce((acc, curr) => acc + curr.skills.length, 0);
  }, [skillCategories]);

  return (
    <Box className="skills-console-container">
      {/* Header Banner */}
      <Box className="skills-header">
        <Text className="section-title">
          Technical Capabilities
        </Text>
        <Text className="skills-description">
          An interactive catalog of my production stack spanning AI agents, high-throughput backend services, cloud systems, and data infrastructure.
        </Text>
      </Box>

      {/* Retro CLI Search & Console Stats */}
      <Box className="skills-console-toolbar">
        <Box className="cli-search-box">
          <span className="cli-prompt-tag">&gt;_ query:</span>
          <input
            type="text"
            placeholder="Search skills (e.g. LangChain, gRPC, pgvector, Docker)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cli-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              Clear
            </button>
          )}
        </Box>

        <Box className="console-stats-pill">
          <FiZap className="stat-icon" />
          <span>{totalSkillCount} Stack Items</span>
        </Box>
      </Box>

      {/* Category Selection Tabs */}
      <Box className="category-tab-bar">
        <button
          className={`category-tab-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveCategory('ALL')}
        >
          <span className="tab-icon">⚡</span>
          <span>All Stack</span>
        </button>

        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </Box>

      {/* Featured AI & Systems Specialization Ribbon */}
      {activeCategory === 'ALL' && !searchQuery && (
        <Box className="featured-specialization-card">
          <Box className="card-badge">
            <FiZap /> FEATURED SPECIALIZATIONS
          </Box>
          <Box className="specialization-grid">
            <Box className="spec-item">
              <Text className="spec-title">🤖 AI & Agentic Systems</Text>
              <Text className="spec-desc">LangChain, LangGraph, RAG pipelines, LLM Agents, pgvector, Whisper</Text>
            </Box>
            <Box className="spec-item">
              <Text className="spec-title">⚡ Distributed Backend & Cloud</Text>
              <Text className="spec-desc">Go, NestJS, gRPC, NATS JetStream, PostgreSQL, Docker, AWS, GCP</Text>
            </Box>
          </Box>
        </Box>
      )}

      {/* Skills Showcase Grid by Category */}
      <Box className="skills-grid-display">
        {displayedCategories.length === 0 ? (
          <Box className="no-skills-found">
            <Text>No matching skills found for "{searchQuery}"</Text>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }} className="reset-btn">
              Reset Filters
            </button>
          </Box>
        ) : (
          displayedCategories.map((cat) => (
            <Box key={cat.id} className="category-section-block">
              <Box className="category-block-header">
                <span className="cat-icon">{cat.icon}</span>
                <Text className="cat-title">{cat.name}</Text>
                <span className="cat-count-badge">{cat.skills.length}</span>
              </Box>

              <Box className="skill-badges-wrapper">
                {cat.skills.map((skill, index) => (
                  <Box 
                    key={skill} 
                    className="retro-skill-badge"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <FiCheckCircle className="badge-check-icon" />
                    <span className="skill-name">{skill}</span>
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
