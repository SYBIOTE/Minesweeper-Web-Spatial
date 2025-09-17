


import { Volume3D } from './components/Volume3D'
import { defaultConfig } from './AppConfig'


export const App = () => {
  const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"
  
  // Game configuration - can be made dynamic later
  const gameConfig = defaultConfig
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden text-white font-inter font-normal leading-relaxed" style={{ background: isSpatial ? 'none' : 'radial-gradient(ellipse at 50% -20%,rgba(0, 0, 0, 0.7) 0%, rgba(16,25,30,1) 100%)' }}>
      <div className="flex-1 relative h-full w-full">
        <Volume3D config={gameConfig} />

        {/* additional UI for game start , end , and settings */}
      </div>
    </div>
  )
}
