

import { defaultConfig, type GameConfig } from './AppConfig'
import { GameStartScene } from './components/GameStartScene'

export const App = () => {
  const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"

  // Game configuration - can be made dynamic later
  const gameConfig = defaultConfig


  // Scene handlers
  const handleStartGame = (difficulty: keyof GameConfig['difficulty']['preset']) => {
    // Initialize the minefield scene with proper WebSpatial configuration
    if (typeof window !== 'undefined') {
      try {
        // Import initScene dynamically to avoid SSR issues
        import('@webspatial/react-sdk').then(({ initScene }) => {
          initScene('minefieldScene', (prevConfig) => {
            return {
              ...prevConfig,
              defaultSize: {
                width: 1200,
                height: 800
              },
              // Position the new scene to the side of the current scene
              position: {
                x: 1500, // Move to the right
                y: 0,
                z: 0
              }
            }
          })

          // Open the minefield scene in a new window with difficulty parameter
          window.open(`/minefield?difficulty=${difficulty}`, 'minefieldScene')
        })
      } catch (error) {
        console.warn('WebSpatial SDK not available, opening in same window:', error)
        // Fallback for non-spatial environments
        if (window.location) {
          window.location.href = `/minefield?difficulty=${difficulty}`
        }
      }
    } else {
      // Fallback for non-spatial environments (shouldn't happen in browser)
      console.warn('Window not available')
    }
  }

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden text-white font-inter font-normal leading-relaxed"
      style={{
        background: isSpatial ? 'none' : 'radial-gradient(ellipse at 50% -20%,rgba(0, 0, 0, 0.7) 0%, rgba(16,25,30,1) 100%)',
        '--xr-scene': 'main',
        enableXr: true
      } as React.CSSProperties}
    >
      <GameStartScene
        config={gameConfig}
        isSpatial={isSpatial}
        onStartGame={handleStartGame}
      />
    </div>
  )
}
