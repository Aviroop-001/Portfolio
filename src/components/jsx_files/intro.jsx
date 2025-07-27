import "../styling_files/intro.scss"
import {FaChevronDown} from "react-icons/fa";
import { init } from "ityped";
import { useEffect, useRef, useState } from "react";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";
import {RiLinkedinLine} from "react-icons/ri"
import {VscGithubAlt} from 'react-icons/vsc'
import {SlSocialTwitter} from 'react-icons/sl'
import {SiLeetcode} from 'react-icons/si'
import {AiOutlineDown} from 'react-icons/ai'
import {IoEyeOutline, IoCloseOutline, IoDownloadOutline, IoCopyOutline, IoCheckmarkOutline, IoLinkOutline} from 'react-icons/io5'
import { Box, Text } from "@chakra-ui/react";
import { companiesData } from "./Data.js";

export default function Intro() {
    // State for resume preview modal
    const [showResumeModal, setShowResumeModal] = useState(false);
    
    // State for copy functionality
    const [emailCopied, setEmailCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    
    // Magnetic effect refs
    const downloadButtonRef = useMagneticEffect(0.2);
    const previewButtonRef = useMagneticEffect(0.2);
    const linkedinRef = useMagneticEffect(0.3);
    const githubRef = useMagneticEffect(0.3);
    const leetcodeRef = useMagneticEffect(0.3);
    const emailCopyRef = useMagneticEffect(0.2);
    const linkCopyRef = useMagneticEffect(0.2);

    // Copy functions
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText('banerjeeaviroop01@gmail.com');
            setEmailCopied(true);
            setTimeout(() => setEmailCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const copyWebsiteLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && showResumeModal) {
                setShowResumeModal(false);
            }
        };

        if (showResumeModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showResumeModal]);

    // const  textRef = useRef();
    // useEffect(() => {
    //     init(textRef.current, {
    //       showCursor: true,
    //       backDelay: 1000,
    //       backSpeed: 30,
    //       strings: [
    //         "Backend Developer",
    //         "Frontend Developer",
    //         "MERN Fullstack Developer",
    //         "Problem Solver",
    //       ],
    //     });
        
    // }, [])

    return (
      <Box
        className="intro"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        position="relative"
        overflow="hidden"
      >




        {/* Main Glass Card */}
        <Box className="glass-card" maxWidth="800px" width="90%" padding={["2rem", "3rem"]} textAlign="center">
          {/* Quick Copy Buttons */}
          <Box className="quick-copy-buttons">
            <button
              onClick={copyEmail}
              className={`copy-button ${emailCopied ? 'copied' : ''}`}
              ref={emailCopyRef}
              title="Copy Email"
            >
              {emailCopied ? <IoCheckmarkOutline /> : <IoCopyOutline />}
              <span className="button-text">Email</span>
            </button>
            <button
              onClick={copyWebsiteLink}
              className={`copy-button ${linkCopied ? 'copied' : ''}`}
              ref={linkCopyRef}
              title="Copy Website Link"
            >
              {linkCopied ? <IoCheckmarkOutline /> : <IoLinkOutline />}
              <span className="button-text">Website</span>
            </button>
          </Box>

          {/* Social Links */}
          <Box className="social-links">
            <a href="https://github.com/Aviroop-001" target="_blank" rel="noopener noreferrer" className="social-link" ref={githubRef}>
              <VscGithubAlt />
            </a>
            <a href="https://www.linkedin.com/in/aviroopbanerjee/" target="_blank" rel="noopener noreferrer" className="social-link" ref={linkedinRef}>
              <RiLinkedinLine />
            </a>
            <a href="https://leetcode.com/Aviroop_01/" target="_blank" rel="noopener noreferrer" className="social-link" ref={leetcodeRef}>
              <SiLeetcode />
            </a>
          </Box>
          
          <Box className="hero-content">
            <Text className="name-text">
              Aviroop Banerjee
            </Text>
            <Text className="subtitle-text">
              Software Engineer with 1+ years of experience and a passion for building scalable and efficient systems.
            </Text>

            {/* CTA Buttons */}
            <Box className="cta-buttons">
              <a
                href="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link"
                className="glass-button"
                target="_blank"
                rel="noopener noreferrer"
                ref={downloadButtonRef}
              >
                <IoDownloadOutline className="button-icon" />
                <span>Download Resume</span>
                <Box className="button-shimmer" />
              </a>
              
              <button
                onClick={() => setShowResumeModal(true)}
                className="glass-button preview-button"
                ref={previewButtonRef}
              >
                <IoEyeOutline className="button-icon" />
                <span>Preview Resume</span>
                <Box className="button-shimmer" />
              </button>
            </Box>

            {/* Worked at the Best Section */}
            <Box className="worked-at-section">
              <Text className="worked-at-title">Worked at the best</Text>
              <Box className="companies-marquee">
                <Box className="marquee-content">
                  {companiesData.map((company, index) => (
                    <Box key={index} className="company-item">
                      <img src={company.logo} alt={company.name} className="company-logo" />
                      <span className="company-name">{company.name}</span>
                    </Box>
                  ))}
                  {/* Duplicate for continuous scroll */}
                  {companiesData.map((company, index) => (
                    <Box key={`duplicate-${index}`} className="company-item">
                      <img src={company.logo} alt={company.name} className="company-logo" />
                      <span className="company-name">{company.name}</span>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <Box className="scroll-indicator">
          <AiOutlineDown className="scroll-arrow" />
          <Text className="scroll-text">Scroll to explore</Text>
        </Box>

        {/* Resume Preview Modal */}
        {showResumeModal && (
          <Box className="resume-modal-overlay" onClick={() => setShowResumeModal(false)}>
            <Box className="resume-modal" onClick={(e) => e.stopPropagation()}>
              <Box className="modal-header">
                <Text className="modal-title">Resume Preview</Text>
                <button 
                  className="modal-close"
                  onClick={() => setShowResumeModal(false)}
                >
                  <IoCloseOutline />
                </button>
              </Box>
              <Box className="modal-content">
                <iframe
                  src="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/preview"
          width="100%"
                  height="100%"
                  title="Resume Preview"
                  frameBorder="0"
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
}
