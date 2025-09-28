import { defaultConfig, type GameConfig } from './AppConfig'
import { GameStartScene } from './pages/GameStartScene'

export const App = () => {
  const isSpatial = navigator.userAgent.includes('WebSpatial') || import.meta.env.XR_ENV === 'avp'

  // Game configuration - can be made dynamic later
  const gameConfig = defaultConfig

  // Scene handlers
  const handleStartGame = (difficulty: keyof GameConfig['difficulty']['preset'], is3DMode: boolean) => {
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
              }
            }
          })

          // Open the minefield scene in a new window with difficulty and mode parameters
          window.open(`/minefield?difficulty=${difficulty}&mode=${is3DMode ? '3d' : '2d'}`, 'minefieldScene')
        })
      } catch (error) {
        console.warn('WebSpatial SDK not available, opening in same window:', error)
        // Fallback for non-spatial environments
        if (window.location) {
          window.location.href = `/minefield?difficulty=${difficulty}&mode=${is3DMode ? '3d' : '2d'}`
        }
      }
    } else {
      // Fallback for non-spatial environments (shouldn't happen in browser)
      console.warn('Window not available')
    }
  }

  return (
    <div
      enable-xr
      className="flex flex-col h-screen w-full overflow-hidden text-white font-inter font-normal leading-relaxed"
      style={
        {
          background: isSpatial
            ? 'none'
            : 'radial-gradient(ellipse at 50% -20%,rgba(0, 0, 0, 0.7) 0%, rgba(16,25,30,1) 100%)',
          '--xr-scene': 'main'
        } as React.CSSProperties
      }
    >
      <GameStartScene config={gameConfig} isSpatial={isSpatial} onStartGame={handleStartGame} />
    </div>
  )
}
