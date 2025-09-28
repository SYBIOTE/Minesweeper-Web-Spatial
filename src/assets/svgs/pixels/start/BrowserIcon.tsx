import React from 'react'

interface BrowserIconProps {
  className?: string
  style?: React.CSSProperties
}

export const BrowserIcon: React.FC<BrowserIconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />
    
    {/* Monitor Frame */}
    <rect x="1" y="2" width="14" height="10" fill="#374151" stroke="#1f2937" strokeWidth="1" />
    <rect x="2" y="3" width="12" height="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
    
    {/* Screen Content */}
    <rect x="3" y="4" width="10" height="6" fill="#0f172a" />
    
    {/* Browser Window */}
    <rect x="3" y="4" width="10" height="2" fill="#475569" />
    <rect x="4" y="5" width="1" height="1" fill="#ef4444" />
    <rect x="5" y="5" width="1" height="1" fill="#eab308" />
    <rect x="6" y="5" width="1" height="1" fill="#22c55e" />
    
    {/* Content Area */}
    <rect x="4" y="7" width="8" height="1" fill="#64748b" />
    <rect x="4" y="8" width="6" height="1" fill="#64748b" />
    <rect x="4" y="9" width="4" height="1" fill="#64748b" />
    
    {/* Monitor Stand */}
    <rect x="7" y="12" width="2" height="2" fill="#4b5563" stroke="#374151" strokeWidth="1" />
    <rect x="5" y="14" width="6" height="1" fill="#6b7280" stroke="#4b5563" strokeWidth="1" />
  </svg>
)
