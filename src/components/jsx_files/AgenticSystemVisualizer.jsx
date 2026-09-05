import React, { useState, useEffect, useRef } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { motion, useInView } from 'framer-motion';
import { 
  IoGitNetworkOutline, 
  IoSearchOutline, 
  IoHardwareChipOutline, 
  IoCodeSlashOutline, 
  IoFlaskOutline, 
  IoShieldCheckmarkOutline 
} from 'react-icons/io5';

const subAgents = [
  {
    id: 'explorer',
    name: 'Code Explorer Agent',
    role: 'AST & Call-Graph Search',
    status: 'Exploring dependencies...',
    badge: 'SUB-AGENT #1',
    icon: <IoSearchOutline />,
    logs: 'Indexed 2,400 files ➔ Isolated fault at SyncPipeline.ts:142'
  },
  {
    id: 'reasoner',
    name: 'Reasoning Agent',
    role: 'Root Cause Inference',
    status: 'Analyzing stack trace...',
    badge: 'SUB-AGENT #2',
    icon: <IoHardwareChipOutline />,
    logs: 'Inferred unhandled null payload during async event dispatch'
  },
  {
    id: 'patcher',
    name: 'Code Patch Agent',
    role: 'Synthesize Fix & Tests',
    status: 'Synthesizing patch...',
    badge: 'SUB-AGENT #3',
    icon: <IoCodeSlashOutline />,
    logs: 'Generated 1-line null-guard patch + unit test spec'
  },
  {
    id: 'tester',
    name: 'Test & Eval Agent',
    role: 'Regression & Safety',
    status: 'Running test suite...',
    badge: 'SUB-AGENT #4',
    icon: <IoFlaskOutline />,
    logs: '100% test pass rate across 50 microservices'
  },
  {
    id: 'guardrail',
    name: 'Human Guardrail',
    role: 'PR Checkpoint & Dispatch',
    status: 'Awaiting human signoff...',
    badge: 'CHECKPOINT',
    icon: <IoShieldCheckmarkOutline />,
    logs: 'Human approved ➔ Dispatched GitHub PR #392 (Triage 5h ➔ 20m)'
  }
];

export default function AgenticSystemVisualizer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through multi-agent orchestration steps when scrolled into view
  useEffect(() => {
    if (!isInView || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveAgentIndex((prev) => (prev + 1) % subAgents.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [isInView, isAutoPlaying]);

  const activeAgent = subAgents[activeAgentIndex];

  return (
    <div className="agentic-visualizer-container" ref={containerRef}>
      {/* Header */}
      <div className="visualizer-header">
        <div className="header-info">
          <span className="header-tag">Live Multi-Agent Orchestration</span>
          <h3 className="header-title">LangGraph Supervisor & Dynamic Sub-Agent Spawning</h3>
        </div>

        <div className="header-controls">
          <span className="live-status-pill">
            <span className="pulse-dot" />
            {isAutoPlaying ? 'AUTO-PLAYING ORCHESTRATION' : 'PAUSED'}
          </span>
          <button 
            className="toggle-auto-btn"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? 'Pause Loop' : 'Resume Autoplay'}
          </button>
        </div>
      </div>

      {/* Orchestrator Center Core & Sub-Agent Radial/Branching Layout */}
      <div className="agentic-orchestration-canvas">
        {/* Supervisor Central Node */}
        <div className="supervisor-core-node">
          <div className="core-icon-ring">
            <IoGitNetworkOutline className="core-icon" />
          </div>
          <div className="core-info">
            <span className="core-title">LANGGRAPH SUPERVISOR</span>
            <span className="core-status">Spawning & Routing Sub-Agents</span>
          </div>
        </div>

        {/* Sub-Agent Nodes Row */}
        <div className="sub-agents-grid">
          {subAgents.map((agent, index) => {
            const isActive = activeAgentIndex === index;
            return (
              <motion.div
                key={agent.id}
                className={`sub-agent-card ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveAgentIndex(index);
                }}
                animate={{
                  scale: isActive ? 1.04 : 1,
                  y: isActive ? -4 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="card-top-bar">
                  <span className="agent-badge">{agent.badge}</span>
                  <span className={`status-indicator ${isActive ? 'active' : ''}`}>
                    {isActive ? 'ACTIVE' : 'IDLE'}
                  </span>
                </div>

                <div className="agent-icon-box">
                  {agent.icon}
                </div>

                <h4 className="agent-name">{agent.name}</h4>
                <span className="agent-role">{agent.role}</span>

                {/* Active Pulsing Beam indicator */}
                {isActive && (
                  <motion.div 
                    className="active-beam" 
                    layoutId="activeAgentBeam"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Agent Reasoning & Log Streamer */}
      <div className="agent-reasoning-terminal">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="terminal-title">
            SUPERVISOR LOGS ➔ [{activeAgent.name.toUpperCase()}]
          </span>
        </div>

        <div className="terminal-content">
          <div className="log-row">
            <span className="time-tag">[00:04.{activeAgentIndex * 12}]</span>
            <span className="agent-tag">[{activeAgent.name}]</span>
            <span className="log-status">{activeAgent.status}</span>
          </div>
          <div className="log-result-row">
            <span className="arrow">➔</span>
            <span className="result-text">{activeAgent.logs}</span>
          </div>
        </div>
      </div>

      {/* Impact Metric Footer */}
      <div className="orchestrator-metrics">
        <div className="metric-box">
          <span className="num">5 Sub-Agents</span>
          <span className="lbl">Parallel Reasoning & Tool Use</span>
        </div>
        <div className="metric-box">
          <span className="num">5 hrs ➔ 20 min</span>
          <span className="lbl">Automated Bug Triage Speedup</span>
        </div>
        <div className="metric-box">
          <span className="num">100% Guarded</span>
          <span className="lbl">Human Approval Checkpoints</span>
        </div>
      </div>
    </div>
  );
}
