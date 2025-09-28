import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

export const ResetIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    shapeRendering="crispEdges"
    className={className}
    style={style}
  >
    <rect width="16" height="16" fill="none" />

    {/* Upper semi-ring (right to top to left) */}
    <rect x="11" y="3" width="2" height="2" fill="#dc2626" />
    <rect x="10" y="2" width="2" height="2" fill="#dc2626" />
    <rect x="9" y="1" width="1" height="2" fill="#dc2626" />
    <rect x="7" y="1" width="2" height="2" fill="#dc2626" />
    <rect x="6" y="1" width="1" height="2" fill="#dc2626" />
    <rect x="5" y="2" width="1" height="2" fill="#dc2626" />
    <rect x="3" y="4" width="2" height="2" fill="#dc2626" />
    <rect x="3" y="5" width="2" height="4" fill="#dc2626" />
    <rect x="3" y="8" width="2" height="2" fill="#dc2626" />
    <rect x="3" y="9" width="1" height="2" fill="#dc2626" />
    <rect x="4" y="10" width="1" height="2" fill="#dc2626" />
    <rect x="5" y="11" width="1" height="2" fill="#dc2626" />
    <rect x="6" y="12" width="1" height="2" fill="#dc2626" />
    <rect x="7" y="12" width="2" height="2" fill="#dc2626" />
    <rect x="9" y="12" width="1" height="2" fill="#dc2626" />
    <rect x="10" y="11" width="2" height="2" fill="#dc2626" />
    <rect x="11" y="10" width="2" height="2" fill="#dc2626" />
    <rect x="11" y="9" width="2" height="2" fill="#dc2626" />
    <rect x="11" y="8" width="2" height="2" fill="#dc2626" />
    
    {/* Lower arrow head (pointing right at end of semi-ring) */}
    <rect x="12" y="9" width="1" height="1" fill="#dc2626" />
    <rect x="13" y="8" width="1" height="1" fill="#dc2626" />
    <rect x="13" y="9" width="1" height="1" fill="#dc2626" />
    <rect x="14" y="9" width="1" height="1" fill="#dc2626" />
    <rect x="10" y="8" width="1" height="1" fill="#dc2626" />
    <rect x="9" y="9" width="2" height="1" fill="#dc2626" />
    <rect x="11" y="7" width="1" height="1" fill="#dc2626" />


    {/* Highlights on upper semi-ring */}
    <rect x="7" y="1" width="2" height="1" fill="#ef4444" />
    <rect x="6" y="1" width="1" height="1" fill="#ef4444" />
    <rect x="5" y="2" width="1" height="1" fill="#ef4444" />
    <rect x="4" y="3" width="1" height="1" fill="#ef4444" />

    {/* Highlights on lower semi-ring */}
    <rect x="5" y="11" width="1" height="1" fill="#ef4444" />
    <rect x="6" y="12" width="1" height="1" fill="#ef4444" />
    <rect x="7" y="12" width="2" height="1" fill="#ef4444" />

    {/* Shadows on upper semi-ring */}
    <rect x="10" y="3" width="1" height="1" fill="#b91c1c" />
    <rect x="3" y="6" width="1" height="1" fill="#b91c1c" />

    {/* Shadows on lower semi-ring */}
    <rect x="11" y="8" width="1" height="1" fill="#b91c1c" />
    <rect x="10" y="11" width="1" height="1" fill="#b91c1c" />
    <rect x="12" y="7" width="1" height="1" fill="#b91c1c" />
  </svg>
)
