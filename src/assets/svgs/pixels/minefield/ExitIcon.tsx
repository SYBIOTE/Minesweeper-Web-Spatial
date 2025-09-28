import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const ExitIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />

    {/* Power symbol – outer ring */}
    <rect x="5" y="1" width="6" height="2" fill="#ef4444" />
    <rect x="3" y="2" width="2" height="2" fill="#ef4444" />
    <rect x="2" y="4" width="2" height="6" fill="#ef4444" />
    <rect x="3" y="10" width="2" height="2" fill="#ef4444" />
    <rect x="5" y="11" width="6" height="2" fill="#ef4444" />
    <rect x="11" y="10" width="2" height="2" fill="#ef4444" />
    <rect x="12" y="4" width="2" height="6" fill="#ef4444" />
    <rect x="11" y="2" width="2" height="2" fill="#ef4444" />

    {/* Inner highlight & shadow */}
    <rect x="5" y="2" width="6" height="1" fill="#fca5a5" opacity="0.8" />
    <rect x="5" y="11" width="6" height="1" fill="#dc2626" opacity="0.9" />

    {/* Power stem */}
    <rect x="6.5" y="2" width="3" height="4" fill="#ef4444" />
    <rect x="6.5" y="1" width="3" height="1" fill="#fca5a5" />
    <rect x="6.5" y="5" width="3" height="1" fill="#b91c1c" />

    {/* Center cap */}
    <rect x="6.5" y="6" width="3" height="2" fill="#ef4444" />
    <rect x="6.5" y="6" width="3" height="1" fill="#fca5a5" />
    <rect x="6.5" y="7" width="3" height="1" fill="#b91c1c" />

  </svg>
)