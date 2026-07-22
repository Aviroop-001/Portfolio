import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { 
  FiHome, 
  FiBriefcase, 
  FiCpu, 
  FiBookOpen, 
  FiFolder, 
  FiMail, 
  FiSearch,
  FiFileText,
  FiGithub,
  FiLinkedin
} from 'react-icons/fi';
import './MasterOSWindow.scss';

export default function MasterOSWindow({ 
  activeTab, 
  setActiveTab, 
  sections, 
  children 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const iconsMap = {
    intro: <FiHome />,
    experience: <FiBriefcase />,
    skills: <FiCpu />,
    education: <FiBookOpen />,
    projects: <FiFolder />,
    contact: <FiMail />
  };

  const filteredSections = sections.filter(sec => 
    sec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="master-os-window">
      {/* Top OS Window Bar */}
      <Box className="window-header-bar">
        <Box className="window-control-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </Box>
        <Text className="window-title-text">avi-os / portfolio.app</Text>
        <Box className="window-header-right">
          <span className="window-badge">AVI-OS v1.0</span>
        </Box>
      </Box>

      {/* Main Window Container with Left Sidebar & Content */}
      <Box className="window-main-container">
        {/* Left Sidebar */}
        <Box className="os-sidebar">
          {/* Search Box */}
          <Box className="sidebar-search">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search portfolio..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </Box>

          {/* Section Options */}
          <Box className="sidebar-group">
            <Text className="sidebar-group-title">TABLE OF CONTENTS</Text>
            {filteredSections.map((sec, idx) => {
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(sec.id)}
                >
                  <span className="sidebar-item-icon">{iconsMap[sec.id]}</span>
                  <span className="sidebar-item-label">{sec.name}</span>
                  {isActive && <span className="active-dot" />}
                </button>
              );
            })}
          </Box>

          {/* Quick Links */}
          <Box className="sidebar-group resources-group">
            <Text className="sidebar-group-title">RESOURCES</Text>
            <a 
              href="https://drive.google.com/file/d/13n1yMqtzusGvOnR6oipaYFaROGStBXGJ/view?usp=share_link" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sidebar-item"
            >
              <span className="sidebar-item-icon"><FiFileText /></span>
              <span className="sidebar-item-label">Resume PDF</span>
            </a>
            <a 
              href="https://github.com/Aviroop-001" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sidebar-item"
            >
              <span className="sidebar-item-icon"><FiGithub /></span>
              <span className="sidebar-item-label">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/aviroopbanerjee/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sidebar-item"
            >
              <span className="sidebar-item-icon"><FiLinkedin /></span>
              <span className="sidebar-item-label">LinkedIn</span>
            </a>
          </Box>
        </Box>

        {/* Right Main Content Pane */}
        <Box className="os-content-pane">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
