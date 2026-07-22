import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import DesktopCatPet from './DesktopCatPet';
import './DesktopWindow.scss';

export default function DesktopWindow({ title, children, className = "", maxWidth = "850px", width = "90%" }) {
  return (
    <Box 
      className={`retro-desktop-window ${className}`} 
      maxWidth={maxWidth} 
      width={width}
    >
      {/* Milo the Digital Pet Perched ONLY on the Intro Tab Ledge */}
      {title.toLowerCase().includes('intro') && <DesktopCatPet />}

      <Box className="window-header-bar">
        <Box className="window-control-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </Box>
        <Text className="window-title-text">{title}</Text>
      </Box>
      <Box key={title} className="window-body-content tab-fade-slide-anim">
        {children}
      </Box>
    </Box>
  );
}
