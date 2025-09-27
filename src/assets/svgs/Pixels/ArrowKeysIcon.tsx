import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const ArrowKeysIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    <rect x="2" y="6" width="12" height="4" fill="#e5e7eb" />
    <rect x="6" y="2" width="4" height="12" fill="#e5e7eb" />
    <rect x="2" y="6" width="12" height="1" fill="#f9fafb" />
    <rect x="2" y="9" width="12" height="1" fill="#94a3b8" />
    <rect x="6" y="2" width="4" height="1" fill="#f9fafb" />
    <rect x="6" y="12" width="4" height="1" fill="#94a3b8" />
    <rect x="7" y="4" width="2" height="8" fill="#22c55e" />
    <rect x="4" y="7" width="8" height="2" fill="#22c55e" />
  </svg>
)


