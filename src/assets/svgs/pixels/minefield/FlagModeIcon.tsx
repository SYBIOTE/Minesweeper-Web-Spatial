import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const FlagModeIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {/* Flag pole */}
    <rect x="2" y="1" width="2" height="14" fill="#6d4c41" />
    <rect x="2" y="1" width="1" height="14" fill="#4e342e" />
    <rect x="2" y="1" width="2" height="1" fill="#8d6e63" />
    
    {/* Base */}
    <rect x="1" y="14" width="4" height="2" fill="#4b5563" />
    <rect x="1" y="15" width="4" height="1" fill="#1f2937" />
    
    {/* Flag - Yellow/Orange for flag mode */}
    <rect x="4" y="2" width="7" height="4" fill="#eab308" />
    <rect x="4" y="2" width="7" height="1" fill="#fde047" />
    <rect x="4" y="5" width="7" height="1" fill="#ca8a04" />
    <rect x="10" y="3" width="1" height="1" fill="#eab308" />
    <rect x="11" y="4" width="1" height="1" fill="transparent" />
    
    {/* Mode indicator - Plus sign */}
    <rect x="6" y="8" width="3" height="1" fill="#22c55e" />
    <rect x="7" y="7" width="1" height="3" fill="#22c55e" />
    
    {/* Action indicator sparkles */}
    <rect x="12" y="1" width="1" height="1" fill="#fbbf24" />
    <rect x="13" y="3" width="1" height="1" fill="#f59e0b" />
    <rect x="14" y="6" width="1" height="1" fill="#fbbf24" />
  </svg>
)
