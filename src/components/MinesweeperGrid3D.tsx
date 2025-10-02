import { memo } from 'react'

import type { GameConfig } from '../AppConfig'
import { MinesweeperUnit2D } from './MineSweeperTile2D'
import { Grid3D, type Grid3DConfig, type Grid3DPosition } from './Grid3D'

interface MinesweeperGrid3DProps {
  config: GameConfig
  isSpatial?: boolean
  gameControls?: {
    handleCellClick: (index: number, event?: React.MouseEvent) => void
    handleCellRightClick: (index: number, event: React.MouseEvent) => void
    getCellData: (index: number) => {
      variant: 'empty' | 'revealed' | 'bomb' | 'flag' | 'number'
      number?: number
      isRevealed: boolean
      isFlagged: boolean
      isMine: boolean
    }
  }
}

// Minesweeper-specific 3D grid component that uses the abstracted Grid3D
const MinesweeperGrid3DComponent = ({ config, isSpatial = false, gameControls }: MinesweeperGrid3DProps) => {
  // Use config for grid dimensions
  const {
    difficulty: { preset, level },
    spatial
  } = config

  // Calculate grid layout
  const cardSize = spatial.cardSize * 100 // Convert to pixels
  const cardSpacing = spatial.cardSpacing * 100

  // Support custom levels as well as presets
  const gridWidth = preset[level]?.width
  const gridHeight = preset[level]?.height
  const gridDepth = preset[level]?.depth

  // Create the Grid3D configuration
  const grid3DConfig: Grid3DConfig = {
    width: gridWidth,
    height: gridHeight,
    depth: gridDepth,
    cardSize,
    cardSpacing
  }

  // Render function for each cell in the grid
  const renderCell = (position: Grid3DPosition) => {
    // Get cell data from game controls if available
    const cellData = gameControls?.getCellData(position.index) || {
      variant: 'empty' as const,
      number: undefined,
      isRevealed: false,
      isFlagged: false,
      isMine: false
    }

    return (
      <MinesweeperUnit2D
        variant={cellData.variant}
        number={cellData.number}
        config={config}
        active={true}
        isSpatial={isSpatial}
        size={cardSize}
        index={position.index}
        onClick={() => gameControls?.handleCellClick(position.index)}
        onContextMenu={(e) => gameControls?.handleCellRightClick(position.index, e)}
      />
    )
  }

  return (
    <Grid3D config={grid3DConfig}>
      {renderCell}
    </Grid3D>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const MinesweeperGrid3D = memo(MinesweeperGrid3DComponent)
