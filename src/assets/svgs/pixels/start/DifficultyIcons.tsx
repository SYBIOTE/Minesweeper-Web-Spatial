import React from 'react'

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

const baseProps = {
  viewBox: '0 0 16 16',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet',
  shapeRendering: 'crispEdges' as const
}

const renderBadge = (fill: string, light: string, dark: string) => (
  <>
    <rect width="16" height="16" fill="none" />
    <rect x="3" y="3" width="10" height="10" fill={fill} />
    <rect x="3" y="3" width="10" height="2" fill={light} />
    <rect x="3" y="11" width="10" height="2" fill={dark} />
    <rect x="3" y="3" width="2" height="10" fill={light} />
    <rect x="11" y="3" width="2" height="10" fill={dark} />
    <rect x="6" y="6" width="4" height="4" fill="rgba(0,0,0,0.25)" />
  </>
)

export const BeginnerIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg {...baseProps} className={className} style={style}>
    {renderBadge('#22c55e', '#86efac', '#166534')}
  </svg>
)

export const IntermediateIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg {...baseProps} className={className} style={style}>
    {renderBadge('#facc15', '#fef08a', '#ca8a04')}
  </svg>
)

export const ExpertIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg {...baseProps} className={className} style={style}>
    {renderBadge('#ef4444', '#fca5a5', '#991b1b')}
  </svg>
)
