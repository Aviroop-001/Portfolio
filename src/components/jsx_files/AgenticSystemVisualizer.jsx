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
  IoAlertCircleOutline
} from 'react-icons/io5';

const subAgentsData = [
  {
    id: 'explorer',
    step: '01',
    name: 'Code Explorer Agent',
    role: 'AST & Call-Graph Search',
    status: 'FAULT ISOLATED',
    icon: <IoSearchOutline />,
    graphic: {
      type: 'code',
      title: 'SyncPipeline.ts',
      code: `140  const dispatchEvent = async (event) => {\n141    // AST Fault Localized (Confidence: 98%)\n142    if (!event.payload) throw new NullError();\n143  }`,
      highlightLine: 142
    }
  },
  {
    id: 'reasoner',
    step: '02',
    name: 'Reasoning Engine',
    role: 'Root Cause Inference',
    status: 'INFERRED',
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
    status: 'PATCH SYNTHESIZED',
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
    status: 'EVALS PASSED',
    icon: <IoFlaskOutline />,
    graphic: {
      type: 'eval',
      title: 'Automated Safety Suite',
      tests: [
        { name: 'Unit Test Coverage', pass: true, detail: '100% Passed' },
        { name: 'API Regression Guard', pass: true, detail: '0 Breaking Changes' },
        { name: 'Faithfulness & Safety Score', pass: true, detail: '1.0 Score' }
      ]
    }
  },
  {
    id: 'dispatch',
    step: '05',
    name: 'Human Checkpoint',
    role: 'GitHub PR Dispatch',
    status: 'PR MERGED',
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

  // 350vh long pin scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 22 });

  // Phase 1: Mother agent idle -> spawn transition (0.0 to 0.15)
  const isSpawned = useTransform(smoothProgress, [0.0, 0.12], [false, true]);

  // Phase 2: Active step index across the 5 sub-agents (0.15 to 0.95)
  const activeStepIndexTransform = useTransform(smoothProgress, [0.15, 0.32, 0.50, 0.68, 0.88], [0, 1, 2, 3, 4]);

  const [hasSpawned, setHasSpawned] = React.useState(false);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubSpawn = isSpawned.on("change", (latest) => {
      setHasSpawned(latest);
    });
    const unsubStep = activeStepIndexTransform.on("change", (latest) => {
      const rounded = Math.min(Math.max(Math.round(latest), 0), subAgentsData.length - 1);
      setCurrentStepIndex(rounded);
    });
    return () => {
      unsubSpawn();
      unsubStep();
    };
  }, [isSpawned, activeStepIndexTransform]);

  const currentAgent = subAgentsData[currentStepIndex];

  return (
    <div className="mother-agent-pin-container" ref={containerRef}>
      {/* Sticky Fullscreen Interactive Canvas */}
      <div className="mother-sticky-canvas">
        
        {/* Top Header */}
        <div className="canvas-header">
          <h3 className="system-title">LangGraph Multi-Agent Fault Localization</h3>
          <p className="system-subtitle">
            {hasSpawned 
              ? "Scroll to watch spawned sub-agents execute AST search, patch generation, and PR dispatch."
              : "Scroll down to spawn specialized sub-agent workers from Supervisor..."}
          </p>
        </div>

        {/* Phase 1: Standalone Mother Agent Idle Card (Before Spawn) */}
        {!hasSpawned ? (
          <motion.div 
            className="mother-idle-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mother-core-avatar">
              <div className="pulse-ring" />
              <IoGitNetworkOutline className="core-icon" />
            </div>
            <div className="mother-meta">
              <span className="mother-badge">SUPERVISOR NODE</span>
              <h4 className="mother-name">LangGraph Mother Agent</h4>
              <p className="mother-status">
                <IoAlertCircleOutline className="status-alert" />
                Ingested Jira Ticket #COMM-8492 — Awaiting Sub-Agent Dispatch...
              </p>
            </div>
            <div className="scroll-hint-bar">
              <span className="hint-arrow">↓</span> Scroll to Spawn Worker Sub-Agents
            </div>
          </motion.div>
        ) : (
          /* Phase 2: Active Orchestration Stage (Spawned Sub-Agents & Execution Canvas) */
          <motion.div 
            className="mother-spawned-stage"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Bar: Mother Supervisor Controller */}
            <div className="mother-controller-bar">
              <div className="mother-pill">
                <IoGitNetworkOutline className="pill-icon" />
                <span>SUPERVISOR: Active</span>
              </div>
              <div className="spawning-indicator">
                <span className="live-dot" />
                <span>5 Sub-Agents Spawned & Executing</span>
              </div>
            </div>

            {/* Main 2-Column Stage */}
            <div className="stage-grid">
              {/* Left Column: Radial/Tree Hub of Spawned Workers */}
              <div className="sub-agents-tree-col">
                {subAgentsData.map((agent, idx) => {
                  const isActive = currentStepIndex === idx;
                  const isDone = currentStepIndex > idx;
                  return (
                    <motion.div 
                      key={agent.id} 
                      className={`spawned-agent-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                      animate={{ scale: isActive ? 1.03 : 1, x: isActive ? 6 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="node-icon-box">
                        {isDone ? <IoCheckmarkCircle className="done-icon" /> : agent.icon}
                      </div>

                      <div className="node-info">
                        <div className="node-title-row">
                          <span className="node-step">{agent.step}</span>
                          <h5 className="node-title">{agent.name}</h5>
                        </div>
                        <span className="node-role">{agent.role}</span>
                      </div>

                      <div className="node-status-badge">
                        {isDone ? 'COMPLETED' : isActive ? 'EXECUTING...' : 'QUEUED'}
                      </div>

                      {/* Connecting Line to next node */}
                      {idx < subAgentsData.length - 1 && (
                        <div className={`tree-connector-line ${isDone ? 'active' : ''}`} />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Active Sub-Agent Workspace & Live Graphic Output */}
              <div className="active-subagent-workspace">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentAgent.id}
                    className="subagent-execution-card"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Execution Window Bar */}
                    <div className="window-header">
                      <div className="window-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <span className="window-title">
                        {currentAgent.name} ➔ {currentAgent.graphic.title}
                      </span>
                    </div>

                    {/* Window Content Body */}
                    <div className="window-body">
                      <p className="agent-action-desc">{currentAgent.desc}</p>

                      {/* Code Preview */}
                      {currentAgent.graphic.type === 'code' && (
                        <div className="graphic-block code-block">
                          <pre><code>{currentAgent.graphic.code}</code></pre>
                        </div>
                      )}

                      {/* Reasoning Matrix */}
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

                      {/* Diff Patch */}
                      {currentAgent.graphic.type === 'diff' && (
                        <div className="graphic-block diff-block">
                          {currentAgent.graphic.diff.map((d, i) => (
                            <div key={i} className={`diff-line ${d.type}`}>
                              {d.line}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Safety Evals */}
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

                      {/* PR Dispatch */}
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

      </div>
    </div>
  );
}
