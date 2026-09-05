import React, { useRef, useState, useEffect } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  IoGitNetworkOutline, 
  IoSearchOutline, 
  IoHardwareChipOutline, 
  IoCodeSlashOutline, 
  IoFlaskOutline, 
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';

const subAgentsData = [
  {
    id: 'explorer',
    step: '01',
    name: 'Code Explorer Agent',
    role: 'AST & Call-Graph Search',
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
    name: 'Reasoning Engine',
    role: 'Root Cause Inference',
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
    name: 'Patch Synthesizer',
    role: 'LLM Fix & Test Generator',
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
    name: 'Eval & Safety Runner',
    role: 'Automated Regression Suite',
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
    name: 'Human Checkpoint',
    role: 'GitHub PR Dispatcher',
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
  const containerRef = useRef(null);

  // 250vh scroll track height: snappy, interactive & responsive
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  // SVG Roots (Always visible, draws quickly from 0.00 to 0.15)
  const rootPathGrowth = useTransform(smoothProgress, [0.00, 0.15], [0.2, 1]);

  // Synchronized Step & Progress calculation (0.05 to 0.82)
  const stepStateTransform = useTransform(smoothProgress, (val) => {
    const START = 0.05;
    const END = 0.82;
    if (val < START) return { index: 0, progress: 0 };
    if (val >= END) return { index: 4, progress: 100 };

    const fraction = (val - START) / (END - START); // 0.0 to 1.0
    const scaled = fraction * 5; // 0.0 to 5.0
    const index = Math.min(Math.floor(scaled), 4);
    const progress = Math.min(Math.round((scaled - index) * 100), 100);
    return { index, progress };
  });

  // Outro transition (0.85 to 0.98)
  const activeStageScale = useTransform(smoothProgress, [0.85, 0.93], [1, 0.92]);
  const activeStageY = useTransform(smoothProgress, [0.85, 0.93], [0, -60]);
  const activeStageOpacity = useTransform(smoothProgress, [0.85, 0.93], [1, 0]);

  const outroOpacity = useTransform(smoothProgress, [0.90, 0.97], [0, 1]);
  const outroScale = useTransform(smoothProgress, [0.90, 0.97], [0.9, 1]);
  const outroY = useTransform(smoothProgress, [0.90, 0.97], [40, 0]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    const unsub = stepStateTransform.on("change", ({ index, progress }) => {
      setCurrentStepIndex(index);
      setProgressPct(progress);
    });
    return () => unsub();
  }, [stepStateTransform]);

  const currentAgent = subAgentsData[currentStepIndex];

  return (
    <div className="agentic-scroll-wrapper" ref={containerRef}>
      {/* Sticky Fullscreen WorkOS-Style Canvas */}
      <div className="agentic-sticky-canvas">

        {/* Top Header */}
        <div className="canvas-header-block">
          <div className="badge-pill">
            <span className="dot" />
            <span>LANGGRAPH MULTI-AGENT ORCHESTRATION</span>
          </div>
          <h2 className="main-headline">Automated System Fault Localization</h2>
          <p className="sub-headline">Scroll down to trace Supervisor root branching & worker execution.</p>
        </div>

        {/* Stage Container */}
        <div className="architecture-stage">

          {/* Active Execution Stage (Mother Agent + Roots + Subagents + Code Output) */}
          <motion.div 
            className="main-execution-view"
            style={{ 
              opacity: activeStageOpacity, 
              y: activeStageY,
              scale: activeStageScale
            }}
          >
            {/* Top Mother Supervisor Node */}
            <div className="mother-supervisor-node">
              <div className="node-glow-ring" />
              <div className="mother-content">
                <IoGitNetworkOutline className="mother-icon" />
                <div className="mother-info">
                  <span className="m-label">SUPERVISOR NODE</span>
                  <span className="m-title">LangGraph Orchestrator</span>
                </div>
              </div>
            </div>

            {/* Emerging SVG Roots (5 Branch Lines from Mother to Subagents) */}
            <div className="svg-roots-container">
              <svg viewBox="0 0 1000 90" preserveAspectRatio="none" className="roots-svg">
                <motion.path d="M 500 0 C 500 45, 100 45, 100 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 300 45, 300 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 500 45, 500 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 700 45, 700 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 900 45, 900 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
              </svg>
            </div>

            {/* 5 Sub-Agents Pipeline Bar (Always Visible Immediately) */}
            <div className="subagents-pipeline-grid">
              {subAgentsData.map((agent, idx) => {
                const isActive = currentStepIndex === idx;
                const isDone = currentStepIndex > idx;

                return (
                  <div 
                    key={agent.id}
                    className={`agent-pipeline-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  >
                    <div className="agent-top">
                      <div className="node-icon-wrapper">
                        {isDone ? <IoCheckmarkCircle className="check-icon" /> : agent.icon}
                      </div>
                      <span className="step-num">{agent.step}</span>
                    </div>

                    <div className="agent-text">
                      <h4 className="agent-title">{agent.name}</h4>
                      <span className="agent-subrole">{agent.role}</span>
                    </div>

                    {/* Progress indicator */}
                    <div className="node-status-bar">
                      {isActive && (
                        <div className="active-progress-fill" style={{ width: `${progressPct}%` }} />
                      )}
                    </div>

                    <div className="node-pill">
                      {isDone ? 'DONE ✓' : isActive ? `RUNNING ${progressPct}%` : 'QUEUED'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Code Terminal / Workspace Window */}
            <div className="workspace-output-container">
              <AnimatePresence mode="wait">
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
                      {progressPct < 100 ? 'EXECUTION IN PROGRESS' : 'TASK COMPLETED'}
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
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Outro Impact Metrics Stage (Scales in when scroll reaches 0.90+) */}
          <motion.div 
            className="outro-impact-view"
            style={{ 
              opacity: outroOpacity, 
              scale: outroScale,
              y: outroY 
            }}
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
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
