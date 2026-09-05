import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiGithub, FiDatabase, FiCpu } from 'react-icons/fi';
import AgenticSystemVisualizer from './AgenticSystemVisualizer';
import DuckDBETLVisualizer from './DuckDBETLVisualizer';
import '../styling_files/agenticPlayground.scss';

export default function AgenticPlaygroundPage({ onBack }) {
  const [activeScenario, setActiveScenario] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('scenario') === 'duckdb' ? 'duckdb' : 'langgraph';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScenario]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/#experience';
    }
  };

  const handleSwitchScenario = (scenario) => {
    setActiveScenario(scenario);
    const newUrl = `/playground?scenario=${scenario}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div className="playground-page-container">
      {/* Top Sticky Navbar */}
      <nav className="playground-navbar">
        <button className="back-btn" onClick={handleBack}>
          <FiArrowLeft className="arrow-icon" />
          <span>Back to Portfolio</span>
        </button>

        {/* Scenario Switcher Pills */}
        <div className="scenario-switcher-pills">
          <button 
            className={`scenario-pill-btn ${activeScenario === 'langgraph' ? 'active' : ''}`}
            onClick={() => handleSwitchScenario('langgraph')}
          >
            <FiCpu className="pill-icon" />
            <span>CommerceIQ • LangGraph Multi-Agent</span>
          </button>
          <button 
            className={`scenario-pill-btn ${activeScenario === 'duckdb' ? 'active' : ''}`}
            onClick={() => handleSwitchScenario('duckdb')}
          >
            <FiDatabase className="pill-icon" />
            <span>Airbook • DuckDB Vectorized ETL</span>
          </button>
        </div>

        <a 
          href="https://github.com/Aviroop-001" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FiGithub className="gh-icon" />
          <span>GitHub</span>
        </a>
      </nav>

      {/* Visualizer Body */}
      <div className="playground-body">
        {activeScenario === 'langgraph' ? (
          <AgenticSystemVisualizer />
        ) : (
          <DuckDBETLVisualizer />
        )}
      </div>
    </div>
  );
}
