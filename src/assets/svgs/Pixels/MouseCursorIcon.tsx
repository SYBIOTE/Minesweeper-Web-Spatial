import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const MouseCursorIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    <path d="M2 2h6l6 6H9l3 6-3 2-3-6H3z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="8" y="3" width="1" height="3" fill="#facc15" />
    <rect x="9" y="4" width="1" height="2" fill="#f59e0b" />
  </svg>
)
