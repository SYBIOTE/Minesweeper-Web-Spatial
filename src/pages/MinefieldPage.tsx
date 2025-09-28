import React, { useEffect, useState } from 'react'

import { defaultConfig, getConfigForEnvironment, type GameConfig } from '../AppConfig'
import { BombIcon } from '../assets/svgs/pixels/minefield/BombIcon'
import { FlagIcon as PixelFlagIcon } from '../assets/svgs/pixels/minefield/FlagIcon'
import { NumberIcon } from '../assets/svgs/pixels/minefield/NumberIcon'
import { PixelBackground } from '../components/PixelBackground'
import { GameController } from '../components/hooks/GameController'
import { Volume3D } from '../components/Volume3D'
import { useAudio } from '../components/hooks/useAudio'
import { SoundIcon } from '../assets/svgs/pixels/start/SoundIcon'
import { FlagModeIcon } from '../assets/svgs/pixels/minefield/FlagModeIcon'
import { RevealIcon } from '../assets/svgs/pixels/minefield/RevealIcon'
import { ExitIcon } from '../assets/svgs/pixels/minefield/ExitIcon'
import { ResetIcon } from '../assets/svgs/pixels/minefield/ResetIcon'

const GameEndCelebration: React.FC<{ isSpatial: boolean; isWin: boolean; countdown: number }> = ({
  isSpatial,
  isWin,
  countdown
}) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={
        {
          '--xr-elevation': isSpatial ? '0.9' : '10',
          enableXr: true,
          background: isWin
            ? 'linear-gradient(135deg, rgba(34,197,94,0.85), rgba(13,148,136,0.85))'
            : 'linear-gradient(135deg, rgba(239,68,68,0.85), rgba(55,65,81,0.85))',
          zIndex: isSpatial ? undefined : 9999,
          imageRendering: 'pixelated'
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-auto flex flex-col items-center gap-4 px-6 py-8 border-4 border-white bg-black/70 shadow-[4px_4px_0_rgba(0,0,0,0.7)]">
        <div className="w-16 h-16 animate-bounce">
          {isWin ? <PixelFlagIcon className="w-full h-full" /> : <BombIcon className="w-full h-full" />}
        </div>

        <div
          className="text-center uppercase tracking-wider text-white"
          style={{ fontFamily: '"Press Start 2P", "Courier New", monospace' }}
        >
          <p className="text-xl sm:text-2xl font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)]">
            {isWin ? 'Mission Cleared' : 'Mine Triggered'}
          </p>
          <p className="mt-3 text-xs text-gray-200">
            {isWin ? 'All mines flagged. Sector secure.' : 'Explosion detected. Sector lost.'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <NumberIcon value={isWin ? 0 : 8} className="w-10 h-10" />
          {countdown > 0 && (
            <p
              className="text-xs uppercase text-cyan-300"
              style={{ fontFamily: '"Press Start 2P", "Courier New", monospace' }}
            >
              returning in {countdown}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export const MinefieldPage: React.FC = () => {
  const isSpatial = navigator.userAgent.includes('WebSpatial') || import.meta.env.XR_ENV === 'avp'

  // Get difficulty from URL parameters
  const [gameConfig, setGameConfig] = useState(defaultConfig)
  const { audioEnabled, setEnabled: setAudioEnabled, playSound } = useAudio(gameConfig)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const difficultyParam = urlParams.get('difficulty') as keyof GameConfig['difficulty']['preset']
      const modeParam = urlParams.get('mode') // '2d' or '3d'
      
      // Determine if we should use 3D mode based on URL parameter or fallback to spatial detection
      const use3DMode = modeParam ? modeParam === '3d' : isSpatial

      if (difficultyParam && defaultConfig.difficulty.preset[difficultyParam]) {
        // Get the complete config adjusted for the selected mode
        const updatedConfig = getConfigForEnvironment(difficultyParam, use3DMode)
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

      const startCelebration = () => {
        setShowCelebration(true)
        playSound(won ? 'win' : 'lose')
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
      }

      setTimeout(startCelebration, 2000)

      console.log(won ? 'You won!' : 'Game Over!', stats)
    }
  })

  // Set up scene initialization defaults for WebSpatial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.xrCurrentSceneDefaults = async (defaultConfig) => {
        const isSpatial = navigator.userAgent.includes('WebSpatial') || import.meta.env.XR_ENV === 'avp'

        if (isSpatial) {
          return {
            ...defaultConfig,
            defaultSize: {
              width: 1000,
              height: 1000
            }
          }
        } else {
          return {
            ...defaultConfig,
            defaultSize: {
              width: 1200,
              height: 800
            }
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
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden text-white leading-relaxed ${
        isSpatial ? 'bg-transparent' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}
      style={{
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        imageRendering: 'pixelated'
      }}
    >
      {/* Pixel Art Background Elements */}
      {!isSpatial && <PixelBackground />}

      {/* Game UI Header */}
      <div
        className="z-10 flex justify-between items-center p-4 border-b-4 border-white shadow-[4px_4px_0_rgba(0,0,0,0.6)] bg-black uppercase tracking-wide"
        style={
          {
            '--xr-background-material': isSpatial ? 'thin' : 'none',
            '--xr-back': 10,
            '--xr-elevation': '0.1',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            enableXr: true,
            background: isSpatial ? 'transparent' : 'rgba(0, 0, 0, 0.85)'
          } as React.CSSProperties
        }
      >
        <div className="flex items-center space-x-6 text-xs">
          <h1 className="text-base sm:text-lg font-bold text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
            3D MINESWEEPER
          </h1>
          <div className="flex items-center gap-2 text-cyan-300">
            <PixelFlagIcon className="w-8 h-8" />
            <span>Mines {gameStats?.remainingMines ?? gameConfig.mines.count}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-200">
            <NumberIcon
              className="w-8 h-8"
              value={Math.min(8, Math.max(1, Math.round((gameStats?.progress || 0) / 12) || 1))}
            />
            <span>Progress {(gameStats?.progress || 0).toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-1 py-1 border-2 border-white shadow-[2px_2px_0_rgba(0,0,0,0.6)] flex items-center gap-1`}
              style={
                {
                  '--xr-background-material': 'thin',
                  '--xr-back': 5,
                  enableXr: true
                } as React.CSSProperties
              }
            >
              <SoundIcon className="w-8 h-8" isEnabled={audioEnabled} />
            </button>
          <button
            onClick={gameControls.toggleFlagMode}
            className={`px-1 py-1 border-2 border-white shadow-[2px_2px_0_rgba(0,0,0,0.6)] flex items-center gap-1 `}
            style={
              {
                '--xr-background-material': 'thin',
                '--xr-back': 5,
                enableXr: true
              } as React.CSSProperties
            }
          >
            {gameControls.flagMode ? 
              <FlagModeIcon className="w-8 h-8" /> : 
              <RevealIcon className="w-8 h-8" />
            }
          </button>
          

          <button
            onClick={handleResetGame}
            className="px-1 py-1 border-2 border-white text-white shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-gray-800 flex items-center gap-1"
            style={
              {
                '--xr-background-material': 'thin',
                '--xr-back': 5,
                enableXr: true
              } as React.CSSProperties
            }
          >
            <ResetIcon className="w-8 h-8" />
          </button>

          <button
            onClick={handleExitGame}
            className="px-1 py-1 border-2 border-white text-white shadow-[2px_2px_0_rgba(0,0,0,0.6)] hover:bg-gray-800 flex items-center gap-1"
            style={
              {
                '--xr-background-material': 'thin',
                '--xr-back': 5,
                enableXr: true
              } as React.CSSProperties
            }
          >
            <ExitIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Game Status */}
      {gameControls.isGameOver && (
        <div
          className={`text-center py-3 text-sm font-bold uppercase tracking-wide border-b-4 ${
            gameControls.isWon ? 'border-green-400 text-green-300' : 'border-red-500 text-red-300'
          }`}
          style={
            {
              '--xr-background-material': isSpatial ? 'thin' : 'none',
              '--xr-back': 10,
              '--xr-elevation': '0.05',
              enableXr: true,
              background: isSpatial ? 'transparent' : 'rgba(0, 0, 0, 0.75)'
            } as React.CSSProperties
          }
        >
          {gameControls.isWon ? 'VICTORY SECURED' : 'MINE DETONATED'}
        </div>
      )}

      {/* Game End Celebration */}
      {showCelebration && gameControls.isGameOver && (
        <GameEndCelebration isSpatial={isSpatial} isWin={isWin} countdown={countdown} />
      )}

      {/* 3D Minefield */}
      <div
        className="relative h-full w-full"
        style={
          {
            '--xr-scene': 'minefield',
            '--xr-background-material': 'transparent',
            '--xr-elevation': '0.5',
            enableXr: true
          } as React.CSSProperties
        }
      >
        <Volume3D config={gameConfig} gameControls={gameControls} />
      </div>
    </div>
  )
}
