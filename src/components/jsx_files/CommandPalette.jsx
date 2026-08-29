import React, { useEffect, useState, useRef } from 'react';
import './CommandPalette.scss';
import { 
  FiHome, FiBriefcase, FiCpu, FiFolder, FiBook, 
  FiMessageSquare, FiGithub, FiLinkedin, FiDownload, FiSearch 
} from 'react-icons/fi';

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

  const commands = [
    { id: 'intro', label: 'Go to Home', icon: <FiHome />, type: 'scroll' },
    { id: 'experience', label: 'Go to Experience', icon: <FiBriefcase />, type: 'scroll' },
    { id: 'skills', label: 'Go to Skills', icon: <FiCpu />, type: 'scroll' },
    { id: 'projects', label: 'Go to Projects', icon: <FiFolder />, type: 'scroll' },
    { id: 'education', label: 'Go to Education', icon: <FiBook />, type: 'scroll' },
    { id: 'contact', label: 'Go to Contact', icon: <FiMessageSquare />, type: 'scroll' },
    { id: 'github', label: 'Open GitHub', icon: <FiGithub />, type: 'link', url: 'https://github.com/Aviroop-001' },
    { id: 'linkedin', label: 'Open LinkedIn', icon: <FiLinkedin />, type: 'link', url: 'https://www.linkedin.com/in/aviroopbanerjee/' },
    { id: 'resume', label: 'Download Resume', icon: <FiDownload />, type: 'link', url: 'https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link' },
    ...rawSkills.map(skill => ({
      id: `skill-${skill}`,
      label: `Skill: ${skill}`,
      icon: <FiCpu />,
      type: 'scroll',
      target: 'skills'
    }))
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

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
            placeholder="Type a command or search..."
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
                  <span className="cmd-item-label">{cmd.label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cmd-empty">No commands found.</div>
          )}
        </div>
        <div className="cmd-footer">
          Use <span className="key-cap">↑</span> <span className="key-cap">↓</span> to navigate, <span className="key-cap">↵</span> to select
        </div>
      </div>
    </div>
  );
}
