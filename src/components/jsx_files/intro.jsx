import "../styling_files/intro.scss";
import { 
  IoEyeOutline, 
  IoDownloadOutline,
  
} from 'react-icons/io5';
import { Box, Text } from "@chakra-ui/react";
import ScrambleText from "./ScrambleText";


export default function Intro({ onPreviewResume }) {
    return (
      <Box className="intro-hero-container">
        {/* Ambient Background Elements */}
        <div className="hero-ambient-glow"></div>
        <div className="hero-grid-overlay"></div>

        {/* Hero Title & Bio */}
        <Box className="hero-content">
          <ScrambleText 
            as="h1" 
            text="Aviroop Banerjee" 
            className="name-text" 
          />

          <Box className="subtitle-wrapper">
            {/* <DesktopCatPet /> Disabled for now per request */}
            <Text className="subtitle-text">
              Software Engineer with <strong>2+ years of experience</strong> building AI agents, LLM systems, distributed backend infrastructure, and platform-level software.
            </Text>
          </Box>

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
              onClick={onPreviewResume}
              className="glass-button preview-button"
            >
              <IoEyeOutline className="button-icon" />
              <span>PREVIEW RESUME</span>
            </button>
          </Box>
        </Box>
      </Box>
    );
}
