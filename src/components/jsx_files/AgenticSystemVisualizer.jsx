import React, { useRef } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  IoGitNetworkOutline, 
  IoSearchOutline, 
  IoHardwareChipOutline, 
  IoCodeSlashOutline, 
  IoFlaskOutline, 
  IoShieldCheckmarkOutline 
} from 'react-icons/io5';

const agentNodes = [
  {
    id: 'explorer',
    step: '01',
    name: 'Code Explorer Agent',
    role: 'AST & Call-Graph Localizer',
    detail: 'Traverses 2,400+ files ➔ Fault isolated at SyncPipeline.ts:142',
    icon: <IoSearchOutline />
  },
  {
    id: 'reasoner',
    name: 'Reasoning Engine',
    step: '02',
    role: 'Root Cause Inference',
    detail: 'Inferred unhandled null payload during async event dispatch',
    icon: <IoHardwareChipOutline />
  },
  {
    id: 'patcher',
    name: 'Patch Synthesizer',
    step: '03',
    role: 'LLM Fix & Test Generator',
    detail: 'Synthesized 1-line null-guard patch + unit test spec',
    icon: <IoCodeSlashOutline />
  },
  {
    id: 'tester',
    name: 'Eval & Safety Runner',
    step: '04',
    role: 'Automated Regression Evals',
    detail: '100% test pass rate across microservice ecosystem',
    icon: <IoFlaskOutline />
  },
  {
    id: 'dispatch',
    name: 'Human Checkpoint',
    step: '05',
    role: 'GitHub PR Dispatch',
    detail: 'SDE Approved ➔ Dispatched PR #392 (Triage 5h ➔ 20m)',
    icon: <IoShieldCheckmarkOutline />
  }
];

export default function AgenticSystemVisualizer() {
  const targetRef = useRef(null);
  
  // Track scroll progress within this specific section container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const pathLength = useTransform(smoothProgress, [0.15, 0.85], [0, 1]);

  return (
    <div className="workos-agentic-flow" ref={targetRef}>
      {/* Section Header */}
      <div className="flow-header">
        <span className="flow-badge">WORKOS-STYLE SYSTEM ARCHITECTURE</span>
        <h3 className="flow-title">LangGraph Multi-Agent Fault Localization</h3>
        <p className="flow-subtitle">
          Scroll to simulate real-time agent spawning, fault localization, and automated PR generation.
        </p>
      </div>

      {/* Bare Background Vector Canvas */}
      <div className="flow-canvas-container">
        {/* Supervisor Hub */}
        <motion.div 
          className="supervisor-hub-node"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="hub-pulse-ring" />
          <div className="hub-icon-box">
            <IoGitNetworkOutline />
          </div>
          <div className="hub-text">
            <span className="hub-label">LANGGRAPH SUPERVISOR</span>
            <span className="hub-status">Multi-Agent Orchestrator</span>
          </div>
        </motion.div>

        {/* Scroll-Driven Connecting Beam Path */}
        <div className="flow-connecting-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="flow-svg">
            <line x1="50" y1="0" x2="50" y2="100" className="base-line" />
            <motion.line 
              x1="50" 
              y1="0" 
              x2="50" 
              y2="100" 
              className="active-beam" 
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Dynamic Nodes Rendered Directly on Bare Background */}
        <div className="flow-nodes-list">
          {agentNodes.map((node, index) => (
            <motion.div 
              key={node.id} 
              className="bare-flow-row"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Left Side: Step & Icon */}
              <div className="row-left">
                <span className="step-num">{node.step}</span>
                <div className="node-icon-circle">
                  {node.icon}
                </div>
              </div>

              {/* Node Main Content */}
              <div className="row-content">
                <div className="content-top">
                  <h4 className="node-name">{node.name}</h4>
                  <span className="node-role">{node.role}</span>
                </div>
                <p className="node-detail">{node.detail}</p>
              </div>

              {/* Status Indicator */}
              <div className="row-right">
                <span className="live-dot" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Metric Callout Bar */}
      <div className="flow-metrics-bar">
        <div className="metric-pill">
          <span className="val">5 hrs ➔ 20 min</span>
          <span className="lbl">Bug Triage Speedup</span>
        </div>
        <div className="metric-pill">
          <span className="val">23+ Tickets</span>
          <span className="lbl">Auto-Localized & Fixed</span>
        </div>
        <div className="metric-pill">
          <span className="val">100% Guarded</span>
          <span className="lbl">Human Checkpoint Approvals</span>
        </div>
      </div>
    </div>
  );
}
