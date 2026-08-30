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
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  
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

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // TODO: Paste your Formspree endpoint URL here!
    const formspreeEndpoint = "https://formspree.io/f/mrpgezpv"; 

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email: senderEmail, subject, message })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setSenderEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setSubmitStatus(null), 5000); // clear success message after 5s
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
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
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  required
                />
              </div>
            </div>

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

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              {!isSubmitting && <IoPaperPlaneOutline />}
            </button>

            {submitStatus === 'success' && (
              <div className="form-status success">Message sent successfully! I'll get back to you soon.</div>
            )}
            {submitStatus === 'error' && (
              <div className="form-status error">Oops! Something went wrong. Please try again.</div>
            )}
          </form>
        </div>
      </div>
    </Box>
  );
}