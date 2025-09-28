import React from 'react'

interface SpatialIconProps {
  className?: string
  style?: React.CSSProperties
}

export const SpatialIcon: React.FC<SpatialIconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {/* VR Headset Frame */}
    <rect x="2" y="5" width="12" height="6" fill="#374151" stroke="#1f2937" strokeWidth="1" />
    <rect x="1" y="6" width="14" height="4" fill="#4b5563" stroke="#1f2937" strokeWidth="1" />
    
    {/* Left Lens */}
    <circle cx="5" cy="8" r="2" fill="#06b6d4" stroke="#0891b2" strokeWidth="1" />
    <circle cx="5" cy="8" r="1" fill="#67e8f9" />
    
    {/* Right Lens */}
    <circle cx="11" cy="8" r="2" fill="#06b6d4" stroke="#0891b2" strokeWidth="1" />
    <circle cx="11" cy="8" r="1" fill="#67e8f9" />
    
    {/* Head Strap */}
    <rect x="0" y="7" width="2" height="2" fill="#6b7280" stroke="#374151" strokeWidth="1" />
    <rect x="14" y="7" width="2" height="2" fill="#6b7280" stroke="#374151" strokeWidth="1" />
    
    {/* Tech Details */}
    <rect x="7" y="6" width="2" height="1" fill="#22d3ee" />
    <rect x="8" y="9" width="1" height="1" fill="#ef4444" />
    <rect x="6" y="9" width="1" height="1" fill="#22c55e" />
    <rect x="9" y="9" width="1" height="1" fill="#22c55e" />
  </svg>
)
