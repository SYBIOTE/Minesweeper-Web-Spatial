import React from 'react'

interface TargetIconProps {
  className?: string
  style?: React.CSSProperties
}

export const TargetIcon: React.FC<TargetIconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    <circle cx="8" cy="8" r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
    <circle cx="8" cy="8" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
    <circle cx="8" cy="8" r="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
    <circle cx="8" cy="8" r="1" fill="#7f1d1d" />
    <rect x="7.5" y="0" width="1" height="16" fill="#ef4444" />
    <rect x="0" y="7.5" width="16" height="1" fill="#ef4444" />
  </svg>
)


