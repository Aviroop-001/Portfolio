import React from 'react';
import './WallpaperImageBackground.scss';
import wallpaperLight from '../../assets/images/wallpaper_light.jpg';
import wallpaperDark from '../../assets/images/wallpaper_dark.jpg';

export default function WallpaperImageBackground({ theme }) {
  const currentWallpaper = theme === 'dark' ? wallpaperDark : wallpaperLight;

  return (
    <div className="wallpaper-image-bg-container">
      <img 
        src={currentWallpaper} 
        alt="Desktop Wallpaper" 
        className="wallpaper-img"
      />
      <div className="wallpaper-ambient-overlay" />
    </div>
  );
}
