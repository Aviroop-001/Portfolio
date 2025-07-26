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
import {IoEyeOutline, IoCloseOutline, IoDownloadOutline} from 'react-icons/io5'
import { Box, Text } from "@chakra-ui/react";

export default function Intro() {
    // State for resume preview modal
    const [showResumeModal, setShowResumeModal] = useState(false);
    
    // Magnetic effect refs
    const downloadButtonRef = useMagneticEffect(0.2);
    const previewButtonRef = useMagneticEffect(0.2);
    const linkedinRef = useMagneticEffect(0.3);
    const githubRef = useMagneticEffect(0.3);
    const leetcodeRef = useMagneticEffect(0.3);

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
          <Box className="hero-content">
            <Text className="greeting-text">
              Hello, I'm
            </Text>
            <Text className="name-text">
              Aviroop Banerjee
            </Text>
            <Text className="subtitle-text">
              Software Engineer
            </Text>
            <Text className="skills-tagline">
              AI Enthusiast • Full-Stack Developer • Scalable Solutions
            </Text>
            
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
