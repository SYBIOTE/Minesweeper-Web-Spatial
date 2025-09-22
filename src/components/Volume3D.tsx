import { memo, useMemo } from 'react'
import type { GameConfig } from '../AppConfig'
import { MinesweeperUnit2D } from './MineSweeperTile2D'

interface Volume3DProps {
  config: GameConfig
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

// will contain the 3d volume and responsible for generating the 3d grid of webspatial cards for minesweeper
const Volume3DComponent = ({ config, gameControls }: Volume3DProps) => {
  //const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"
  
  // Use config for grid dimensions
  const { difficulty : { preset , level }, spatial } = config
  
  // Calculate grid layout
  const cardSize = spatial.cardSize * 100 // Convert to pixels
  const cardSpacing = spatial.cardSpacing * 100
  
  // Generate 3D grid positions
  // grid positions are relative to origin (0,0,0) at the center of the grid

  // Support custom levels as well as presets
  const gridWidth =  preset[level]?.width
  const gridHeight = preset[level]?.height
  const gridDepth = preset[level]?.depth

  const gridPositions = useMemo(() => {
    const positions = []

    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        for (let z = 0; z < gridDepth; z++) {
          const relativeX = x * (cardSize + cardSpacing)
          const relativeY = y * (cardSize + cardSpacing)
          const relativeZ = z * (cardSize + cardSpacing)

          positions.push({
            x: relativeX,
            y: relativeY,
            z: relativeZ,
            gridX: x + 1, // CSS Grid is 1-indexed
            gridY: y + 1,
            index: x + y * gridWidth + z * gridWidth * gridHeight
          })
        }
      }
    }

    return positions
  }, [gridWidth, gridHeight, gridDepth, cardSize, cardSpacing])
  // For 2D units, we don't need to limit active instances since they're lightweight
  // All cards are active by default (no performance concerns with CSS/SVG)
  
  // Generate CSS Grid template for 3D positioning
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridWidth}, ${cardSize + cardSpacing}px)`,
    gridTemplateRows: `repeat(${gridHeight}, ${cardSize + cardSpacing}px)`,
    gap: `${cardSpacing}px`,
    width: 'fit-content',
    height: 'fit-content',
    perspective: '1000px', // Add perspective for 3D effect
    position: 'relative'
  }

  return (
    <div style={gridStyle}>
      {gridPositions.map(({ z, gridX, gridY, index }) => {
        // Get cell data from game controls if available
        const cellData = gameControls?.getCellData(index) || {
          variant: 'empty' as const,
          number: undefined,
          isRevealed: false,
          isFlagged: false,
          isMine: false
        }

        return (
          <div
            key={index}
            style={{
              gridColumn: gridX,
              gridRow: gridY,
              transform: `translateZ(${z}px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <MinesweeperUnit2D
              variant={cellData.variant}
              number={cellData.number}
              config={config}
              active={true}
              size={cardSize}
              index={index}
              onClick={() => gameControls?.handleCellClick(index)}
              onContextMenu={(e) => gameControls?.handleCellRightClick(index, e)}
            />
          </div>
        )
      })}
    </div>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const Volume3D = memo(Volume3DComponent)
