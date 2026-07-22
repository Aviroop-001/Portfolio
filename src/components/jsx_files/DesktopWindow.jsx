import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import DesktopCatPet from './DesktopCatPet';
import './DesktopWindow.scss';

export default function DesktopWindow({ title, children, className = "", maxWidth = "850px", width = "90%", onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const isIntro = title.toLowerCase().includes('intro');
  // Cat only on restored intro — window gets a shorter height so the perch isn't clipped
  const showCat = isIntro && !isMaximized;

  return (
    <Box 
      className={`retro-desktop-window ${isMaximized ? 'maximized' : ''} ${showCat ? 'has-cat-perch' : ''} ${className}`} 
      maxWidth={isMaximized ? undefined : maxWidth} 
      width={isMaximized ? undefined : width}
    >
      {showCat && <DesktopCatPet />}

      <Box className="window-header-bar">
        <Box className="window-control-dots">
          <span className="dot dot-red" onClick={onClose} title="Close window tab" />
          <span 
            className="dot dot-green" 
            onClick={toggleMaximize} 
            title={isMaximized ? "Restore window size" : "Maximize window"} 
          />
        </Box>
        <Text className="window-title-text">
          {title} {isMaximized ? " (Full Screen)" : ""}
        </Text>
        <Box className="window-header-right-spacer" />
      </Box>

      <Box key={title} className="window-body-content tab-fade-slide-anim">
        {children}
      </Box>
    </Box>
  );
}
