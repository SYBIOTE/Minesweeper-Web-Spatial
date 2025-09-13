import { OrbitControls } from '@react-three/drei'
  import { Canvas } from '@react-three/fiber'
import { memo, useRef } from 'react'
import { GraphicsFallback } from './GraphicsFallback'

import { WebGPURenderer } from 'three/webgpu'

interface Scene3DProps {


}

const createGLContext = (webGPUEnabled: boolean) => {
  if (webGPUEnabled) {
    return async (props: any) => {
      const renderer = new WebGPURenderer(props)
      await renderer.init()
      return renderer
    }
  }
  
  return {
    antialias: false,
    powerPreference: 'high-performance' as WebGLPowerPreference,
    alpha: true,
    stencil: false,
    depth: true,
    preserveDrawingBuffer: false
  }
}


const Scene3DComponent = ({  }: Scene3DProps) => {
  // cnavs for one card on the 3d grid

  return (  
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.6, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        fallback={<GraphicsFallback />}
        gl={createGLContext(true)}
        shadows={false}
        onCreated={(state) => { (state as any).raycaster.firstHitOnly = true }}
      >
        <SceneContent
        />
      </Canvas>
    </div>
  )
}

const SceneContent = ({

}: Scene3DProps) => {
  const controlsRef = useRef<any>(null)
  // the camera , the lighting and the 3d model for the card, can be a 3d number a mine or a flag ,or empty space for the individual card

  return (
    <>
      {/* Camera setup */}
      
      <OrbitControls
        ref={controlsRef}
        target={[0, 0, -1]}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={10}
      />

      {/* Lighting */}
      {true && (
        <>
          <ambientLight intensity={0.3} color={0xffffff} />
          <directionalLight position={[1, 1, 1]} intensity={0.8} color={0xffffff}/>
        </>
      )}

    </>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const Scene3D = memo(Scene3DComponent)
