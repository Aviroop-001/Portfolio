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
  const containerRef = useRef(null);

  // 500vh scroll track length for extended reading time on GitHub PR Dispatched outro
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 26, restDelta: 0.001 });

  // Phase 1 -> Phase 2: Supervisor & Roots
  // Supervisor Node is visible on landing (1.0), then transitions out as execution starts (0.16 to 0.24)
  const supervisorOpacity = useTransform(smoothProgress, [0.00, 0.16, 0.24], [1, 1, 0]);
  const supervisorY = useTransform(smoothProgress, [0.16, 0.24], [0, -50]);

  // SVG Roots emerge downwards from Supervisor (0.06 to 0.18), then fade out (0.20 to 0.24)
  const rootPathGrowth = useTransform(smoothProgress, [0.06, 0.18], [0, 1]);
  const rootOpacity = useTransform(smoothProgress, [0.05, 0.12, 0.20, 0.24], [0, 1, 1, 0]);

  // Phase 2 -> Phase 3: Subagents reveal & glide UPWARDS to fill vacant space when supervisor leaves (0.22 to 0.32)
  const subAgentsOpacity = useTransform(smoothProgress, [0.14, 0.22], [0, 1]);
  const subAgentsY = useTransform(smoothProgress, [0.14, 0.22, 0.32], [40, 0, -110]);
  const subAgentsScale = useTransform(smoothProgress, [0.14, 0.22], [0.95, 1]);

  // Terminal Output Window Entrance & shift up into vacant space
  const terminalOpacity = useTransform(smoothProgress, [0.18, 0.25], [0, 1]);
  const terminalY = useTransform(smoothProgress, [0.18, 0.25, 0.32], [20, 0, -110]);

  // Phase 3: Active progress fill width (0.22 to 0.65)
  const progressFillWidth = useTransform(smoothProgress, (val) => {
    const START = 0.22;
    const END = 0.65;
    if (val < START) return "0%";
    if (val >= END) return "100%";

    const fraction = (val - START) / (END - START);
    const scaled = fraction * 5;
    const stepIndex = Math.min(Math.floor(scaled), 4);
    const stepProgress = Math.min(Math.round((scaled - stepIndex) * 100), 100);
    return `${stepProgress}%`;
  });

  // Active step index (0, 1, 2, 3, 4)
  const activeStepIndexTransform = useTransform(smoothProgress, (val) => {
    const START = 0.22;
    const END = 0.65;
    if (val < START) return 0;
    if (val >= END) return 4;
    const fraction = (val - START) / (END - START);
    return Math.min(Math.floor(fraction * 5), 4);
  });

  // Phase 4: Extended Outro Stage Transitions (0.65 to 1.00)
  const activeStageScale = useTransform(smoothProgress, [0.65, 0.72], [1, 0.92]);
  const activeStageY = useTransform(smoothProgress, [0.65, 0.72], [-110, -170]);
  const activeStageOpacity = useTransform(smoothProgress, [0.65, 0.72], [1, 0]);

  // Outro emerges early (0.70 to 0.76) and STAYS PINNED until 1.00 for long scroll viewing
  const outroOpacity = useTransform(smoothProgress, [0.70, 0.76], [0, 1]);
  const outroScale = useTransform(smoothProgress, [0.70, 0.76], [0.92, 1]);
  const outroY = useTransform(smoothProgress, [0.70, 0.76], [40, 0]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const unsub = activeStepIndexTransform.on("change", (latestIndex) => {
      setCurrentStepIndex((prev) => (prev !== latestIndex ? latestIndex : prev));
    });
    return () => unsub();
  }, [activeStepIndexTransform]);

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

          {/* Active Execution Stage */}
          <motion.div 
            className="main-execution-view"
            style={{ 
              opacity: activeStageOpacity, 
              y: activeStageY,
              scale: activeStageScale
            }}
          >
            {/* Supervisor Node (Lands first, then transitions out) */}
            <motion.div 
              className="mother-supervisor-node"
              style={{ opacity: supervisorOpacity, y: supervisorY }}
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

            {/* Emerging SVG Roots */}
            <motion.div className="svg-roots-container" style={{ opacity: rootOpacity }}>
              <svg viewBox="0 0 1000 90" preserveAspectRatio="none" className="roots-svg">
                <motion.path d="M 500 0 C 500 45, 100 45, 100 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 300 45, 300 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 500 45, 500 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 700 45, 700 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
                <motion.path d="M 500 0 C 500 45, 900 45, 900 90" className="branch-path" style={{ pathLength: rootPathGrowth }} />
              </svg>
            </motion.div>

            {/* 5 Sub-Agents Pipeline Grid (Glides up into vacant supervisor space) */}
            <motion.div 
              className="subagents-pipeline-grid"
              style={{ 
                opacity: subAgentsOpacity, 
                y: subAgentsY,
                scale: subAgentsScale 
              }}
            >
              {subAgentsData.map((agent, idx) => {
                const isActive = currentStepIndex === idx;
                const isDone = currentStepIndex > idx;

                return (
                  <div 
                    key={agent.id}
                    className={`agent-pipeline-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  >
                    {/* Top Row: Big Icon + Step Number */}
                    <div className="agent-top">
                      <div className="node-icon-wrapper">
                        {isDone ? <IoCheckmarkCircle className="check-icon" /> : agent.icon}
                      </div>
                      <span className="step-num">{agent.step}</span>
                    </div>

                    {/* Middle: Agent Title */}
                    <div className="agent-text">
                      <h4 className="agent-title">{agent.name}</h4>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="node-status-bar">
                      {isActive ? (
                        <motion.div 
                          className="active-progress-fill" 
                          style={{ width: progressFillWidth }} 
                        />
                      ) : (
                        <div className={`static-fill ${isDone ? 'done-fill' : ''}`} />
                      )}
                    </div>

                    {/* Status Pill Badge */}
                    <div className="node-pill">
                      {isDone ? 'DONE ✓' : isActive ? 'RUNNING' : 'QUEUED'}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Dynamic Code Terminal / Workspace Window (Glides up into vacant supervisor space) */}
            <motion.div 
              className="workspace-output-container"
              style={{ opacity: terminalOpacity, y: terminalY }}
            >
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
                      <div className="graphic-block diff-block">
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
            </motion.div>

          </motion.div>

          {/* Outro Impact Metrics Stage */}
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
