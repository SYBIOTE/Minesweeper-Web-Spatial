import { memo, useMemo, type ReactNode } from 'react'

// Generic interface for 3D grid configuration
export interface Grid3DConfig {
  width: number
  height: number
  depth: number
  cardSize: number // in pixels
  cardSpacing: number // in pixels
}

// Position data for each cell in the 3D grid
export interface Grid3DPosition {
  x: number
  y: number
  z: number
  gridX: number
  gridY: number
  index: number
}

// Props for the abstracted Grid3D component
export interface Grid3DProps {
  config: Grid3DConfig
  children: (position: Grid3DPosition) => ReactNode
  className?: string
}

// Abstracted 3D grid component that can render any children
const Grid3DComponent = ({ config, children, className = '' }: Grid3DProps) => {
  const { width, height, depth, cardSize, cardSpacing } = config

  // Group positions by z-layer for proper depth handling
  const layerData = useMemo(() => {
    const layers: {
      [key: number]: Grid3DPosition[]
    } = {}

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        for (let z = 0; z < depth; z++) {
          const relativeX = x * (cardSize + cardSpacing)
          const relativeY = y * (cardSize + cardSpacing)
          const relativeZ = z * (cardSize + cardSpacing)

          const position: Grid3DPosition = {
            x: relativeX,
            y: relativeY,
            z: relativeZ,
            gridX: x + 1, // CSS Grid is 1-indexed
            gridY: y + 1,
            index: x + y * width + z * width * height
          }

          if (!layers[z]) {
            layers[z] = []
          }
          layers[z].push(position)
        }
      }
    }

    return layers
  }, [width, height, depth, cardSize, cardSpacing])

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className}`}>
      {Object.entries(layerData).map(([layerZ, positions]) => {
        // Get the actual Z position from the first position in this layer
        const actualZPosition = positions[0]?.z || 0

        return (
          <div
            enable-xr
            key={layerZ}
            className="absolute grid items-center justify-center"
            style={
              {
                '--xr-back': actualZPosition, // Use actual Z position converted to WebSpatial units
                gridTemplateColumns: `repeat(${width}, ${cardSize + cardSpacing}px)`,
                gridTemplateRows: `repeat(${height}, ${cardSize + cardSpacing}px)`,
                gap: `${cardSpacing}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              } as React.CSSProperties
            }
          >
            {positions.map((position) => (
              <div
                key={position.index}
                className="flex items-center justify-center"
                style={{
                  gridColumn: position.gridX,
                  gridRow: position.gridY
                }}
              >
                {children(position)}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

// Memoize the component to prevent re-renders when config doesn't change
export const Grid3D = memo(Grid3DComponent)
