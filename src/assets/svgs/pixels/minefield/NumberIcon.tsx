import React from 'react'

interface IconProps {
  value?: number
  className?: string
  style?: React.CSSProperties
}

const numberColors: Record<number, string> = {
  1: '#2563eb',
  2: '#16a34a',
  3: '#dc2626',
  4: '#7c3aed',
  5: '#b91c1c',
  6: '#0d9488',
  7: '#111827',
  8: '#374151'
}

export const NumberIcon: React.FC<IconProps> = ({ value = 3, className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />

    <rect x="2" y="2" width="12" height="12" fill="#d1d5db" />
    <rect x="2" y="2" width="12" height="2" fill="#f3f4f6" />
    <rect x="2" y="12" width="12" height="2" fill="#9ca3af" />
    <rect x="2" y="2" width="2" height="12" fill="#f3f4f6" />
    <rect x="12" y="2" width="2" height="12" fill="#9ca3af" />

    <rect x="4" y="4" width="8" height="8" fill="#e5e7eb" />
    <rect x="4" y="4" width="8" height="1" fill="#f9fafb" />
    <rect x="4" y="11" width="8" height="1" fill="#cbd5f5" />

    <text
      x="8"
      y="11"
      textAnchor="middle"
      fontFamily="'Press Start 2P', 'Courier New', monospace"
      fontSize="8"
      fill={numberColors[value] ?? numberColors[3]}
    >
      {value}
    </text>
  </svg>
)
