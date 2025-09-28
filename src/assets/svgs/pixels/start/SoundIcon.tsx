import React from 'react'

interface SoundIconProps {
  className?: string
  style?: React.CSSProperties
  isEnabled?: boolean
}

export const SoundIcon: React.FC<SoundIconProps> = ({ className, style, isEnabled = true }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {isEnabled ? (
      // Sound ON - Speaker with sound waves
      <>
        {/* Speaker body */}
        <rect x="2" y="6" width="3" height="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
        {/* Speaker cone */}
        <polygon points="5,6 8,4 8,12 5,10" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
        
        {/* Sound waves */}
        <rect x="9" y="6" width="1" height="1" fill="#22c55e" />
        <rect x="9" y="9" width="1" height="1" fill="#22c55e" />
        <rect x="10" y="5" width="1" height="1" fill="#22c55e" />
        <rect x="10" y="7" width="1" height="1" fill="#22c55e" />
        <rect x="10" y="8" width="1" height="1" fill="#22c55e" />
        <rect x="10" y="10" width="1" height="1" fill="#22c55e" />
        <rect x="11" y="4" width="1" height="1" fill="#16a34a" />
        <rect x="11" y="6" width="1" height="1" fill="#16a34a" />
        <rect x="11" y="9" width="1" height="1" fill="#16a34a" />
        <rect x="11" y="11" width="1" height="1" fill="#16a34a" />
        <rect x="12" y="3" width="1" height="1" fill="#15803d" />
        <rect x="12" y="7" width="1" height="1" fill="#15803d" />
        <rect x="12" y="8" width="1" height="1" fill="#15803d" />
        <rect x="12" y="12" width="1" height="1" fill="#15803d" />
      </>
    ) : (
      // Sound OFF - Speaker with X
      <>
        {/* Speaker body */}
        <rect x="2" y="6" width="3" height="4" fill="#6b7280" stroke="#4b5563" strokeWidth="1" />
        {/* Speaker cone */}
        <polygon points="5,6 8,4 8,12 5,10" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
        
        {/* X mark for muted */}
        <rect x="9" y="4" width="1" height="1" fill="#ef4444" />
        <rect x="10" y="5" width="1" height="1" fill="#ef4444" />
        <rect x="11" y="6" width="1" height="1" fill="#ef4444" />
        <rect x="12" y="7" width="1" height="1" fill="#ef4444" />
        <rect x="13" y="8" width="1" height="1" fill="#ef4444" />
        <rect x="12" y="9" width="1" height="1" fill="#ef4444" />
        <rect x="11" y="10" width="1" height="1" fill="#ef4444" />
        <rect x="10" y="11" width="1" height="1" fill="#ef4444" />
        <rect x="9" y="12" width="1" height="1" fill="#ef4444" />
        
        <rect x="13" y="4" width="1" height="1" fill="#ef4444" />
        <rect x="12" y="5" width="1" height="1" fill="#ef4444" />
        <rect x="11" y="6" width="1" height="1" fill="#ef4444" />
        <rect x="10" y="7" width="1" height="1" fill="#ef4444" />
        <rect x="9" y="8" width="1" height="1" fill="#ef4444" />
        <rect x="10" y="9" width="1" height="1" fill="#ef4444" />
        <rect x="11" y="10" width="1" height="1" fill="#ef4444" />
        <rect x="12" y="11" width="1" height="1" fill="#ef4444" />
        <rect x="13" y="12" width="1" height="1" fill="#ef4444" />
      </>
    )}
  </svg>
)
