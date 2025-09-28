import { memo } from 'react'

import type { GameConfig } from '../AppConfig'
import defaultConfig from '../AppConfig'
import { BombIcon } from '../assets/svgs/pixels/minefield/BombIcon'
import { CellEmptyIcon } from '../assets/svgs/pixels/minefield/CellEmptyIcon'
import { CellRevealedIcon } from '../assets/svgs/pixels/minefield/CellRevealedIcon'
import { FlagIcon } from '../assets/svgs/pixels/minefield/FlagIcon'
import { NumberIcon } from '../assets/svgs/pixels/minefield/NumberIcon'

type MinesweeperTile2DProps = {
  size?: number
  index?: number
  variant?: 'empty' | 'revealed' | 'bomb' | 'flag' | 'number'
  number?: number
  config?: GameConfig
  active?: boolean
  isSpatial?: boolean
  onClick?: () => void
  onContextMenu?: (e: React.MouseEvent) => void
}

const MinesweeperTile2DComponent = ({
  index,
  variant = 'empty',
  number,
  config = defaultConfig,
  active = true,
  isSpatial = false,
  onClick,
  onContextMenu,
  size
}: MinesweeperTile2DProps) => {
  const mineColor = config.visual.cardColors.mine
  const numberColors = config.visual.cardColors.number

  // Position-based logic removed - now handled by CSS Grid in parent component
  const getBaseClasses = () => {
    return [
      'flex',
      'cursor-pointer', 
      'items-center',
      'justify-center',
      'overflow-hidden',
      'rounded',
      'border',
      'border-white/20',
      'bg-black/40',
      'shadow-[3px_3px_0_rgba(0,0,0,0.7)]'
    ].join(' ')
  }
  
  const getInteractiveClasses = () => {
    return [
      'transition-all',
      'duration-200',
      'hover:opacity-100',
      'hover:border-cyan-400/60',
      'hover:shadow-[0_0_20px_rgba(34,211,238,0.4),3px_3px_0_rgba(0,0,0,0.7)]',
      'hover:scale-105'
    ].join(' ')
  }
  
  const getCardStyle = () => ({
    width: `${size}px`,
    height: `${size}px`
  })

  // Determine opacity based on variant and spatial mode
  const getOpacity = () => {
    if (!active) return 'opacity-30'
    
    // In spatial mode, highly reduce opacity for revealed empty cells
    if (isSpatial && variant === 'revealed' && (!number || number === 0)) {
      return 'opacity-5'
    }
    
    return 'opacity-80'
  }

  const getPointerEvents = () => {
    // If it's an empty revealed cell in spatial mode, make it uninteractable
    if (isSpatial && variant === 'revealed' && (!number || number === 0)) {
      return 'pointer-events-none'
    }
    return 'pointer-events-auto'
  }
  

  const renderContent = () => {
    switch (variant) {
      case 'bomb':
        return <BombIcon className="w-full h-full" style={{ filter: `drop-shadow(0 0 8px ${mineColor}44)` }} />

      case 'flag':
        return <FlagIcon className="w-full h-full" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />

      case 'number':
        if (typeof number === 'number' && number > 0) {
          const colorIndex = Math.max(0, Math.min(7, number - 1))
          const textColor = numberColors[colorIndex]
          return (
            <NumberIcon
              value={number}
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.8))', color: textColor }}
            />
          )
        }
        return null

      case 'revealed':
        return <CellRevealedIcon className="h-full w-full" />

      case 'empty':
      default:
        return <CellEmptyIcon className="h-full w-full" />
    }
  }

  if (!active) {
    return (
      <div className="flex h-full w-full items-center justify-center border border-white/20 bg-gradient-to-br from-gray-700/40 to-gray-800/30 text-[0.6rem] text-white/30 shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
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
      className={`${getBaseClasses()} ${getOpacity()} ${getPointerEvents()} ${getInteractiveClasses()}`}
      style={getCardStyle() as React.CSSProperties}
    >
      {renderContent()}
    </div>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const MinesweeperUnit2D = memo(MinesweeperTile2DComponent)
