import React, { useState, useEffect } from 'react'
import { Volume3D } from '../components/Volume3D'
import { GameController } from '../components/GameController'
import { defaultConfig, getConfigForEnvironment, type GameConfig } from '../AppConfig'

// Game end celebration component (handles both win and lose)
const GameEndCelebration: React.FC<{ isSpatial: boolean; isWin: boolean; countdown: number }> = ({ isSpatial, isWin, countdown }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([])

  useEffect(() => {
    // Generate particles based on win/lose status
    if (isWin) {
      // Victory confetti - bright colorful particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][i % 8],
        delay: Math.random() * 3
      }))
      setParticles(newParticles)
    } else {
      // Defeat particles - darker, more ominous colors
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#FF4444', '#8B0000', '#4A4A4A', '#2F2F2F', '#1A1A1A', '#FF6B6B'][i % 6],
        delay: Math.random() * 2
      }))
      setParticles(newParticles)
    }
  }, [isWin])

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col items-center justify-center"
      style={{
        '--xr-elevation': isSpatial ? '0.9' : '10',
        enableXr: true,
        zIndex: isSpatial ? undefined : 9999
      } as React.CSSProperties}
    >
      {/* Particles - different colors based on win/lose */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-3 h-3 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animation: 'confetti 3s ease-in-out infinite',
              '--xr-elevation': '0.1',
              enableXr: true,
              boxShadow: isSpatial ? `0 0 10px ${particle.color}` : `0 0 5px ${particle.color}`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Victory elements (only for wins) */}
      {isWin && (
        <>
          {/* Main celebration container - centered with flex */}
          <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Victory text - centered */}
            <div className="text-center animate-bounce mb-8">
              <div className="text-6xl font-black text-yellow-400 drop-shadow-2xl animate-pulse">
                🎉 VICTORY! 🎉
              </div>
              <div className="text-2xl font-bold text-white mt-4 animate-pulse">
                You are a 3D Minesweeper Master!
              </div>
              {countdown > 0 && (
                <div className="text-lg font-bold text-cyan-400 mt-4 animate-pulse">
                  Returning to menu in {countdown}...
                </div>
              )}
            </div>

            {/* Celebration effects positioned around the text */}
            <div className="relative w-full h-96">
              {/* Corner celebrations */}
              <div className="absolute top-0 left-0 text-6xl animate-spin-slow">🎊</div>
              <div className="absolute top-0 right-0 text-6xl animate-spin-slow animation-delay-1000">🎈</div>
              <div className="absolute bottom-0 left-0 text-6xl animate-spin-slow animation-delay-2000">✨</div>
              <div className="absolute bottom-0 right-0 text-6xl animate-spin-slow animation-delay-3000">🌟</div>

              {/* Edge celebrations */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce animation-delay-500">⭐</div>
              <div className="absolute top-0 right-1/4 text-5xl animate-bounce animation-delay-1500">🎉</div>
              <div className="absolute bottom-0 left-1/4 text-5xl animate-bounce animation-delay-2500">🎊</div>
              <div className="absolute bottom-0 right-1/4 text-5xl animate-bounce animation-delay-3500">🏆</div>

              {/* Fireworks */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 animate-ping">
                <div className="w-full h-full bg-yellow-400 rounded-full opacity-75 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-400 rounded-full opacity-90 animate-pulse" />
              </div>

              <div className="absolute top-1/4 right-1/4 w-6 h-6 animate-ping">
                <div className="w-full h-full bg-pink-400 rounded-full opacity-75 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full opacity-90 animate-pulse" />
              </div>

              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-10 h-10 animate-ping">
                <div className="w-full h-full bg-cyan-400 rounded-full opacity-75 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-400 rounded-full opacity-90 animate-pulse" />
              </div>

              {/* Central celebration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce">🎆</div>

              {/* Celebration sparkles */}
              <div className="absolute top-1/4 left-1/6 text-4xl animate-spin-slow">✨</div>
              <div className="absolute top-1/4 right-1/6 text-4xl animate-spin-slow animation-delay-1000">⭐</div>
              <div className="absolute bottom-1/4 left-1/6 text-4xl animate-spin-slow animation-delay-2000">🌟</div>
              <div className="absolute bottom-1/4 right-1/6 text-4xl animate-spin-slow animation-delay-3000">🎊</div>
            </div>
          </div>
        </>
      )}

      {/* Defeat elements (only for losses) */}
      {!isWin && (
        <>
          {/* Main defeat container - centered with flex */}
          <div className="flex flex-col items-center justify-center w-full h-full">
            {/* Defeat text - centered */}
            <div className="text-center animate-bounce mb-8">
              <div className="text-6xl font-black text-red-500 drop-shadow-2xl animate-shake">
                💥 BOOM! 💥
              </div>
              <div className="text-2xl font-bold text-white mt-4 animate-pulse">
                Mine exploded! Try again!
              </div>
              {countdown > 0 && (
                <div className="text-lg font-bold text-orange-400 mt-4 animate-pulse">
                  Returning to menu in {countdown}...
                </div>
              )}
            </div>

            {/* Defeat effects positioned around the text */}
            <div className="relative w-full h-96">
              {/* Corner defeat elements */}
              <div className="absolute top-0 left-0 text-6xl animate-spin-slow">💣</div>
              <div className="absolute top-0 right-0 text-6xl animate-spin-slow animation-delay-1000">☠️</div>
              <div className="absolute bottom-0 left-0 text-6xl animate-spin-slow animation-delay-2000">🔥</div>
              <div className="absolute bottom-0 right-0 text-6xl animate-spin-slow animation-delay-3000">💀</div>

              {/* Edge defeat elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce animation-delay-500">💥</div>
              <div className="absolute top-0 right-1/4 text-5xl animate-bounce animation-delay-1500">☠️</div>
              <div className="absolute bottom-0 left-1/4 text-5xl animate-bounce animation-delay-2500">🔥</div>
              <div className="absolute bottom-0 right-1/4 text-5xl animate-bounce animation-delay-3500">💀</div>

              {/* Explosion effects */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 animate-ping">
                <div className="w-full h-full bg-red-600 rounded-full opacity-75 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-800 rounded-full opacity-90 animate-pulse" />
              </div>

              <div className="absolute top-1/4 right-1/4 w-6 h-6 animate-ping">
                <div className="w-full h-full bg-orange-600 rounded-full opacity-75 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-700 rounded-full opacity-90 animate-pulse" />
              </div>

              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-10 h-10 animate-ping">
                <div className="w-full h-full bg-gray-800 rounded-full opacity-75 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full opacity-90 animate-pulse" />
              </div>

              {/* Central explosion */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-shake">💥</div>

              {/* Defeat smoke/ash */}
              <div className="absolute top-1/4 left-1/6 text-4xl animate-spin-slow">💨</div>
              <div className="absolute top-1/4 right-1/6 text-4xl animate-spin-slow animation-delay-1000">☁️</div>
              <div className="absolute bottom-1/4 left-1/6 text-4xl animate-spin-slow animation-delay-2000">🌫️</div>
              <div className="absolute bottom-1/4 right-1/6 text-4xl animate-spin-slow animation-delay-3000">⚫</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export const MinefieldPage: React.FC = () => {
  const isSpatial = navigator.userAgent.includes("WebSpatial") || import.meta.env.XR_ENV === "avp"

  // Get difficulty from URL parameters
  const [gameConfig, setGameConfig] = useState(defaultConfig)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const difficultyParam = urlParams.get('difficulty') as keyof GameConfig['difficulty']['preset']

      if (difficultyParam && defaultConfig.difficulty.preset[difficultyParam]) {
        // Get the complete config adjusted for the current environment
        const updatedConfig = getConfigForEnvironment(difficultyParam, isSpatial)
        setGameConfig(updatedConfig)
      }
    }
  }, [isSpatial])

  // Game state
  const [gameStats, setGameStats] = useState<{
    revealedCount: number
    flagCount: number
    mineCount: number
    remainingMines: number
    progress: number
    elapsedTime: number
  } | null>(null)

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Initialize game controller
  const gameControls = GameController({
    config: gameConfig,
    onGameStateChange: () => {}, // We don't need to track game state changes in this component
    onGameEnd: (won, stats) => {
      setGameStats(stats)
      setIsWin(won)
      setShowCelebration(true)

      if (won) {
        // For wins, show celebration for 6 seconds total
        setCountdown(6)
        let count = 6
        const countdownInterval = setInterval(() => {
          count--
          setCountdown(count)
          if (count <= 0) {
            clearInterval(countdownInterval)
            setShowCelebration(false)
            setCountdown(0)
            // Extra delay to let celebration fade out
            setTimeout(() => {
              if (typeof window !== 'undefined' && window.opener) {
                window.close()
              }
            }, 1000)
          }
        }, 1000)
      } else {
        // For losses, show celebration for 3 seconds, then close
        setCountdown(3)
        let count = 3
        const countdownInterval = setInterval(() => {
          count--
          setCountdown(count)
          if (count <= 0) {
            clearInterval(countdownInterval)
            setShowCelebration(false)
            setCountdown(0)
            if (typeof window !== 'undefined' && window.opener) {
              window.close()
            }
          }
        }, 1000)
      }
      console.log(won ? 'You won!' : 'Game Over!', stats)
    }
  })

  // Set up scene initialization defaults for WebSpatial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.xrCurrentSceneDefaults = async (defaultConfig) => {
        return {
          ...defaultConfig,
          defaultSize: {
            width: 1200,
            height: 800
          }
        }
      }
    }
  }, [])

  const handleResetGame = () => {
    gameControls.resetGame()
    setGameStats(null)
  }

  const handleExitGame = () => {
    if (typeof window !== 'undefined' && window.opener) {
      window.close()
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden text-white font-inter font-normal leading-relaxed">
      {/* Game UI Header */}
      <div
        className="flex justify-between items-center p-4"
        style={{
          '--xr-background-material': isSpatial ? 'thin' : 'none',
          '--xr-back': 10,
          '--xr-elevation': '0.1',
          enableXr: true,
          background: isSpatial ? 'transparent' : 'rgba(0, 0, 0, 0.5)'
        } as React.CSSProperties}
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">3D Minesweeper</h1>
          <div className="text-sm">
            Mines: {gameStats?.remainingMines || gameConfig.mines.count}
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
            style={{
              '--xr-background-material': 'thin',
              '--xr-back': 5,
              enableXr: true
            } as React.CSSProperties}
          >
            {gameControls.flagMode ? 'Flag Mode' : 'Reveal Mode'}
          </button>

          <button
            onClick={handleResetGame}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            style={{
              '--xr-background-material': 'thin',
              '--xr-back': 5,
              enableXr: true
            } as React.CSSProperties}
          >
            Reset
          </button>

          <button
            onClick={handleExitGame}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            style={{
              '--xr-background-material': 'thin',
              '--xr-back': 5,
              enableXr: true
            } as React.CSSProperties}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Game Status */}
      {gameControls.isGameOver && (
        <div
          className={`text-center py-2 text-lg font-bold ${
            gameControls.isWon ? 'text-green-400' : 'text-red-400'
          }`}
          style={{
            '--xr-background-material': isSpatial ? 'thin' : 'none',
            '--xr-back': 10,
            '--xr-elevation': '0.05',
            enableXr: true,
            background: isSpatial ? 'transparent' : 'rgba(0, 0, 0, 0.3)'
          } as React.CSSProperties}
        >
          {gameControls.isWon ? '🎉 You Won! 🎉' : '💥 Game Over! 💥'}
        </div>
      )}

      {/* Game End Celebration */}
      {showCelebration && gameControls.isGameOver && (
        <GameEndCelebration isSpatial={isSpatial} isWin={isWin} countdown={countdown} />
      )}

      {/* 3D Minefield */}
      <div
        className="flex-1 relative h-full w-full"
        style={{
          '--xr-scene': 'minefield',
          '--xr-background-material': 'transparent',
          '--xr-elevation': '0.5',
          enableXr: true
        } as React.CSSProperties}
      >
        <Volume3D config={gameConfig} gameControls={gameControls} />
      </div>
    </div>
  )
}
