import React from 'react'

interface ToggleIconProps {
  className?: string
  style?: React.CSSProperties
  is3D?: boolean
}

export const ToggleIcon: React.FC<ToggleIconProps> = ({ className, style, is3D = false }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {is3D ? (
      // 3D Mode: Isometric cube
      <>
        {/* Back face */}
        <rect x="5" y="3" width="6" height="6" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1" />
        {/* Top face */}
        <polygon points="5,3 8,1 14,1 11,3" fill="#a78bfa" stroke="#6d28d9" strokeWidth="1" />
        {/* Right face */}
        <polygon points="11,3 14,1 14,7 11,9" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1" />
        {/* Front edges */}
        <rect x="2" y="6" width="6" height="6" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="1" />
        {/* 3D indicator */}
        <rect x="12" y="11" width="3" height="4" fill="#22d3ee" />
        <rect x="12" y="13" width="1" height="1" fill="#0891b2" />
        <rect x="13" y="14" width="1" height="1" fill="#0891b2" />
        <rect x="14" y="12" width="1" height="1" fill="#0891b2" />
      </>
    ) : (
      // 2D Mode: Flat square
      <>
        {/* Main square */}
        <rect x="3" y="3" width="10" height="10" fill="#06b6d4" stroke="#0891b2" strokeWidth="1" />
        {/* Grid lines for 2D effect */}
        <rect x="3" y="6.5" width="10" height="1" fill="#0891b2" />
        <rect x="3" y="9.5" width="10" height="1" fill="#0891b2" />
        <rect x="6.5" y="3" width="1" height="10" fill="#0891b2" />
        <rect x="9.5" y="3" width="1" height="10" fill="#0891b2" />
        {/* 2D indicator */}
        <rect x="1" y="11" width="3" height="4" fill="#ef4444" />
        <rect x="1" y="13" width="1" height="1" fill="#dc2626" />
        <rect x="2" y="14" width="1" height="1" fill="#dc2626" />
        <rect x="3" y="12" width="1" height="1" fill="#dc2626" />
        {/* X mark overlay for 2D */}
        <rect x="1.5" y="12" width="1" height="1" fill="#ffffff" />
        <rect x="2.5" y="12" width="1" height="1" fill="#ffffff" />
        <rect x="2" y="13" width="1" height="1" fill="#ffffff" />
        <rect x="1.5" y="14" width="1" height="1" fill="#ffffff" />
        <rect x="2.5" y="14" width="1" height="1" fill="#ffffff" />
      </>
    )}
  </svg>
)
