import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const FlagIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    <rect x="3" y="1" width="2" height="14" fill="#6d4c41" />
    <rect x="3" y="1" width="1" height="14" fill="#4e342e" />
    <rect x="3" y="1" width="2" height="1" fill="#8d6e63" />
    <rect x="2" y="14" width="4" height="2" fill="#4b5563" />
    <rect x="2" y="15" width="4" height="1" fill="#1f2937" />
    <rect x="5" y="2" width="8" height="5" fill="#ef4444" />
    <rect x="5" y="2" width="8" height="1" fill="#fca5a5" />
    <rect x="5" y="6" width="8" height="1" fill="#991b1b" />
    <rect x="12" y="4" width="1" height="1" fill="#ef4444" />
    <rect x="13" y="4" width="1" height="1" fill="transparent" />
  </svg>
)
