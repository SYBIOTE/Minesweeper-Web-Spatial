import { memo, useMemo } from 'react'
import type { GameConfig } from '../AppConfig'
import { MinesweeperUnit2D } from './MineSweeperUnit2D'

interface Volume3DProps {
  config: GameConfig
}

// will contain the 3d volume and responsible for generating the 3d grid of webspatial cards for minesweeper
const Volume3DComponent = ({ config }: Volume3DProps) => {
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
          // Center the grid at origin (0,0,0)
          const posX = (x * (cardSize + cardSpacing)) 
          const posY = (y * (cardSize + cardSpacing))  
          const posZ = (z * (cardSize + cardSpacing))

          positions.push({ 
            x: posX, 
            y: posY, 
            z: posZ, 
            index: x + y * gridWidth + z * gridWidth * gridHeight 
          })
        }
      }
    }
    return positions
  }, [gridWidth, gridHeight, gridDepth, cardSize, cardSpacing])

  console.log("DEBUG",gridPositions)
  // For 2D units, we don't need to limit active instances since they're lightweight
  // All cards are active by default (no performance concerns with CSS/SVG)
  
  return (
    <> 
      {gridPositions.map(({ x, y, z, index }) => (
          <MinesweeperUnit2D 
            key={index}
            variant="number" 
            config={config}
            active={true}
            size={cardSize}
            position={{ 
              x: x,
              y: y,
              z: z
            }}
            index={index}
          />
        ))}
    </>        
  )
}

// Memoize the component to prevent re-renders when services don't change
export const Volume3D = memo(Volume3DComponent)
