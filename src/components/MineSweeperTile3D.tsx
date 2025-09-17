  import { Canvas } from '@react-three/fiber'
import { memo } from 'react'
import { GraphicsFallback } from './GraphicsFallback'
import { Text } from '@react-three/drei'
import type { GameConfig } from '../AppConfig'
import defaultConfig from '../AppConfig'

type MinesweeperTileProps = {
  variant?: 'empty' | 'revealed' | 'bomb' | 'flag' | 'number'
  number?: number
  config?: GameConfig
  active?: boolean
}

const CardContent3D = ({ variant = 'empty', number, config }: { variant?: MinesweeperTileProps['variant'], number?: number, config: GameConfig }) => {
  const size = config.spatial.cardSize
  const unrevealedColor = config.visual.cardColors.unrevealed
  const mineColor = config.visual.cardColors.mine
  const flagColor = config.visual.cardColors.flag
  const numberColors = config.visual.cardColors.number
  const ambI = config.visual.lighting.ambientIntensity
  const dirI = config.visual.lighting.directionalIntensity

  return (
    <>
      <ambientLight intensity={ambI} />
      <directionalLight position={[1, 1, 1]} intensity={dirI} />

      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial
          color={unrevealedColor}
          transparent
          opacity={0.25}
          metalness={0.1}
          roughness={0.4}
          transmission={0.6}
          thickness={0.25}
        />
      </mesh>

      {variant === 'bomb' && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={mineColor} metalness={0.5} roughness={0.3} />
        </mesh>
      )}

      {variant === 'flag' && (
        <>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 12]} />
            <meshStandardMaterial color="#cccccc" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.05, 0.18]} rotation={[0, Math.PI, 0]}>
            <coneGeometry args={[0.18, 0.24, 24]} />
            <meshStandardMaterial color={flagColor} metalness={0.2} roughness={0.5} />
          </mesh>
        </>
      )}

      {variant === 'number' && typeof number === 'number' && (
        <Text
          position={[0, 0, 0.36]}
          fontSize={0.35}
          color={numberColors[Math.max(0, Math.min(7, (number || 1) - 1))]}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#1a3c3b"
        >
          {String(number)}
        </Text>
      )}

      {variant === 'revealed' && (
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
        </mesh>
      )}
    </>
  )
}

const MinesweeperTileComponent = ({ variant = 'empty', number, config = defaultConfig, active = true }: MinesweeperTileProps) => {
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
    <Canvas
      camera={{ position: [0.8, 0.8, 1.3], fov: 50 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      fallback={<GraphicsFallback />}
      frameloop="demand"
      dpr={[0.5, 1]}
      shadows={false}
      gl={{ 
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      }}
      onCreated={(state) => { 
        try {
          (state as unknown as { raycaster: { firstHitOnly: boolean } }).raycaster.firstHitOnly = true 
        } catch (e) {
          console.warn('Failed to set raycaster property:', e)
        }
      }}
      onError={(error) => {
        console.warn('Canvas error:', error)
      }}
    >
      <CardContent3D variant={variant} number={number} config={config} />
    </Canvas>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const MinesweeperUnit = memo(MinesweeperTileComponent)
