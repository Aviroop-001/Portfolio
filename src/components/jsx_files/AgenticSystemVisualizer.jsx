import React, { useState, useEffect } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoGitNetworkOutline, 
  IoSearchOutline, 
  IoHardwareChipOutline, 
  IoCodeSlashOutline, 
  IoFlaskOutline, 
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';
import { 
  FiPlay, 
  FiPause, 
  FiRotateCcw, 
  FiChevronRight, 
  FiChevronLeft 
} from 'react-icons/fi';

const subAgentsData = [
  {
    id: 'explorer',
    step: '01',
    name: 'Explorer Agent',
    desc: 'Scans dependency graph & stack trace to pinpoint exact fault origin line.',
    icon: <IoSearchOutline />,
    graphic: {
      type: 'code',
      title: 'SyncPipeline.ts:142',
      code: `// Stack Trace: Unhandled Null Pointer Exception\nconst dispatchEvent = async (event) => {\n  // AST Localized Fault (Confidence: 98.4%)\n  const payload = event.payload;\n  return await handleDispatch(payload); // <-- THROWS NULL POINTER\n};`
    }
  },
  {
    id: 'reasoner',
    step: '02',
    name: 'Reasoning Agent',
    desc: 'Analyzes unhandled null payload during high-concurrency event dispatch.',
    icon: <IoHardwareChipOutline />,
    graphic: {
      type: 'reasoning',
      title: 'Fault Analysis Matrix',
      metrics: [
        { label: 'Localized File', val: 'SyncPipeline.ts:142' },
        { label: 'Failure Cause', val: 'Missing payload null check' },
        { label: 'Severity Risk', val: 'Low (Isolated microservice)' },
        { label: 'Confidence Score', val: '98.4%' }
      ]
    }
  },
  {
    id: 'patcher',
    step: '03',
    name: 'Patch Agent',
    desc: 'Synthesizes safe null-guard patch + automated Jest unit test spec.',
    icon: <IoCodeSlashOutline />,
    graphic: {
      type: 'diff',
      title: 'Synthesized Git Patch',
      diff: [
        { type: 'remove', line: '- return await handleDispatch(event.payload);' },
        { type: 'add', line: '+ if (!event?.payload) return await handleRetry(event);' },
        { type: 'add', line: '+ return await handleDispatch(event.payload);' }
      ]
    }
  },
  {
    id: 'tester',
    step: '04',
    name: 'Safety Agent',
    desc: 'Executes automated safety evals across 50+ microservice endpoints.',
    icon: <IoFlaskOutline />,
    graphic: {
      type: 'eval',
      title: 'Automated Safety Eval Suite',
      tests: [
        { name: 'Unit Test Spec (Jest)', pass: true, detail: '100% Passed (14/14)' },
        { name: 'API Regression Guard', pass: true, detail: '0 Breaking Changes' },
        { name: 'LLM Faithfulness Score', pass: true, detail: '1.0 / 1.0 Score' }
      ]
    }
  },
  {
    id: 'dispatch',
    step: '05',
    name: 'Dispatch Agent',
    desc: 'Dispatches PR behind SDE approval checkpoint. Cuts triage from 5 hrs to 20 min.',
    icon: <IoShieldCheckmarkOutline />,
    graphic: {
      type: 'pr',
      title: 'GitHub Pull Request #392',
      impact: 'Triage Speedup: 5 hrs ➔ 20 min (15×)',
      status: 'APPROVED & MERGED TO MAIN'
    }
  }
];

export default function AgenticSystemVisualizer() {
  // Step index: -1 = Supervisor, 0..4 = Agents, 5 = Outro
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Automatic playback timer
  useEffect(() => {
    if (!isPlaying) return;

    // Supervisor step lasts 2.5s, each agent step lasts 3.5s, outro pauses loop
    const duration = currentStepIndex === -1 ? 2500 : (currentStepIndex === 5 ? 6000 : 3500);

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= 5) {
          setIsPlaying(false);
          return 5;
        }
        return prev + 1;
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [currentStepIndex, isPlaying]);

  const handlePlayPause = () => {
    if (currentStepIndex >= 5) {
      setCurrentStepIndex(-1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(-1);
    setIsPlaying(true);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(-1, prev - 1));
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(5, prev + 1));
  };

  const handleSelectStep = (index) => {
    setIsPlaying(false);
    setCurrentStepIndex(index);
  };

  const isSupervisorStep = currentStepIndex === -1;
  const isOutroStep = currentStepIndex === 5;
  const activeAgentIndex = Math.max(0, Math.min(4, currentStepIndex));
  const currentAgent = subAgentsData[activeAgentIndex];

  return (
    <div className="agentic-auto-canvas">
      {/* Top Header Block */}
      <div className="canvas-header-block">
        <div className="badge-pill">
          <span className="dot" />
          <span>LANGGRAPH MULTI-AGENT ORCHESTRATION</span>
        </div>
        <h2 className="main-headline">Automated System Fault Localization</h2>
        <p className="sub-headline">Auto-playing interactive execution graph • Click any step to inspect</p>
      </div>

      {/* Interactive Controls & Step Pipeline Bar */}
      <div className="pipeline-controls-bar">
        <div className="playback-buttons">
          <button className="ctrl-btn play-btn" onClick={handlePlayPause} title={isPlaying ? "Pause Animation" : "Play Animation"}>
            {isPlaying ? <FiPause /> : <FiPlay />}
            <span>{isPlaying ? 'Pause' : (isOutroStep ? 'Replay' : 'Play')}</span>
          </button>
          <button className="ctrl-btn" onClick={handleRestart} title="Restart from Supervisor">
            <FiRotateCcw />
          </button>
          <div className="nav-step-group">
            <button className="ctrl-btn icon-only" onClick={handlePrevStep} disabled={currentStepIndex <= -1} title="Previous Step">
              <FiChevronLeft />
            </button>
            <button className="ctrl-btn icon-only" onClick={handleNextStep} disabled={currentStepIndex >= 5} title="Next Step">
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="step-pills-row">
          <button 
            className={`step-pill ${currentStepIndex === -1 ? 'active' : ''}`} 
            onClick={() => handleSelectStep(-1)}
          >
            Supervisor
          </button>
          {subAgentsData.map((ag, idx) => (
            <button 
              key={ag.id}
              className={`step-pill ${currentStepIndex === idx ? 'active' : (currentStepIndex > idx ? 'completed' : '')}`} 
              onClick={() => handleSelectStep(idx)}
            >
              {ag.step} {ag.name.split(' ')[0]}
            </button>
          ))}
          <button 
            className={`step-pill outro-pill ${currentStepIndex === 5 ? 'active' : ''}`} 
            onClick={() => handleSelectStep(5)}
          >
            Outro PR #392
          </button>
        </div>
      </div>

      {/* Architecture Stage Viewport */}
      <div className="architecture-stage">
        <AnimatePresence mode="wait">
          {!isOutroStep ? (
            <motion.div 
              key="main-stage"
              className="main-execution-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              {/* Supervisor Node (Visible during -1 step) */}
              <AnimatePresence>
                {isSupervisorStep && (
                  <motion.div 
                    className="mother-supervisor-node"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="node-glow-ring" />
                    <div className="mother-content">
                      <IoGitNetworkOutline className="mother-icon" />
                      <div className="mother-info">
                        <span className="m-label">SUPERVISOR NODE</span>
                        <span className="m-title">LangGraph Orchestrator</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Emerging SVG Roots (Visible during -1 step) */}
              <AnimatePresence>
                {isSupervisorStep && (
                  <motion.div 
                    className="svg-roots-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg viewBox="0 0 1000 90" preserveAspectRatio="none" className="roots-svg">
                      <motion.path 
                        d="M 500 0 C 500 45, 100 45, 100 90" 
                        className="branch-path" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.path 
                        d="M 500 0 C 500 45, 300 45, 300 90" 
                        className="branch-path" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.path 
                        d="M 500 0 C 500 45, 500 45, 500 90" 
                        className="branch-path" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.path 
                        d="M 500 0 C 500 45, 700 45, 700 90" 
                        className="branch-path" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.path 
                        d="M 500 0 C 500 45, 900 45, 900 90" 
                        className="branch-path" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 5 Bare Sub-Agent Nodes */}
              <motion.div 
                className="subagents-bare-pipeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {subAgentsData.map((agent, idx) => {
                  const isActive = currentStepIndex === idx;
                  const isDone = currentStepIndex > idx;

                  return (
                    <div 
                      key={agent.id}
                      className={`agent-bare-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                      onClick={() => handleSelectStep(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Icon Container with fill progress */}
                      <div className="icon-fill-box">
                        {isActive && (
                          <motion.div 
                            className="icon-fill-layer"
                            initial={{ height: "0%" }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 3.2, ease: "linear" }}
                          />
                        )}
                        <div className="icon-symbol">
                          {isDone ? <IoCheckmarkCircle className="check-icon" /> : agent.icon}
                        </div>
                      </div>

                      {/* Agent Name */}
                      <span className="agent-bare-name">{agent.name}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Dynamic Workspace / Terminal Window */}
              <div className="workspace-output-container">
                <AnimatePresence mode="wait">
                  {currentStepIndex >= 0 && currentStepIndex <= 4 && (
                    <motion.div 
                      key={currentAgent.id}
                      className="bare-terminal-window"
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Top Window Bar */}
                      <div className="terminal-header">
                        <div className="window-dots">
                          <span className="dot red" />
                          <span className="dot yellow" />
                          <span className="dot green" />
                        </div>
                        <span className="terminal-title">
                          {currentAgent.name} ➔ {currentAgent.graphic.title}
                        </span>
                        <span className="terminal-status-tag">
                          {currentStepIndex === 4 ? 'FINAL CHECKPOINT' : 'EXECUTION IN PROGRESS'}
                        </span>
                      </div>

                      {/* Terminal Body Content */}
                      <div className="terminal-content">
                        <p className="agent-action-desc">{currentAgent.desc}</p>

                        {currentAgent.graphic.type === 'code' && (
                          <div className="code-snippet-box">
                            <pre><code>{currentAgent.graphic.code}</code></pre>
                          </div>
                        )}

                        {currentAgent.graphic.type === 'reasoning' && (
                          <div className="matrix-results-box">
                            {currentAgent.graphic.metrics.map((m, i) => (
                              <div key={i} className="matrix-item">
                                <span className="lbl">{m.label}:</span>
                                <span className="val">{m.val}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {currentAgent.graphic.type === 'diff' && (
                          <div className="diff-view-box">
                            {currentAgent.graphic.diff.map((d, i) => (
                              <div key={i} className={`diff-line ${d.type}`}>
                                {d.line}
                              </div>
                            ))}
                          </div>
                        )}

                        {currentAgent.graphic.type === 'eval' && (
                          <div className="eval-results-box">
                            {currentAgent.graphic.tests.map((t, i) => (
                              <div key={i} className="eval-row">
                                <IoCheckmarkCircle className="eval-icon" />
                                <span className="t-title">{t.name}</span>
                                <span className="t-status">{t.detail}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {currentAgent.graphic.type === 'pr' && (
                          <div className="pr-dispatched-box">
                            <div className="pr-impact-highlight">{currentAgent.graphic.impact}</div>
                            <div className="pr-badge-status">{currentAgent.graphic.status}</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Outro Impact Metrics Stage */
            <motion.div 
              key="outro-stage"
              className="outro-impact-view"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="outro-impact-card">
                <IoCheckmarkCircle className="success-badge-icon" />
                <span className="outro-eyebrow">ALL 5 SUB-AGENTS COMPLETE ➔ PR MERGED</span>
                <h3 className="outro-heading">GitHub Pull Request #392 Dispatched</h3>
                <p className="outro-summary">
                  Null-pointer fault localized at <code>SyncPipeline.ts:142</code>. Candidate patch synthesized, verified across 50+ safety evals, and approved by SDE checkpoint.
                </p>

                <div className="metrics-tri-grid">
                  <div className="metric-box">
                    <span className="metric-value">5 hrs ➔ 20 min</span>
                    <span className="metric-label">Bug Triage Speedup</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-value">23+ Tickets</span>
                    <span className="metric-label">Resolved via Multi-Agents</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-value">100% Guarded</span>
                    <span className="metric-label">Human Checkpoint</span>
                  </div>
                </div>

                <div className="outro-action-row">
                  <button className="replay-outro-btn" onClick={handleRestart}>
                    <FiRotateCcw />
                    <span>Replay Pipeline Animation</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
