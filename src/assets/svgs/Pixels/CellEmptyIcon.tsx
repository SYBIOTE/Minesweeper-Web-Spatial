import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const CellEmptyIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="#0f172a" />
    <rect x="1" y="1" width="14" height="14" fill="#111827" stroke="#334155" strokeWidth="1" />
    <rect x="2" y="2" width="12" height="12" fill="#1e293b" />
    <rect x="2" y="2" width="12" height="1" fill="#475569" />
    <rect x="2" y="13" width="12" height="1" fill="#0f172a" />
    <rect x="2" y="2" width="1" height="12" fill="#475569" />
    <rect x="13" y="2" width="1" height="12" fill="#0f172a" />
    <rect x="3" y="3" width="1" height="1" fill="#f8fafc" />
    <rect x="12" y="3" width="1" height="1" fill="#f8fafc" />
    <rect x="3" y="12" width="1" height="1" fill="#f8fafc" />
    <rect x="12" y="12" width="1" height="1" fill="#f8fafc" />
  </svg>
)


