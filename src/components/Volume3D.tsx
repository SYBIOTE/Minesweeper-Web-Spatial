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


      // In 2D mode, position cards in viewport
    const totalWidth = (gridWidth - 1) * (cardSize + cardSpacing) + cardSize
    const totalHeight = (gridHeight - 1) * (cardSize + cardSpacing) + cardSize

    const centerOffsetX = (window.innerWidth - totalWidth) / 2
    const centerOffsetY = (window.innerHeight - totalHeight) / 2

    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        for (let z = 0; z < gridDepth; z++) {
          const relativeX = x * (cardSize + cardSpacing)
          const relativeY = y * (cardSize + cardSpacing)
          const relativeZ = z * (cardSize + cardSpacing)

          positions.push({
            x: relativeX + centerOffsetX,
            y: relativeY + centerOffsetY,
            z: relativeZ,
            index: x + y * gridWidth + z * gridWidth * gridHeight
          })
        }
      }
    }
  

    console.log(positions)
    return positions
  }, [gridWidth, gridHeight, gridDepth, cardSize, cardSpacing, config])
  // For 2D units, we don't need to limit active instances since they're lightweight
  // All cards are active by default (no performance concerns with CSS/SVG)
  
  return (
    <> 
      {gridPositions.map(({ x, y, z, index }) => {
        // Get cell data from game controls if available
        const cellData = gameControls?.getCellData(index) || {
          variant: 'empty' as const,
          number: undefined,
          isRevealed: false,
          isFlagged: false,
          isMine: false
        }

        return (
          <MinesweeperUnit2D 
            key={index}
            variant={cellData.variant}
            number={cellData.number}
            config={config}
            active={true}
            size={cardSize}
            position={{ 
              x: x,
              y: y,
              z: z
            }}
            index={index}
            onClick={() => gameControls?.handleCellClick(index)}
            onContextMenu={(e) => gameControls?.handleCellRightClick(index, e)}
          />
        )
      })}
    </>        
  )
}

// Memoize the component to prevent re-renders when services don't change
export const Volume3D = memo(Volume3DComponent)
