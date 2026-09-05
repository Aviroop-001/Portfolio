import "../styling_files/intro.scss";
import { 
  IoDocumentTextOutline
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

          {/* CTA Action Button */}
          <Box className="cta-buttons">
            <a
              href="/resume.pdf"
              className="glass-button primary-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoDocumentTextOutline className="button-icon" />
              <span>VIEW RÉSUMÉ ↗</span>
            </a>
          </Box>
        </Box>
      </Box>
    );
}
