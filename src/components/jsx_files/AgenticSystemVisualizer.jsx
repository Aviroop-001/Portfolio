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
  IoCheckmarkCircle
} from 'react-icons/io5';

const agentSteps = [
  {
    id: 'step-1',
    step: '01',
    name: 'Code Explorer Agent',
    role: 'AST & Call-Graph Search',
    desc: 'Scans dependency graph & stack trace to pinpoint exact failure line.',
    icon: <IoSearchOutline />,
    graphic: {
      type: 'code',
      title: 'SyncPipeline.ts',
      code: `140  const dispatchEvent = async (event) => {\n141    // AST Fault Localized (Confidence: 98%)\n142    if (!event.payload) throw new NullError();\n143  }`,
      highlightLine: 142
    }
  },
  {
    id: 'step-2',
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
    id: 'step-3',
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
    id: 'step-4',
    step: '04',
    name: 'Eval & Safety Runner',
    role: 'Regression Testing',
    desc: 'Executes automated eval suite across 50+ microservice endpoints.',
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
    id: 'step-5',
    step: '05',
    name: 'Human Checkpoint & PR',
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

  // Apple-style tall scroll pin
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const progressHeight = useTransform(smoothProgress, [0.05, 0.95], ["0%", "100%"]);
  
  // Transform scroll progress into active step index (0 to 4)
  const activeIndex = useTransform(smoothProgress, [0.05, 0.25, 0.5, 0.72, 0.95], [0, 1, 2, 3, 4]);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest) => {
      const rounded = Math.min(Math.max(Math.round(latest), 0), agentSteps.length - 1);
      setCurrentStepIndex(rounded);
    });
    return () => unsubscribe();
  }, [activeIndex]);

  const currentStep = agentSteps[currentStepIndex];

  return (
    <div className="apple-agentic-pin-container" ref={containerRef}>
      {/* Sticky Fullscreen Canvas */}
      <div className="apple-sticky-canvas">
        {/* Title Header */}
        <div className="apple-header">
          <div className="supervisor-pill">
            <IoGitNetworkOutline className="hub-icon" />
            <span>LANGGRAPH SUPERVISOR</span>
          </div>
          <h3 className="apple-title">Multi-Agent Fault Localization Pipeline</h3>
          <p className="apple-subtitle">Scroll down to experience real-time sub-agent execution & verification.</p>
        </div>

        {/* Apple 2-Column Interactive Stage */}
        <div className="apple-stage-grid">
          {/* Left Column: Vertical Timeline & Step Progress */}
          <div className="timeline-column">
            <div className="timeline-track">
              <motion.div className="timeline-progress-bar" style={{ height: progressHeight }} />
            </div>

            <div className="steps-list">
              {agentSteps.map((step, idx) => {
                const isActive = currentStepIndex === idx;
                return (
                  <div key={step.id} className={`step-item ${isActive ? 'active' : ''}`}>
                    <span className="step-num">{step.step}</span>
                    <div className="step-text">
                      <h4 className="step-name">{step.name}</h4>
                      <span className="step-role">{step.role}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Apple Visual Preview Stage */}
          <div className="preview-stage-column">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep.id}
                className="apple-preview-card"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-header">
                  <div className="window-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="card-type-title">{currentStep.graphic.title}</span>
                </div>

                <div className="card-body">
                  <p className="step-desc-text">{currentStep.desc}</p>

                  {/* Render Graphic Preview based on step type */}
                  {currentStep.graphic.type === 'code' && (
                    <div className="code-preview-block">
                      <pre><code>{currentStep.graphic.code}</code></pre>
                    </div>
                  )}

                  {currentStep.graphic.type === 'reasoning' && (
                    <div className="matrix-preview-block">
                      {currentStep.graphic.metrics.map((m, i) => (
                        <div key={i} className="matrix-row">
                          <span className="lbl">{m.label}:</span>
                          <span className="val">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentStep.graphic.type === 'diff' && (
                    <div className="diff-preview-block">
                      {currentStep.graphic.diff.map((d, i) => (
                        <div key={i} className={`diff-line ${d.type}`}>
                          {d.line}
                        </div>
                      ))}
                    </div>
                  )}

                  {currentStep.graphic.type === 'eval' && (
                    <div className="eval-preview-block">
                      {currentStep.graphic.tests.map((t, i) => (
                        <div key={i} className="test-row">
                          <IoCheckmarkCircle className="check-icon" />
                          <span className="t-name">{t.name}</span>
                          <span className="t-detail">{t.detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentStep.graphic.type === 'pr' && (
                    <div className="pr-preview-block">
                      <div className="pr-impact-tag">{currentStep.graphic.impact}</div>
                      <div className="pr-status-badge">{currentStep.graphic.status}</div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
