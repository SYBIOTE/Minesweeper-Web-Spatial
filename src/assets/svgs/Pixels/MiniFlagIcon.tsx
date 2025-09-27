import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const MiniFlagIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    <rect x="6" y="3" width="2" height="10" fill="#6d4c41" />
    <rect x="6" y="3" width="1" height="10" fill="#4e342e" />
    <rect x="7" y="3" width="5" height="4" fill="#ef4444" />
    <rect x="7" y="3" width="5" height="1" fill="#fca5a5" />
  </svg>
)


