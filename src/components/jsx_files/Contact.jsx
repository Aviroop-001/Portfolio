import React from 'react'
import "../styling_files/contact.scss"
import {AiOutlineMail} from 'react-icons/ai'
import { SlSocialLinkedin } from "react-icons/sl";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialTwitter } from "react-icons/sl";
import { SiLeetcode } from "react-icons/si";
import {
  Box,
  Text,
} from "@chakra-ui/react";

function Contact() {
  return (
    <Box
      className="contact"
      id="contact"
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
                         <a 
               href="mailto:banerjeeaviroop01@gmail.com" 
               className="glass-button"
               target="_blank"
               rel="noopener noreferrer"
             >
               <span>Contact Me</span>
               <Box className="button-shimmer" />
             </a>

                         <Box className="social-links">
               <a
                 href="https://github.com/Aviroop-001"
                 className="social-link"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <VscGithubAlt />
               </a>
               
               <a
                 href="https://www.linkedin.com/in/aviroopbanerjee/"
                 className="social-link"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <SlSocialLinkedin />
               </a>
               
               <a
                 href="https://leetcode.com/Aviroop_01/"
                 className="social-link"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <SiLeetcode />
               </a>
             </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact