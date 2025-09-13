import { memo } from 'react'


interface Volume3DProps {

}
// will contain the 3d volume and responsible for generating the 3d grid of webspatial cards for minesweeper
const Volume3DComponent = ({
}: Volume3DProps) => {
  const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"
  return (
    <div  className="flex-1 h-full flex flex-col backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg" style={{ background: isSpatial ? 'none' : 'radial-gradient(ellipse at 50% -20%,rgba(0, 0, 0, 0.7) 0%, rgba(16,25,30,1) 100%)' }}>
      <div className="w-full h-full relative" >
        {/* will have loop to genersate cards in 3d space using webSpatial specific logic */}
      </div>
    </div>
  )
}

// Memoize the component to prevent re-renders when services don't change
export const Volume3D = memo(Volume3DComponent)
