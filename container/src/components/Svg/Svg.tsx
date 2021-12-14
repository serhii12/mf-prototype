import React from 'react';
import SVG from 'react-inlinesvg';
import icons from './manifest';

interface SVGProps {
  icon: string;
  iconColor?: string;
  className?: string;
}

const Svg: React.FC<SVGProps> = ({ icon, iconColor, className }) => {
  if (icon && icon !== '')
    return (
      <SVG
        className={`svg ${iconColor ? `svg--${iconColor}` : ''} ${className}`}
        src={icons[icon]}
        cacheRequests
      />
    );

  return null;
};

export default Svg;
