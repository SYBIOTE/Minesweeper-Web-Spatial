import { memo, useMemo } from 'react'
import type { GameConfig } from '../AppConfig'
import { MinesweeperUnit2D } from './MineSweeperUnit2D'

interface Volume3DProps {
  config: GameConfig
}

// will contain the 3d volume and responsible for generating the 3d grid of webspatial cards for minesweeper
const Volume3DComponent = ({ config }: Volume3DProps) => {
  const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"
  
  // Use config for grid dimensions
  const { grid, spatial } = config
  
  // Calculate grid layout
  const cardSize = spatial.cardSize * 100 // Convert to pixels
  const cardSpacing = spatial.cardSpacing * 100
  
  // Generate 3D grid positions
  const gridPositions = useMemo(() => {
    const positions = []
    const totalWidth = grid.width * (cardSize + cardSpacing) - cardSpacing
    const totalHeight = grid.height * (cardSize + cardSpacing) - cardSpacing
    const totalDepth = grid.depth * (cardSize + cardSpacing) - cardSpacing
    
    for (let x = 0; x < grid.width; x++) {
      for (let y = 0; y < grid.height; y++) {
        for (let z = 0; z < grid.depth; z++) {
          const posX = (x * (cardSize + cardSpacing)) - totalWidth / 2
          const posY = (y * (cardSize + cardSpacing)) - totalHeight / 2
          const posZ = (z * (cardSize + cardSpacing)) - totalDepth / 2
          
          positions.push({ x: posX, y: posY, z: posZ, index: x + y * grid.width + z * grid.width * grid.height })
        }
      }
    }
    return positions
  }, [grid.width, grid.height, grid.depth, cardSize, cardSpacing])

  // For 2D units, we don't need to limit active instances since they're lightweight
  // All cards are active by default (no performance concerns with CSS/SVG)
  
  return (
    <div className={`flex-1 h-full flex flex-col rounded-2xl overflow-hidden ${isSpatial ? '' : 'backdrop-blur-md border border-white/10 shadow-lg'}`}
         style={{ background: isSpatial ? 'transparent' : 'radial-gradient(ellipse at 50% -20%,rgba(0, 0, 0, 0.7) 0%, rgba(16,25,30,1) 100%)' }}>
      <div className="w-full h-full relative flex items-center justify-center">
        <div 
          className="relative"
          style={{
            width: `${grid.width * (cardSize + cardSpacing) - cardSpacing}px`,
            height: `${grid.height * (cardSize + cardSpacing) - cardSpacing}px`,
            transformStyle: 'preserve-3d'
          }}
        >
          {gridPositions.map(({ x, y, z, index }) => (
            <div
              key={index}
              data-idx={index}
              className="absolute"
              style={{
                width: `${cardSize}px`,
                height: `${cardSize}px`,
                left: `${x + (grid.width * (cardSize + cardSpacing) - cardSpacing) / 2}px`,
                top: `${y + (grid.height * (cardSize + cardSpacing) - cardSpacing) / 2}px`,
                transform: `translateZ(${z}px)`,
                '--xr-background-material': 'thick',
                '--xr-back': 60,
                '--xr-elevation': z,
                background: isSpatial ? 'transparent' : 'linear-gradient(180deg, rgba(16,25,30,0.6) 0%, rgba(17,43,48,0.6) 100%)',
                borderRadius: '12px',
                border: isSpatial ? 'none' : '1px solid rgba(255,255,255,0.1)',
                backdropFilter: isSpatial ? 'none' : 'blur(8px)',
                boxShadow: isSpatial ? 'none' : '0 8px 32px rgba(0,0,0,0.3)'
              } as React.CSSProperties}
              onClick={() => {
                console.log(`Card clicked: ${x}, ${y}, ${z}`)
                // TODO: Handle card click logic
              }}
            >
              <MinesweeperUnit2D 
                variant="empty" 
                config={config}
                active={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const Volume3D = memo(Volume3DComponent)
