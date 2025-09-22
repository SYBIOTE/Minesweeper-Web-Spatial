import { memo } from 'react'
import type { GameConfig } from '../AppConfig'
import defaultConfig from '../AppConfig'

type MinesweeperTile2DProps = {
  size?: number
  index?: number
  variant?: 'empty' | 'revealed' | 'bomb' | 'flag' | 'number'
  number?: number
  config?: GameConfig
  active?: boolean
  onClick?: () => void
  onContextMenu?: (e: React.MouseEvent) => void
}

const MinesweeperTile2DComponent = ({ index, variant = 'empty', number, config = defaultConfig, active = true, onClick, onContextMenu, size }: MinesweeperTile2DProps) => {
  const mineColor = config.visual.cardColors.mine
  const flagColor = config.visual.cardColors.flag
  const numberColors = config.visual.cardColors.number

  // Position-based logic removed - now handled by CSS Grid in parent component

  const getCardStyle = () => {
    const baseStyle: React.CSSProperties = {
      width: `${size}px`,
      height: `${size}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      background: `transparent`,
      overflow: 'hidden'
    }

    return baseStyle
  }

  const renderContent = () => {
    switch (variant) {
      case 'bomb':
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            style={{ filter: `drop-shadow(0 0 8px ${mineColor}44)` }}
          >
            {/* Bomb body */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill={`url(#bombGradient)`}
              stroke={mineColor}
              strokeWidth="3"
            />
            {/* Bomb highlight */}
            <circle
              cx="40"
              cy="40"
              r="15"
              fill={`url(#bombHighlight)`}
              opacity="0.6"
            />
            {/* Bomb fuse */}
            <rect
              x="48"
              y="15"
              width="4"
              height="20"
              fill="#8B4513"
              rx="2"
            />
            {/* Fuse flame */}
            <ellipse
              cx="50"
              cy="12"
              rx="6"
              ry="8"
              fill="#FF4500"
              opacity="0.8"
            />
            <defs>
              <radialGradient id="bombGradient" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor={mineColor} stopOpacity="1" />
              </radialGradient>
              <radialGradient id="bombHighlight" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor={mineColor} stopOpacity="0.8" />
              </radialGradient>
            </defs>
          </svg>
        )

      case 'flag':
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
          >
            {/* Flag pole */}
            <rect
              x="48"
              y="20"
              width="4"
              height="60"
              fill="#cccccc"
              rx="2"
            />
            {/* Flag pole highlight */}
            <rect
              x="48.5"
              y="20"
              width="1"
              height="60"
              fill="#ffffff"
              opacity="0.3"
            />
            {/* Flag */}
            <path
              d="M52 25 L85 30 L80 50 L85 70 L52 75 Z"
              fill={`url(#flagGradient)`}
              stroke={flagColor}
              strokeWidth="1"
            />
            {/* Flag pattern */}
            <rect
              x="55"
              y="30"
              width="25"
              height="3"
              fill="#ffffff"
              opacity="0.3"
            />
            <rect
              x="55"
              y="40"
              width="25"
              height="3"
              fill="#ffffff"
              opacity="0.3"
            />
            <rect
              x="55"
              y="50"
              width="25"
              height="3"
              fill="#ffffff"
              opacity="0.3"
            />
            <rect
              x="55"
              y="60"
              width="25"
              height="3"
              fill="#ffffff"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={flagColor} stopOpacity="1" />
                <stop offset="100%" stopColor={`${flagColor}dd`} stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        )

      case 'number':
        if (typeof number === 'number' && number > 0) {
          const colorIndex = Math.max(0, Math.min(7, number - 1))
          const textColor = numberColors[colorIndex]
          return (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.8))' }}
            >
              <text
                x="50"
                y="60"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="48"
                fontWeight="bold"
                fill={textColor}
                fontFamily="monospace"
                style={{ textShadow: '0 0 8px rgba(0,0,0,0.8)' }}
              >
                {number}
              </text>
            </svg>
          )
        }
        return null

      case 'revealed':
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            {/* Revealed empty cell - darker background */}
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              fill="rgba(0,0,0,0.3)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              rx="8"
            />
            {/* Subtle center dot to indicate it's revealed */}
            <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.3)" />
          </svg>
        )

      case 'empty':
      default:
        return (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            {/* Subtle pattern for empty cell */}
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              fill="rgba(88, 87, 87, 0.12)"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1"
              rx="8"
            />
            {/* Corner highlights */}
            <circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.5)" />
            <circle cx="75" cy="25" r="2" fill="rgba(255,255,255,0.5)" />
            <circle cx="25" cy="75" r="2" fill="rgba(255,255,255,0.5)" />
            <circle cx="75" cy="75" r="2" fill="rgba(255,255,255,0.5)" />
          </svg>
      )
    }
  }

  if (!active) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(100,100,100,0.3), rgba(80,80,80,0.2))',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.8rem'
      }}>
        ...
      </div>
    )
  }

  return (
    <div 
      onClick={onClick}
      onContextMenu={onContextMenu}
      enable-xr
      data-index={index}
      style={{
        ...getCardStyle(),
        cursor: 'pointer'
      } as React.CSSProperties}
    >
      {renderContent()}
    </div>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const MinesweeperUnit2D = memo(MinesweeperTile2DComponent)
