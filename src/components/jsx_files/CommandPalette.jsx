import React, { useEffect, useState, useRef } from 'react';
import './CommandPalette.scss';
import { 
  FiHome, FiUser, FiBriefcase, FiCpu, FiFolder, FiBook, 
  FiMessageSquare, FiGithub, FiLinkedin, FiDownload, FiSearch,
  FiZap
} from 'react-icons/fi';
import { projectsData, timelineData, educationData } from './Data';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const rawSkills = [
    "JavaScript/TypeScript", "Go", "Python", "SQL", "C++", "Java",
    "Node.js", "NestJS", "REST", "gRPC", "AWS", "GCP", "Docker", "Kubernetes", "Terraform", "NATS JetStream",
    "LangChain", "LangGraph", "RAG", "LLM agents", "PyTorch", "TensorFlow", "Whisper", "Kafka", "DuckDB", "Pandas",
    "PostgreSQL", "pgvector", "Redis", "MongoDB", "ClickHouse",
    "Git", "GitHub Actions", "CI/CD", "Prometheus", "Grafana", "OpenTelemetry"
  ];

  // Base navigation and external links
  const baseCommands = [
    { id: 'nav-home', label: 'Go to Home', category: 'Navigation', icon: <FiHome />, type: 'scroll', target: 'intro' },
    { id: 'nav-about', label: 'Go to About Me', category: 'Navigation', icon: <FiUser />, type: 'scroll', target: 'about' },
    { id: 'nav-experience', label: 'Go to Experience', category: 'Navigation', icon: <FiBriefcase />, type: 'scroll', target: 'experience' },
    { id: 'nav-skills', label: 'Go to Skills', category: 'Navigation', icon: <FiCpu />, type: 'scroll', target: 'skills' },
    { id: 'nav-projects', label: 'Go to Projects', category: 'Navigation', icon: <FiFolder />, type: 'scroll', target: 'projects' },
    { id: 'nav-education', label: 'Go to Education', category: 'Navigation', icon: <FiBook />, type: 'scroll', target: 'education' },
    { id: 'nav-contact', label: 'Go to Contact', category: 'Navigation', icon: <FiMessageSquare />, type: 'scroll', target: 'contact' },
    { id: 'link-github', label: 'Open GitHub Profile', category: 'Social Links', icon: <FiGithub />, type: 'link', url: 'https://github.com/Aviroop-001' },
    { id: 'link-linkedin', label: 'Open LinkedIn Profile', category: 'Social Links', icon: <FiLinkedin />, type: 'link', url: 'https://www.linkedin.com/in/aviroop-banerjee-0775a621b/' },
    { id: 'link-resume', label: 'Open Résumé (PDF)', category: 'Documents', icon: <FiDownload />, type: 'link', url: '/resume.pdf' }
  ];

  // About Me Section Content
  const aboutCommands = [
    {
      id: 'about-philosophy',
      label: 'Engineering Philosophy: Scalability & Platform Architecture',
      snippet: 'Architecting highly scalable backends, performant microservices, standardized golden path libraries, AWS Lambda event pipelines, and multi-agent LLM systems.',
      keywords: 'scalable backends performant microservices golden path foundation libraries event-driven data pipelines AWS Lambda S3 Kafka multi-agent LLM systems architecture',
      category: 'About Me',
      icon: <FiUser />,
      type: 'scroll',
      target: 'about'
    },
    {
      id: 'about-metric-1',
      label: 'Metric: 15× Bug Triage Speedup',
      snippet: 'Automated multi-agent root-cause fault localization system utilizing LangGraph & LangChain.',
      keywords: '15x triage speedup bug root cause langgraph langchain',
      category: 'About Me',
      icon: <FiZap />,
      type: 'scroll',
      target: 'about'
    },
    {
      id: 'about-metric-2',
      label: 'Metric: 11M Users Served',
      snippet: 'Multi-modal recommendation engine with OpenAI Whisper speech-to-text and BERT semantic entity mapping.',
      keywords: '11M users recommendation engine whisper bert speech to text entity mapping',
      category: 'About Me',
      icon: <FiZap />,
      type: 'scroll',
      target: 'about'
    },
    {
      id: 'about-metric-3',
      label: 'Metric: <150ms API Response Latency',
      snippet: 'High-performance REST API services and real-time collaboration platforms.',
      keywords: '150ms latency response time collab io real time docs',
      category: 'About Me',
      icon: <FiZap />,
      type: 'scroll',
      target: 'about'
    },
    {
      id: 'about-metric-4',
      label: 'Metric: 100% Guarded Checkpoints',
      snippet: 'Automated safety eval suites across 50+ microservice endpoints behind SDE review checkpoints.',
      keywords: '100% guarded human checkpoints safety eval pr review',
      category: 'About Me',
      icon: <FiZap />,
      type: 'scroll',
      target: 'about'
    },
    {
      id: 'about-metric-5',
      label: 'Metric: 23+ Production Tickets Resolved',
      snippet: 'Production bug resolutions via autonomous multi-agent triage system.',
      keywords: '23+ production tickets resolved multi-agent',
      category: 'About Me',
      icon: <FiZap />,
      type: 'scroll',
      target: 'about'
    }
  ];

  // Experience Section Content (dynamically extracted from timelineData)
  const experienceCommands = timelineData.flatMap((exp, expIdx) => {
    const items = [
      {
        id: `exp-role-${expIdx}`,
        label: `${exp.position} @ ${exp.org}`,
        snippet: `${exp.date} • Skills: ${exp.skills || ''}`,
        keywords: `${exp.position} ${exp.org} ${exp.date} ${exp.skills || ''} ${exp.text || ''}`,
        category: 'Experience',
        icon: <FiBriefcase />,
        type: 'scroll',
        target: 'experience'
      }
    ];

    if (exp.bullets && exp.bullets.length > 0) {
      exp.bullets.forEach((bullet, bulletIdx) => {
        items.push({
          id: `exp-bullet-${expIdx}-${bulletIdx}`,
          label: `${exp.org}: ${bullet.length > 70 ? bullet.slice(0, 70) + '...' : bullet}`,
          snippet: bullet,
          keywords: `${bullet} ${exp.org} ${exp.position} ${exp.skills || ''}`,
          category: 'Experience Impact',
          icon: <FiBriefcase />,
          type: 'scroll',
          target: 'experience'
        });
      });
    }

    return items;
  });

  // Projects Section Content (dynamically extracted from projectsData)
  const projectCommands = projectsData.map((project, idx) => ({
    id: `project-${idx}`,
    label: `Project: ${project.title}`,
    snippet: project.description,
    keywords: `${project.title} ${project.description}`,
    category: 'Projects',
    icon: <FiFolder />,
    type: 'scroll',
    target: 'projects'
  }));

  // Education Section Content
  const educationCommands = educationData.map((edu, idx) => ({
    id: `edu-${idx}`,
    label: `Education: ${edu.position}`,
    snippet: `${edu.org} (${edu.date}) • ${edu.text}`,
    keywords: `${edu.position} ${edu.org} ${edu.date} ${edu.text}`,
    category: 'Education',
    icon: <FiBook />,
    type: 'scroll',
    target: 'education'
  }));

  // Skills Commands
  const skillCommands = rawSkills.map(skill => ({
    id: `skill-${skill}`,
    label: `Skill: ${skill}`,
    snippet: `Technologies & Core Competencies • ${skill}`,
    keywords: `skill technology ${skill}`,
    category: 'Skills',
    icon: <FiCpu />,
    type: 'scroll',
    target: 'skills'
  }));

  // Master Command Pool
  const allCommands = [
    ...baseCommands,
    ...aboutCommands,
    ...experienceCommands,
    ...projectCommands,
    ...educationCommands,
    ...skillCommands
  ];

  // Filtering based on search query across labels, snippets, categories & keywords
  const query = search.trim().toLowerCase();

  const filteredCommands = allCommands.filter(cmd => {
    if (!query) {
      // Default view when input is empty
      return ['Navigation', 'Social Links', 'Documents'].includes(cmd.category);
    }
    const matchLabel = cmd.label.toLowerCase().includes(query);
    const matchCategory = cmd.category.toLowerCase().includes(query);
    const matchSnippet = cmd.snippet ? cmd.snippet.toLowerCase().includes(query) : false;
    const matchKeywords = cmd.keywords ? cmd.keywords.toLowerCase().includes(query) : false;
    return matchLabel || matchCategory || matchSnippet || matchKeywords;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleExecute = (command) => {
    setIsOpen(false);
    if (command.type === 'scroll') {
      const el = document.getElementById(command.target || command.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (command.type === 'link') {
      window.open(command.url, '_blank');
    }
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    }
    if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleExecute(filteredCommands[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" onClick={() => setIsOpen(false)}>
      <div className="cmd-palette-modal" onClick={e => e.stopPropagation()}>
        <div className="cmd-header">
          <FiSearch className="search-icon" />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search About Me, Projects, Experience, Skills, or type a command..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleListKeyDown}
            className="cmd-input"
          />
          <span className="cmd-badge">ESC</span>
        </div>
        <div className="cmd-body">
          {filteredCommands.length > 0 ? (
            <ul className="cmd-list">
              {filteredCommands.map((cmd, idx) => (
                <li 
                  key={cmd.id} 
                  className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleExecute(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <span className="cmd-item-icon">{cmd.icon}</span>
                  <div className="cmd-item-text">
                    <div className="cmd-item-top">
                      <span className="cmd-item-label">{cmd.label}</span>
                      <span className="cmd-item-badge">{cmd.category}</span>
                    </div>
                    {cmd.snippet && (
                      <span className="cmd-item-snippet">{cmd.snippet}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cmd-empty">No results found for "{search}".</div>
          )}
        </div>
        <div className="cmd-footer">
          Use <span className="key-cap">↑</span> <span className="key-cap">↓</span> to navigate, <span className="key-cap">↵</span> to select
        </div>
      </div>
    </div>
  );
}
