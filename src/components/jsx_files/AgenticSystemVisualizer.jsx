import React, { useState } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { 
  IoPlayOutline, 
  IoBugOutline, 
  IoSearchOutline, 
  IoCodeSlashOutline, 
  IoShieldCheckmarkOutline, 
  IoGitPullRequestOutline 
} from 'react-icons/io5';

const agentNodes = [
  {
    id: 1,
    step: 'Node 01',
    label: 'Jira Stack Trace Ingestion',
    subtext: 'Parser & AST Extractor',
    icon: <IoBugOutline />,
    logs: [
      { text: '[Ingress] Ingested Jira Ticket #COMM-8492 with Java/Node.js stack trace.', prefix: 'INPUT' },
      { text: 'Extracted target symbols: SyncPipeline.ts:142 and KafkaConsumer.java:88', highlight: 'SyncPipeline.ts:142' }
    ]
  },
  {
    id: 2,
    step: 'Node 02',
    label: 'Lexical & Call-Graph Search',
    subtext: 'AST Fault Localization',
    icon: <IoSearchOutline />,
    logs: [
      { text: '[LangGraph Agent 1] Traversed codebase dependency graph (2,400+ files).', prefix: 'SEARCH' },
      { text: 'Localized root cause: Unhandled null payload in async event dispatcher.', metric: '98% confidence' }
    ]
  },
  {
    id: 3,
    step: 'Node 03',
    label: 'Candidate Fix Synthesizer',
    subtext: 'LLM Patch & Test Generator',
    icon: <IoCodeSlashOutline />,
    logs: [
      { text: '[LangGraph Agent 2] Synthesized 1-line null-guard patch + Jest test case.', prefix: 'GENERATE' },
      { text: 'Generated patch: if (!event?.payload) return await handleRetry(event);', highlight: 'null-guard' }
    ]
  },
  {
    id: 4,
    step: 'Node 04',
    label: 'Eval & Guardrails Check',
    subtext: 'Regression & Safety Evals',
    icon: <IoShieldCheckmarkOutline />,
    logs: [
      { text: '[Guardrails] Running regression eval suite across 50+ microservices...', prefix: 'EVAL' },
      { text: 'Eval Results: 100% test pass rate, 0 breaking API changes.', metric: 'PASSED' }
    ]
  },
  {
    id: 5,
    step: 'Node 05',
    label: 'Human Checkpoint & PR',
    subtext: 'GitHub PR Dispatch',
    icon: <IoGitPullRequestOutline />,
    logs: [
      { text: '[Checkpoint] Human approval checkpoint reached. SDE reviewer approved.', prefix: 'DISPATCH' },
      { text: 'SUCCESS: Opened GitHub PR #392 behind approval checkpoint!', metric: 'Triage 5 hrs ➔ 20 min' }
    ]
  }
];

export default function AgenticSystemVisualizer() {
  const [activeStep, setActiveStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState(agentNodes[0].logs);

  const selectNode = (nodeId) => {
    if (isSimulating) return;
    setActiveStep(nodeId);
    const node = agentNodes.find(n => n.id === nodeId);
    if (node) setConsoleLogs(node.logs);
  };

  const handleSimulateTriage = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);
    setConsoleLogs([agentNodes[0].logs[0]]);

    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current <= agentNodes.length) {
        setActiveStep(current);
        const node = agentNodes.find(n => n.id === current);
        if (node) {
          setConsoleLogs(prev => [...prev, ...node.logs]);
        }
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  return (
    <div className="agentic-visualizer-container">
      {/* Header & Simulation Action */}
      <div className="visualizer-header">
        <div className="header-info">
          <span className="header-tag">Interactive Architecture Flex</span>
          <h3 className="header-title">LangGraph Multi-Agent Fault Localization</h3>
        </div>

        <div className="header-actions">
          <button 
            className="simulate-btn"
            onClick={handleSimulateTriage}
            disabled={isSimulating}
          >
            <IoPlayOutline className="play-icon" />
            <span>{isSimulating ? 'Simulating Agentic Pipeline...' : 'Simulate Ticket Triage Run'}</span>
          </button>
        </div>
      </div>

      {/* 5-Node Interactive Grid */}
      <div className="visualizer-nodes-grid">
        {agentNodes.map(node => (
          <div 
            key={node.id}
            className={`agent-node-card ${activeStep === node.id ? 'active' : ''} ${activeStep === node.id ? 'selected' : ''}`}
            onClick={() => selectNode(node.id)}
          >
            <span className="node-step-badge">{node.step}</span>
            <div className="node-icon-wrapper">
              {node.icon}
            </div>
            <h4 className="node-label">{node.label}</h4>
            <span className="node-subtext">{node.subtext}</span>
          </div>
        ))}
      </div>

      {/* Live Agent Console */}
      <div className="visualizer-console">
        <div className="console-bar">
          <div className="console-dots">
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <span className="console-title">Live Agent Execution Output (Node 0{activeStep})</span>
        </div>

        <div className="console-logs">
          {consoleLogs.map((log, index) => (
            <div key={index} className={`log-line ${log.metric === 'Triage 5 hrs ➔ 20 min' ? 'log-success' : ''}`}>
              {log.prefix && <span className="log-prefix">[{log.prefix}]</span>}
              <span>{log.text}</span>
              {log.highlight && <span className="log-highlight"> ({log.highlight})</span>}
              {log.metric && <span className="log-metric"> [{log.metric}]</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics Summary */}
      <div className="visualizer-impact-metrics">
        <div className="metric-card">
          <div className="metric-num">5 hrs ➔ 20 min</div>
          <div className="metric-label">Bug Triage-to-PR Speedup</div>
        </div>
        <div className="metric-card">
          <div className="metric-num">23+ Tickets</div>
          <div className="metric-label">Auto-Localized & Fixed</div>
        </div>
        <div className="metric-card">
          <div className="metric-num">100% Human Checkpoints</div>
          <div className="metric-label">Zero Unguarded PR Dispatches</div>
        </div>
      </div>
    </div>
  );
}
