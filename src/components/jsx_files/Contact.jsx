import React, { useState } from 'react';
import "../styling_files/contact.scss";
import { Box, Text } from "@chakra-ui/react";
import { 
  IoMailOutline, 
  IoCopyOutline, 
  IoCheckmarkOutline, 
  IoLogoGithub, 
  IoLogoLinkedin, 
  IoCodeSlashOutline,
  IoPaperPlaneOutline
} from "react-icons/io5";

export default function Contact() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const email = "banerjeeaviroop01@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <Box className="contact-compact-container">
      {/* Section Title Header */}
      <Box className="contact-header">
        <Text className="section-title">
          Let's Build Together
        </Text>
        <Text className="contact-description">
          Open for full-time software engineering roles, AI agent architecture, and backend systems collaboration.
        </Text>
      </Box>

      {/* 2-Column Compact Layout (Fits screen without scrolling) */}
      <Box className="contact-content-grid">
        {/* Left Column: Direct Mail & Social Cards */}
        <Box className="left-info-column">
          {/* Direct Email Box */}
          <Box className="email-action-card">
            <Box className="card-top">
              <Box className="card-icon-box">
                <IoMailOutline />
              </Box>
              <Box className="card-text">
                <Text className="card-label">DIRECT EMAIL</Text>
                <Text className="card-email">{email}</Text>
              </Box>
            </Box>
            <Box className="card-btns">
              <a 
                href={`mailto:${email}`} 
                className="compact-btn primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mail
              </a>
              <button 
                onClick={copyToClipboard}
                className={`compact-btn ${copySuccess ? 'copied' : ''}`}
                title="Copy Email"
              >
                {copySuccess ? <IoCheckmarkOutline /> : <IoCopyOutline />}
              </button>
            </Box>
          </Box>

          {/* Social Links Row */}
          <Box className="social-links-row">
            <a 
              href="https://github.com/Aviroop-001" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-compact-badge"
              title="GitHub"
            >
              <IoLogoGithub className="social-icon" />
              <span>GitHub</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/aviroopbanerjee/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-compact-badge"
              title="LinkedIn"
            >
              <IoLogoLinkedin className="social-icon" />
              <span>LinkedIn</span>
            </a>

            <a 
              href="https://leetcode.com/Aviroop_01/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-compact-badge"
              title="LeetCode"
            >
              <IoCodeSlashOutline className="social-icon" />
              <span>LeetCode</span>
            </a>
          </Box>
        </Box>

        {/* Right Column: Compact Message Box */}
        <Box className="right-form-column">
          <Box className="compact-console-box">
            <Box className="console-header">
              <span className="console-dot dot-red" />
              <span className="console-dot dot-yellow" />
              <span className="console-dot dot-green" />
              <span className="console-title">send_message.sh</span>
            </Box>

            <form onSubmit={handleSendEmail} className="console-form">
              <Box className="form-group">
                <label className="form-label">SUBJECT</label>
                <input 
                  type="text" 
                  placeholder="Role Inquiry / Systems Project"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-input"
                />
              </Box>

              <Box className="form-group">
                <label className="form-label">MESSAGE</label>
                <textarea 
                  rows={3}
                  placeholder="Your message details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </Box>

              <button type="submit" className="send-message-btn">
                <IoPaperPlaneOutline className="btn-icon" />
                <span>SEND VIA EMAIL CLIENT</span>
              </button>
            </form>
          </Box>
        </Box>
      </Box>

      {/* Toast Notification */}
      {copySuccess && (
        <Box className="toast-pill">
          <IoCheckmarkOutline />
          <span>Email copied to clipboard!</span>
        </Box>
      )}
    </Box>
  );
}