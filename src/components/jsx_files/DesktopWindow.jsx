import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import './DesktopWindow.scss';

export default function DesktopWindow({ title, children, className = "", maxWidth = "850px", width = "90%" }) {
  return (
    <Box 
      className={`retro-desktop-window ${className}`} 
      maxWidth={maxWidth} 
      width={width}
    >
      <Box className="window-header-bar">
        <Box className="window-control-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </Box>
        <Text className="window-title-text">{title}</Text>
        <Box className="window-header-right">
          <span className="window-badge">AVI-OS v1.0</span>
        </Box>
      </Box>
      <Box className="window-body-content">
        {children}
      </Box>
    </Box>
  );
}
