import React, { useRef } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  IoGitNetworkOutline, 
  IoSearchOutline, 
  IoHardwareChipOutline, 
  IoCodeSlashOutline, 
  IoFlaskOutline, 
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
  IoCheckmarkDoneCircle
} from 'react-icons/io5';

const subAgentsData = [
  {
    id: 'explorer',
    step: '01',
    name: 'Code Explorer Agent',
    role: 'AST & Call-Graph Search',
    desc: 'Scans dependency graph & stack trace to pinpoint exact failure line.',
    icon: <IoSearchOutline />,
    graphic: {
      type: 'code',
      title: 'SyncPipeline.ts',
      code: `140  const dispatchEvent = async (event) => {\n141    // AST Fault Localized (Confidence: 98%)\n142    if (!event.payload) throw new NullError();\n143  }`
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
        { label: 'Fault Origin', val: 'SyncPipeline.ts:142' },
        { label: 'Cause', val: 'Unhandled null payload' },
        { label: 'Risk Score', val: 'Low (Isolated)' }
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
      title: 'Synthesized Patch',
      diff: [
        { type: 'remove', line: '-  return await handleDispatch(event.payload);' },
        { type: 'add', line: '+  if (!event?.payload) return await handleRetry(event);' }
      ]
    }
  },
  {
    id: 'tester',
    step: '04',
    name: 'Eval & Safety Runner',
    role: 'Automated Regression Evals',
    desc: 'Executes automated eval suite across 50+ microservice endpoints.',
    icon: <IoFlaskOutline />,
    graphic: {
      type: 'eval',
      title: 'Automated Safety Suite',
      tests: [
        { name: 'Unit Test Coverage', pass: true, detail: '100% Passed' },
        { name: 'API Regression Guard', pass: true, detail: '0 Breaking Changes' },
        { name: 'Faithfulness Score', pass: true, detail: '1.0 Score' }
      ]
    }
  },
  {
    id: 'dispatch',
    step: '05',
    name: 'Human Checkpoint',
    role: 'GitHub PR Dispatch',
    desc: 'Dispatches PR behind SDE approval checkpoint. Triage time cut from 5 hrs to 20 min.',
    icon: <IoShieldCheckmarkOutline />,
    graphic: {
      type: 'pr',
      title: 'GitHub PR #392 Created',
      impact: '5 hrs ➔ 20 min (15× Speedup)',
      status: 'APPROVED & MERGED'
    }
  }
];

export default function AgenticSystemVisualizer() {
  const containerRef = useRef(null);

  // 400vh long scroll pin track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 22 });

  // Phase Transforms:
  // Root Emerging (0.1 to 0.25)
  const rootHeight = useTransform(smoothProgress, [0.1, 0.25], ["0%", "100%"]);
  const rootsOpacity = useTransform(smoothProgress, [0.08, 0.2], [0, 1]);

  // Sub-Agent Active Step (0.25 to 0.8)
  const activeStepTransform = useTransform(smoothProgress, [0.25, 0.38, 0.52, 0.65, 0.78], [0, 1, 2, 3, 4]);

  // Sub-Agent Progress % per step (0% to 100%)
  const stepSubProgress = useTransform(smoothProgress, (val) => {
    if (val < 0.25) return 0;
    if (val > 0.8) return 100;
    const normalized = (val - 0.25) / 0.55; // 0 to 1
    const currentStepFraction = (normalized * 5) % 1;
    return Math.round(currentStepFraction * 100);
  });

  // Final Results Exit (0.8 to 1.0)
  const isFinalPhase = useTransform(smoothProgress, [0.82, 0.88], [false, true]);

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [subProgressVal, setSubProgressVal] = React.useState(0);
  const [showFinalMetrics, setShowFinalMetrics] = React.useState(false);

  React.useEffect(() => {
    const unsubStep = activeStepTransform.on("change", (latest) => {
      const rounded = Math.min(Math.max(Math.round(latest), 0), subAgentsData.length - 1);
      setCurrentStepIndex(rounded);
    });
    const unsubProg = stepSubProgress.on("change", (latest) => {
      setSubProgressVal(latest);
    });
    const unsubFinal = isFinalPhase.on("change", (latest) => {
      setShowFinalMetrics(latest);
    });
    return () => {
      unsubStep();
      unsubProg();
      unsubFinal();
    };
  }, [activeStepTransform, stepSubProgress, isFinalPhase]);

  const currentAgent = subAgentsData[currentStepIndex];

  return (
    <div className="mother-agent-pin-container" ref={containerRef}>
      {/* Sticky Fullscreen Canvas */}
      <div className="mother-sticky-canvas">
        
        {/* Header */}
        <div className="canvas-header">
          <h3 className="system-title">LangGraph Multi-Agent Fault Localization</h3>
          <p className="system-subtitle">
            {showFinalMetrics 
              ? "All sub-agents completed execution. PR dispatched behind human checkpoint." 
              : "Scroll to watch Supervisor spawn worker roots and execute multi-agent fault triage."}
          </p>
        </div>

        {/* Phase 1 & 2: Top Mother Supervisor & Emerging Roots */}
        <div className="mother-supervisor-hub">
          <div className="hub-core-card">
            <IoGitNetworkOutline className="hub-icon" />
            <div className="hub-info">
              <span className="hub-badge">LANGGRAPH SUPERVISOR</span>
              <span className="hub-name">Orchestrator Node</span>
            </div>
          </div>

          {/* Emerging Roots SVG */}
          <motion.div className="emerging-roots-wrapper" style={{ opacity: rootsOpacity }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="roots-svg">
              <motion.path 
                d="M 50 0 L 50 100 M 50 30 L 15 100 M 50 30 L 85 100 M 50 60 L 32 100 M 50 60 L 68 100" 
                className="root-line" 
                style={{ pathLength: rootHeight }} 
              />
            </svg>
          </motion.div>
        </div>

        {/* Main Workspace Stage */}
        <AnimatePresence mode="wait">
          {showFinalMetrics ? (
            /* Phase 4: Final Result & Impact Metrics Outro */
            <motion.div 
              key="final-outro"
              className="final-outro-stage"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="outro-card">
                <IoCheckmarkDoneCircle className="outro-icon" />
                <span className="outro-badge">TRIAGE COMPLETE & PR MERGED</span>
                <h4 className="outro-title">GitHub PR #392 Dispatched</h4>
                <p className="outro-desc">
                  Fault localized at <code>SyncPipeline.ts:142</code>, candidate patch synthesized, 100% eval suite passed, and human SDE checkpoint approved.
                </p>

                <div className="outro-metrics-grid">
                  <div className="metric-cell">
                    <span className="val">5 hrs ➔ 20 min</span>
                    <span className="lbl">Bug Triage Speedup</span>
                  </div>
                  <div className="metric-cell">
                    <span className="val">23+ Tickets</span>
                    <span className="lbl">Resolved via Multi-Agents</span>
                  </div>
                  <div className="metric-cell">
                    <span className="val">100% Guarded</span>
                    <span className="lbl">Human Approval Checkpoint</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Phase 3: Sub-Agents Execution Stage */
            <motion.div 
              key="agents-stage"
              className="agents-execution-stage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="stage-2col-layout">
                {/* Left Column: Sliding Sub-Agent Worker List */}
                <div className="subagents-sliding-list">
                  {subAgentsData.map((agent, idx) => {
                    const isActive = currentStepIndex === idx;
                    const isDone = currentStepIndex > idx;
                    return (
                      <motion.div 
                        key={agent.id} 
                        className={`sliding-agent-card ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                        animate={{ x: isActive ? 8 : 0, scale: isActive ? 1.02 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <div className="agent-icon-box">
                          {isDone ? <IoCheckmarkCircle className="check-done" /> : agent.icon}
                        </div>

                        <div className="agent-meta">
                          <div className="meta-top">
                            <span className="step-tag">{agent.step}</span>
                            <h5 className="agent-name">{agent.name}</h5>
                          </div>
                          <span className="agent-role">{agent.role}</span>

                          {/* Progress Bar for Active Agent */}
                          {isActive && (
                            <div className="progress-bar-track">
                              <div 
                                className="progress-bar-fill" 
                                style={{ width: `${subProgressVal}%` }} 
                              />
                            </div>
                          )}
                        </div>

                        <div className="status-pill">
                          {isDone ? 'COMPLETED ✓' : isActive ? `IN PROGRESS ${subProgressVal}%` : 'QUEUED'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Column: Dynamic Workspace Preview Card */}
                <div className="workspace-preview-stage">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentAgent.id}
                      className="workspace-window"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="window-bar">
                        <div className="dots">
                          <span className="dot red" />
                          <span className="dot yellow" />
                          <span className="dot green" />
                        </div>
                        <span className="window-title">{currentAgent.name} ➔ {currentAgent.graphic.title}</span>
                      </div>

                      <div className="window-body">
                        <p className="desc">{currentAgent.desc}</p>

                        {currentAgent.graphic.type === 'code' && (
                          <div className="graphic-block code-block">
                            <pre><code>{currentAgent.graphic.code}</code></pre>
                          </div>
                        )}

                        {currentAgent.graphic.type === 'reasoning' && (
                          <div className="graphic-block matrix-block">
                            {currentAgent.graphic.metrics.map((m, i) => (
                              <div key={i} className="matrix-row">
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
                          <div className="graphic-block eval-block">
                            {currentAgent.graphic.tests.map((t, i) => (
                              <div key={i} className="test-row">
                                <IoCheckmarkCircle className="check-icon" />
                                <span className="t-name">{t.name}</span>
                                <span className="t-detail">{t.detail}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {currentAgent.graphic.type === 'pr' && (
                          <div className="graphic-block pr-block">
                            <div className="pr-impact">{currentAgent.graphic.impact}</div>
                            <div className="pr-badge">{currentAgent.graphic.status}</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
