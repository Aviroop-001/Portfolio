import React, { useState } from 'react';
import "../styling_files/contact.scss";
import { Box } from "@chakra-ui/react";
import { 
  IoMailOutline, 
  IoCheckmarkOutline, 
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
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <Box className="contact-modern-container">
      <div className="contact-grid">
        {/* Left Column: Info */}
        <div className="contact-info-card">
          <h3 className="card-title">Let's connect</h3>
          <p className="card-desc">
            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="email-box" onClick={copyToClipboard}>
            <div className="email-icon">
              <IoMailOutline />
            </div>
            <div className="email-text">
              <span className="label">Email me at</span>
              <span className="address">{email}</span>
            </div>
            {copySuccess && <span className="copy-badge"><IoCheckmarkOutline /> Copied</span>}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form-card">
          <form onSubmit={handleSendEmail} className="modern-form">
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                placeholder="What's this regarding?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                rows={4}
                placeholder="Tell me a bit more..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              <span>Send Message</span>
              <IoPaperPlaneOutline />
            </button>
          </form>
        </div>
      </div>
    </Box>
  );
}