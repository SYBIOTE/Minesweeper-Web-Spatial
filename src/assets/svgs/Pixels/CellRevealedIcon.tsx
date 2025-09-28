import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const CellRevealedIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="#111827" />
    <rect x="1" y="1" width="14" height="14" fill="#1f2937" stroke="#0f172a" strokeWidth="1" />
    <rect x="2" y="2" width="12" height="12" fill="#334155" />
    <rect x="4" y="4" width="8" height="8" fill="#1e293b" />
    <rect x="7" y="7" width="2" height="2" fill="#e2e8f0" />
    <rect x="2" y="2" width="12" height="1" fill="#475569" />
    <rect x="2" y="13" width="12" height="1" fill="#0f172a" />
  </svg>
)
