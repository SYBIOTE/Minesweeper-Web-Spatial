import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const BombIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    <rect x="6" y="1" width="4" height="2" fill="#78350f" />
    <rect x="7" y="0" width="2" height="2" fill="#92400e" />
    <rect x="5" y="2" width="6" height="6" fill="#0f172a" />
    <rect x="4" y="3" width="8" height="8" fill="#111827" />
    <rect x="5" y="4" width="6" height="6" fill="#020617" />
    <rect x="6" y="5" width="4" height="4" fill="#1f2937" />
    <rect x="9" y="1" width="1" height="1" fill="#facc15" />
    <rect x="10" y="1" width="1" height="1" fill="#f97316" />
  </svg>
)


