import React, { useState } from 'react'
import "../styling_files/contact.scss"
import { useMagneticEffect } from "../../hooks/useMagneticEffect";
import {AiOutlineMail} from 'react-icons/ai'
import { SlSocialLinkedin } from "react-icons/sl";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialTwitter } from "react-icons/sl";
import { SiLeetcode } from "react-icons/si";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";
import {
  Box,
  Text,
} from "@chakra-ui/react";

function Contact() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Magnetic effect refs
  const contactButtonRef = useMagneticEffect(0.2);
  const copyButtonRef = useMagneticEffect(0.3);
  const githubRef = useMagneticEffect(0.3);
  const linkedinRef = useMagneticEffect(0.3);
  const leetcodeRef = useMagneticEffect(0.3);
  
  const email = "banerjeeaviroop01@gmail.com";
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopySuccess(true);
      setShowToast(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <Box
      className="contact"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >


      {/* Main Glass Card */}
      <Box className="glass-card" maxWidth="700px" width="90%" padding={["2rem", "3rem"]} textAlign="center">
        <Box className="contact-content">
          <Text className="section-title">
            Get In Touch
          </Text>
          
          <Text className="contact-description">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
          </Text>

          {/* Contact Links */}
          <Box className="contact-links">
            <Box className="email-buttons">
              <a 
                href={`mailto:${email}`} 
                className="glass-button"
                target="_blank"
                rel="noopener noreferrer"
                ref={contactButtonRef}
              >
                <span>Contact Me</span>
                <Box className="button-shimmer" />
              </a>
              
              <button 
                onClick={copyToClipboard}
                className={`copy-email-button ${copySuccess ? 'success' : ''}`}
                title="Copy email to clipboard"
                ref={copyButtonRef}
              >
                {copySuccess ? <IoCheckmarkOutline /> : <IoCopyOutline />}
              </button>
            </Box>

                         <Box className="social-links">
               <a
                 href="https://github.com/Aviroop-001"
                 className="social-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 ref={githubRef}
               >
                 <VscGithubAlt />
               </a>
               
               <a
                 href="https://www.linkedin.com/in/aviroopbanerjee/"
                 className="social-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 ref={linkedinRef}
               >
                 <SlSocialLinkedin />
               </a>
               
               <a
                 href="https://leetcode.com/Aviroop_01/"
                 className="social-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 ref={leetcodeRef}
               >
                 <SiLeetcode />
               </a>
             </Box>
          </Box>
        </Box>
      </Box>

      {/* Toast Notification */}
      {showToast && (
        <Box className={`toast-notification ${showToast ? 'show' : ''}`}>
          <IoCheckmarkOutline />
          <span>Email copied to clipboard!</span>
        </Box>
      )}
    </Box>
  );
}

export default Contact