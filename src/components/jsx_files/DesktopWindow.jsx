import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import DesktopCatPet from './DesktopCatPet';
import './DesktopWindow.scss';

export default function DesktopWindow({ title, children, className = "", maxWidth = "850px", width = "90%", onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
    // Unminimize if maximizing
    if (isMinimized) setIsMinimized(false);
  };

  return (
    <Box 
      className={`retro-desktop-window ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''} ${className}`} 
      maxWidth={isMaximized ? "100%" : maxWidth} 
      width={isMaximized ? "100%" : width}
    >
      {/* Milo the Digital Pet Perched ONLY on the Intro Tab Ledge */}
      {title.toLowerCase().includes('intro') && !isMinimized && <DesktopCatPet />}

      <Box className="window-header-bar">
        <Box className="window-control-dots">
          <span className="dot dot-red" onClick={onClose} title="Close window tab" />
          <span 
            className="dot dot-yellow" 
            onClick={toggleMinimize} 
            title={isMinimized ? "Restore window size" : "Minimize window"} 
          />
          <span 
            className="dot dot-green" 
            onClick={toggleMaximize} 
            title={isMaximized ? "Restore window size" : "Maximize window"} 
          />
        </Box>
        <Text className="window-title-text">
          {title} {isMinimized ? " (Minimized)" : isMaximized ? " (Full Screen)" : ""}
        </Text>
        <Box className="window-header-right-spacer" />
      </Box>

      {!isMinimized && (
        <Box key={title} className="window-body-content tab-fade-slide-anim">
          {children}
        </Box>
      )}
    </Box>
  );
}
