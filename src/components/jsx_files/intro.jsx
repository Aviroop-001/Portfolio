import "../styling_files/intro.scss";
import { useEffect, useState } from "react";
import { 
  IoEyeOutline, 
  IoDownloadOutline,
  IoSparkles
} from 'react-icons/io5';
import { Box, Text } from "@chakra-ui/react";
import { companiesData } from "./Data.js";

export default function Intro() {
    const [showResumeModal, setShowResumeModal] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && showResumeModal) {
                setShowResumeModal(false);
            }
        };

        if (showResumeModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showResumeModal]);

    return (
      <Box className="intro-hero-container">
        {/* Hero Title & Bio */}
        <Box className="hero-content">
          <Text className="name-text">
            Aviroop Banerjee
          </Text>

          <Text className="title-tagline">
            Software Engineer
          </Text>

          <Text className="subtitle-text">
            Software Engineer with <strong>2+ years of experience</strong> building AI agents, LLM systems, distributed backend infrastructure, and platform-level software.
          </Text>

          {/* CTA Action Buttons */}
          <Box className="cta-buttons">
            <a
              href="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link"
              className="glass-button primary-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoDownloadOutline className="button-icon" />
              <span>DOWNLOAD RESUME</span>
            </a>
            
            <button
              onClick={() => setShowResumeModal(true)}
              className="glass-button preview-button"
            >
              <IoEyeOutline className="button-icon" />
              <span>PREVIEW RESUME</span>
            </button>
          </Box>

          {/* Worked at the Best Section */}
          <Box className="worked-at-section">
            <Box className="worked-at-header">
              <IoSparkles className="sparkle-icon" />
              <Text className="worked-at-title">WORKED AT THE BEST</Text>
            </Box>
            
            <Box className="companies-marquee">
              <Box className="marquee-content">
                {companiesData.map((company, index) => (
                  <Box key={index} className="company-logo-badge" title={company.name}>
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="company-logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-flex';
                      }}
                    />
                    <span className="company-fallback-icon" style={{ display: 'none' }}>
                      {company.icon || '💼'} {company.fallbackText}
                    </span>
                  </Box>
                ))}
                {/* Duplicate for smooth continuous marquee scroll */}
                {companiesData.map((company, index) => (
                  <Box key={`dup-${index}`} className="company-logo-badge" title={company.name}>
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="company-logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-flex';
                      }}
                    />
                    <span className="company-fallback-icon" style={{ display: 'none' }}>
                      {company.icon || '💼'} {company.fallbackText}
                    </span>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Full-Screen macOS Glass Resume Preview Modal */}
        {showResumeModal && (
          <Box className="resume-modal-overlay" onClick={() => setShowResumeModal(false)}>
            <Box className="resume-modal-card" onClick={(e) => e.stopPropagation()}>
              <Box className="resume-modal-header">
                <Box className="window-dots">
                  <span className="dot dot-red" onClick={() => setShowResumeModal(false)} />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </Box>
                <Text className="modal-title">📄 avi-os / resume_preview.pdf</Text>
                <button 
                  className="close-btn"
                  onClick={() => setShowResumeModal(false)}
                >
                  ✕
                </button>
              </Box>
              <Box className="resume-modal-body">
                <iframe
                  src="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/preview"
                  width="100%"
                  height="100%"
                  title="Aviroop Banerjee Resume Preview"
                  frameBorder="0"
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
}
