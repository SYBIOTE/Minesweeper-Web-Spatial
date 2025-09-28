import React from 'react'

interface GamepadIconProps {
  className?: string
  style?: React.CSSProperties
}

export const GamepadIcon: React.FC<GamepadIconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {/* Controller Body */}
    <rect x="3" y="6" width="10" height="4" fill="#4b5563" stroke="#374151" strokeWidth="1" />
    <rect x="2" y="7" width="12" height="2" fill="#6b7280" stroke="#4b5563" strokeWidth="1" />
    
    {/* Left Grip */}
    <rect x="1" y="8" width="2" height="3" fill="#374151" stroke="#1f2937" strokeWidth="1" />
    {/* Right Grip */}
    <rect x="13" y="8" width="2" height="3" fill="#374151" stroke="#1f2937" strokeWidth="1" />
    
    {/* D-Pad */}
    <rect x="4" y="7" width="1" height="1" fill="#1f2937" />
    <rect x="5" y="6" width="1" height="3" fill="#1f2937" />
    <rect x="6" y="7" width="1" height="1" fill="#1f2937" />
    
    {/* Action Buttons */}
    <circle cx="10" cy="6.5" r="0.5" fill="#22c55e" />
    <circle cx="11.5" cy="7" r="0.5" fill="#ef4444" />
    <circle cx="11.5" cy="8" r="0.5" fill="#3b82f6" />
    <circle cx="10" cy="8.5" r="0.5" fill="#eab308" />
    
    {/* Center Details */}
    <rect x="7" y="7" width="2" height="1" fill="#1f2937" />
    <rect x="8" y="8" width="1" height="1" fill="#06b6d4" />
  </svg>
)
