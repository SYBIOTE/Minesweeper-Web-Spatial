

import { useState } from 'react'
import { Volume3D } from './components/Volume3D'
import { GameController } from './components/GameController'
import { defaultConfig } from './AppConfig'

export const App = () => {
  const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"
  
  // Game configuration - can be made dynamic later
  const gameConfig = defaultConfig
  
  // Game state
  const [gameStats, setGameStats] = useState<{
    revealedCount: number
    flagCount: number
    mineCount: number
    remainingMines: number
    progress: number
    elapsedTime: number
  } | null>(null)
  
  // Initialize game controller
  const gameControls = GameController({
    config: gameConfig,
    onGameStateChange: () => {}, // We don't need to track game state changes in this component
    onGameEnd: (won, stats) => {
      setGameStats(stats)
      console.log(won ? 'You won!' : 'Game Over!', stats)
    }
  })
  
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden text-white font-inter font-normal leading-relaxed" style={{ background: isSpatial ? 'none' : 'radial-gradient(ellipse at 50% -20%,rgba(0, 0, 0, 0.7) 0%, rgba(16,25,30,1) 100%)' }}>
      {/* Game UI Header */}
      <div className="flex justify-between items-center p-4 bg-black bg-opacity-50">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">3D Minesweeper</h1>
          <div className="text-sm">
            Mines: {gameStats?.remainingMines || gameConfig.difficulty.preset[gameConfig.difficulty.level].mines}
          </div>
          <div className="text-sm">
            Progress: {gameStats?.progress || 0}%
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={gameControls.toggleFlagMode}
            className={`px-3 py-1 rounded text-sm ${
              gameControls.flagMode 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-600 text-gray-200'
            }`}
          >
            {gameControls.flagMode ? 'Flag Mode' : 'Reveal Mode'}
          </button>
          
          <button
            onClick={gameControls.resetGame}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Game Status */}
      {gameControls.isGameOver && (
        <div className={`text-center py-2 text-lg font-bold ${
          gameControls.isWon ? 'text-green-400' : 'text-red-400'
        }`}>
          {gameControls.isWon ? '🎉 You Won! 🎉' : '💥 Game Over! 💥'}
        </div>
      )}

      <div className="flex-1 relative h-full w-full">
        <Volume3D config={gameConfig} gameControls={gameControls} />
      </div>
    </div>
  )
}
