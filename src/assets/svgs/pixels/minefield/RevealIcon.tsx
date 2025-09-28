import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const RevealIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {/* Classic Windows arrow cursor outline */}
    <rect x="4" y="2" width="1" height="1" fill="#000000" />
    <rect x="4" y="3" width="2" height="1" fill="#000000" />
    <rect x="4" y="4" width="3" height="1" fill="#000000" />
    <rect x="4" y="5" width="4" height="1" fill="#000000" />
    <rect x="4" y="6" width="5" height="1" fill="#000000" />
    <rect x="4" y="7" width="6" height="1" fill="#000000" />
    <rect x="4" y="8" width="7" height="1" fill="#000000" />
    <rect x="4" y="9" width="8" height="1" fill="#000000" />
    <rect x="4" y="10" width="6" height="1" fill="#000000" />
    <rect x="6" y="11" width="2" height="1" fill="#000000" />
    <rect x="7" y="12" width="2" height="1" fill="#000000" />
    <rect x="8" y="13" width="2" height="1" fill="#000000" />
    <rect x="9" y="14" width="1" height="1" fill="#000000" />
    
    {/* Arrow cursor fill */}
    <rect x="5" y="3" width="1" height="1" fill="#ffffff" />
    <rect x="5" y="4" width="2" height="1" fill="#ffffff" />
    <rect x="5" y="5" width="3" height="1" fill="#ffffff" />
    <rect x="5" y="6" width="4" height="1" fill="#ffffff" />
    <rect x="5" y="7" width="5" height="1" fill="#ffffff" />
    <rect x="5" y="8" width="6" height="1" fill="#ffffff" />
    <rect x="5" y="10" width="1" height="1" fill="#ffffff" />
    <rect x="5" y="9" width="4" height="1" fill="#ffffff" />
    <rect x="7" y="10" width="3" height="1" fill="#ffffff" />
    <rect x="8" y="11" width="2" height="1" fill="#ffffff" />
    <rect x="8" y="12" width="3" height="1" fill="#ffffff" />
    <rect x="9" y="13" width="2" height="1" fill="#ffffff" />
    
  </svg>
)

