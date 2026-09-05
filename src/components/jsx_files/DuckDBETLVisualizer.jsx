import React, { useState, useEffect } from 'react';
import '../styling_files/agenticVisualizer.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoServerOutline, 
  IoCloudDownloadOutline, 
  IoHardwareChipOutline, 
  IoCodeSlashOutline, 
  IoAnalyticsOutline, 
  IoCheckmarkCircle
} from 'react-icons/io5';
import { 
  FiPlay, 
  FiPause, 
  FiRotateCcw, 
  FiChevronRight, 
  FiChevronLeft 
} from 'react-icons/fi';

const etlStepsData = [
  {
    id: 'extract',
    step: '01',
    name: 'Multi-Warehouse Extract',
    desc: 'Ingests parallel streaming batches from BigQuery, Amazon Redshift, and Supabase Postgres in zero-copy Apache Arrow format.',
    icon: <IoCloudDownloadOutline />,
    graphic: {
      type: 'code',
      title: 'ConnectorPipelines.py',
      code: `# Multi-Source Connection Pool\nbigquery_conn = bq.connect(dataset="events_db")\nredshift_conn = redshift.connect(cluster="analytics_prod")\nsupabase_conn = supabase.create_client(URL, KEY)\n\n# Streaming Arrow RecordBatches\narrow_stream = fetch_arrow_batches([bigquery_conn, redshift_conn, supabase_conn])`
    }
  },
  {
    id: 'duckdb_engine',
    step: '02',
    name: 'DuckDB Engine Load',
    desc: 'Instantiates DuckDB vectorized in-memory columnar engine for instant analytical query execution.',
    icon: <IoHardwareChipOutline />,
    graphic: {
      type: 'reasoning',
      title: 'In-Memory DuckDB Engine State',
      metrics: [
        { label: 'Execution Mode', val: 'Vectorized Columnar Execution' },
        { label: 'Memory Allocation', val: 'Direct RAM Buffer (Zero-Copy Arrow)' },
        { label: 'Processing Speed', val: '10,000,000+ rows / sec' },
        { label: 'Warehouse Latency', val: '< 45ms Total Scan Time' }
      ]
    }
  },
  {
    id: 'nlq_sql',
    step: '03',
    name: 'CodeLlama NLQ-to-SQL',
    desc: 'Meta CodeLlama-13B & t5-base translate natural language user questions into optimized DuckDB SQL queries.',
    icon: <IoCodeSlashOutline />,
    graphic: {
      type: 'code',
      title: 'NLQ2SQL_Synthesizer.py',
      code: `# Prompt: "Calculate 30-day user retention join across BigQuery events and Supabase profiles"\nsql_query = """\nSELECT s.user_id, count(b.event_id) AS active_events\nFROM read_parquet('bq_events/*.parquet') b\nJOIN read_csv('supabase_users.csv') s ON b.user_id = s.id\nWHERE b.timestamp >= NOW() - INTERVAL 30 DAY\nGROUP BY s.user_id;\n"""`
    }
  },
  {
    id: 'vector_exec',
    step: '04',
    name: 'Columnar Aggregations',
    desc: 'Executes high-speed parallel joins & aggregations, reducing cloud warehouse compute overhead by 85%.',
    icon: <IoAnalyticsOutline />,
    graphic: {
      type: 'eval',
      title: 'ETL Pipeline Benchmark Results',
      tests: [
        { name: 'BigQuery Scan Cost Saved', pass: true, detail: '85% Cost Reduction' },
        { name: 'Redshift Query Latency', pass: true, detail: 'Accelerated 12.4s ➔ 180ms' },
        { name: 'Supabase Sync Integrity', pass: true, detail: '100% Real-Time Parity' }
      ]
    }
  },
  {
    id: 'destination',
    step: '05',
    name: 'Target Materialization',
    desc: 'Streams aggregated analytical views directly into user-facing real-time dashboards and cache storage.',
    icon: <IoServerOutline />,
    graphic: {
      type: 'pr',
      title: 'Orchestrated Stream Dispatcher',
      impact: 'ETL Performance Acceleration: 10× - 100× Faster Queries',
      status: 'REAL-TIME SYNC COMPLETE'
    }
  }
];

export default function DuckDBETLVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

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
  const currentAgent = etlStepsData[activeAgentIndex];

  return (
    <div className="agentic-auto-canvas">
      {/* Header Block */}
      <div className="canvas-header-block">
        <div className="badge-pill">
          <span className="dot" style={{ background: '#3b82f6' }} />
          <span>DUCKDB + BIGQUERY + REDSHIFT + SUPABASE ETL</span>
        </div>
        <h2 className="main-headline">High-Efficiency Vectorized ETL Pipeline</h2>
        <p className="sub-headline">Auto-playing interactive execution visualizer • Click any step to inspect</p>
      </div>

      {/* Controls Bar */}
      <div className="pipeline-controls-bar">
        <div className="playback-buttons">
          <button className="ctrl-btn play-btn" onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <FiPause /> : <FiPlay />}
            <span>{isPlaying ? 'Pause' : (isOutroStep ? 'Replay' : 'Play')}</span>
          </button>
          <button className="ctrl-btn" onClick={handleRestart} title="Restart">
            <FiRotateCcw />
          </button>
          <div className="nav-step-group">
            <button className="ctrl-btn icon-only" onClick={handlePrevStep} disabled={currentStepIndex <= -1}>
              <FiChevronLeft />
            </button>
            <button className="ctrl-btn icon-only" onClick={handleNextStep} disabled={currentStepIndex >= 5}>
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
            Sources
          </button>
          {etlStepsData.map((ag, idx) => (
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
            Impact Summary
          </button>
        </div>
      </div>

      {/* Stage Viewport */}
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
              {/* Supervisor Node */}
              <AnimatePresence>
                {isSupervisorStep && (
                  <motion.div 
                    className="mother-supervisor-node"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="node-glow-ring" style={{ borderColor: 'rgba(59, 130, 246, 0.4)' }} />
                    <div className="mother-content">
                      <IoServerOutline className="mother-icon" style={{ color: '#60a5fa' }} />
                      <div className="mother-info">
                        <span className="m-label" style={{ color: '#60a5fa' }}>DATA ORCHESTRATOR NODE</span>
                        <span className="m-title">BigQuery + Redshift + Supabase ➔ DuckDB</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sub-Agent Nodes */}
              <motion.div 
                className="subagents-bare-pipeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {etlStepsData.map((agent, idx) => {
                  const isActive = currentStepIndex === idx;
                  const isDone = currentStepIndex > idx;

                  return (
                    <div 
                      key={agent.id}
                      className={`agent-bare-node ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                      onClick={() => handleSelectStep(idx)}
                      style={{ cursor: 'pointer' }}
                    >
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

                      <span className="agent-bare-name">{agent.name}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Output Window */}
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
                          {currentStepIndex === 4 ? 'PIPELINE DISPATCHED' : 'EXECUTING DUCKDB PIPELINE'}
                        </span>
                      </div>

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
                                <span className="val" style={{ color: '#60a5fa' }}>{m.val}</span>
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
                            <div className="pr-impact-highlight" style={{ color: '#60a5fa' }}>{currentAgent.graphic.impact}</div>
                            <div className="pr-badge-status" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }}>{currentAgent.graphic.status}</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="outro-stage"
              className="outro-impact-view"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="outro-impact-card">
                <IoCheckmarkCircle className="success-badge-icon" style={{ color: '#60a5fa' }} />
                <span className="outro-eyebrow" style={{ color: '#60a5fa' }}>VECTORIZED DUCKDB ETL PIPELINE RUN COMPLETE</span>
                <h3 className="outro-heading">Multi-Warehouse Analytical Feeds Synchronized</h3>
                <p className="outro-summary">
                  Aggregated multi-million row datasets from BigQuery, Redshift, and Supabase using in-memory DuckDB and Meta CodeLlama-13B NLQ-to-SQL synthesis.
                </p>

                <div className="metrics-tri-grid">
                  <div className="metric-box">
                    <span className="metric-value">10× – 100×</span>
                    <span className="metric-label">ETL Query Speedup</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-value">85% Saved</span>
                    <span className="metric-label">Warehouse Compute Cost</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-value">&lt; 45ms</span>
                    <span className="metric-label">DuckDB Scan Latency</span>
                  </div>
                </div>

                <div className="outro-action-row">
                  <button className="replay-outro-btn" onClick={handleRestart}>
                    <FiRotateCcw />
                    <span>Replay ETL Pipeline Animation</span>
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
