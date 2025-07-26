import "../styling_files/intro.scss"
import {FaChevronDown} from "react-icons/fa";
import { init } from "ityped";
import { useEffect, useRef } from "react";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";
import {RiLinkedinLine} from "react-icons/ri"
import {VscGithubAlt} from 'react-icons/vsc'
import {SlSocialTwitter} from 'react-icons/sl'
import {SiLeetcode} from 'react-icons/si'
import {AiOutlineDown} from 'react-icons/ai'
import { Box, Text } from "@chakra-ui/react";

export default function Intro() {
    // Magnetic effect refs
    const downloadButtonRef = useMagneticEffect(0.2);
    const linkedinRef = useMagneticEffect(0.3);
    const githubRef = useMagneticEffect(0.3);
    const leetcodeRef = useMagneticEffect(0.3);

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
            
            {/* Social Links */}
            <Box className="social-links">
              <a href="https://github.com/Aviroop-001" target="_blank" rel="noopener noreferrer" className="social-link" ref={githubRef}>
                <VscGithubAlt />
              </a>
              <a href="https://www.linkedin.com/in/aviroopbanerjee/" target="_blank" rel="noopener noreferrer" className="social-link" ref={linkedinRef}>
                <RiLinkedinLine />
              </a>
              <a href="https://twitter.com/aviroop_B" target="_blank" rel="noopener noreferrer" className="social-link">
                <SlSocialTwitter />
              </a>
              <a href="https://leetcode.com/Aviroop_01/" target="_blank" rel="noopener noreferrer" className="social-link" ref={leetcodeRef}>
                <SiLeetcode />
              </a>
            </Box>

            {/* CTA Button */}
            <a
              href="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link"
              className="glass-button"
              target="_blank"
              rel="noopener noreferrer"
              ref={downloadButtonRef}
            >
              <span>Download Resume</span>
              <Box className="button-shimmer" />
            </a>
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <Box className="scroll-indicator">
          <AiOutlineDown className="scroll-arrow" />
          <Text className="scroll-text">Scroll to explore</Text>
        </Box>
      </Box>
    );
}
