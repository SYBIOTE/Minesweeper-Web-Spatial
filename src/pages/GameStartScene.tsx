import React, { useMemo, useState } from 'react'

import { getConfigForEnvironment, getPresetForEnvironment, type GameConfig } from '../AppConfig'
import { ArrowKeysIcon } from '../assets/svgs/pixels/start/ArrowKeysIcon'
import { BombIcon } from '../assets/svgs/pixels/minefield/BombIcon'
import { BeginnerIcon, ExpertIcon, IntermediateIcon } from '../assets/svgs/pixels/start/DifficultyIcons'
import { FlagIcon as PixelFlagIcon } from '../assets/svgs/pixels/minefield/FlagIcon'
import { MiniFlagIcon } from '../assets/svgs/pixels/start/MiniFlagIcon'
import { MiniMineIcon } from '../assets/svgs/pixels/start/MiniMineIcon'
import { MouseCursorIcon } from '../assets/svgs/pixels/start/MouseCursorIcon'
import { NumberIcon } from '../assets/svgs/pixels/minefield/NumberIcon'
import { TargetIcon } from '../assets/svgs/pixels/start/TargetIcon'
import { ToggleIcon } from '../assets/svgs/pixels/start/ToggleIcon'
import { SpatialIcon } from '../assets/svgs/pixels/start/SpatialIcon'
import { BrowserIcon } from '../assets/svgs/pixels/start/BrowserIcon'
import { GamepadIcon } from '../assets/svgs/pixels/start/GamepadIcon'
import { PixelBackground } from '../components/common/PixelBackground'

interface GameStartSceneProps {
  config: GameConfig
  isSpatial: boolean
  onStartGame: (selectedDifficulty: keyof GameConfig['difficulty']['preset'], is3DMode: boolean) => void
}

export const GameStartScene: React.FC<GameStartSceneProps> = ({ config, isSpatial, onStartGame }) => {
  const { difficulty } = config
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty.level)
  // 2D/3D toggle state - default to 2D for normal browsers, 3D for spatial
  const [is3DMode, setIs3DMode] = useState(isSpatial)
  
  const currentPreset = getPresetForEnvironment(selectedDifficulty, is3DMode)
  const currentConfig = getConfigForEnvironment(selectedDifficulty, is3DMode)

  const difficultyLevels: (keyof GameConfig['difficulty']['preset'])[] = ['beginner', 'intermediate', 'expert']

  const difficultyIcons = useMemo(
    () => ({
      beginner: <BeginnerIcon />,
      intermediate: <IntermediateIcon />,
      expert: <ExpertIcon />
    }),
    []
  )

  return (
    <div
      className={`h-full w-full text-white overflow-hidden ${
        isSpatial ? 'bg-transparent' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`}
      style={
        {
          '--xr-background-material': isSpatial ? 'thick' : 'none',
          '--xr-back': 20,
          '--xr-elevation': '0.3',
          enableXr: true,
          fontFamily: '"Press Start 2P", "Courier New", monospace',
          imageRendering: 'pixelated'
        } as React.CSSProperties
      }
    >
      {/* Pixel Art Background Elements */}
      {!isSpatial && <PixelBackground />}

      {/* Main Content - No Scrolling */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-6xl w-100 mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        {/* Title Section */}
        <div
          className="text-center mb-2 sm:mb-3 lg:mb-4 p-2 border-2 border-white"
          style={
            {
              '--xr-background-material': isSpatial ? 'thin' : 'none',
              '--xr-back': 10,
              '--xr-elevation': '0.15',
              enableXr: true,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(255, 255, 255, 0.2)'
            } as React.CSSProperties
          }
        >
          <h1
            className="text-xl sm:text-3xl lg:text-5xl font-bold mb-1 sm:mb-2 text-white tracking-wider uppercase select-none"
            style={{
              textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
              letterSpacing: '0.1em',
              userSelect: 'none'
            }}
          >
            {is3DMode ? '3D MINESWEEPER' : (
              <>
                <span className="relative inline-block text-red-400" style={{ opacity: 0.6 }}>
                  3
                  <span 
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 font-bold"
                    style={{ 
                      fontSize: '1.4em',
                      fontFamily: '"Press Start 2P", "Courier New", monospace',
                      textShadow: '1px 1px 0px #000',
                      lineHeight: '1'
                    }}
                  >
                    ×
                  </span>
                </span>
                <span className="text-cyan-400">2</span>
                D MINESWEEPER
              </>
            )}
          </h1>
          <p
            className="text-xs sm:text-sm lg:text-base text-gray-300 tracking-wide px-4 uppercase"
            style={{ letterSpacing: '0.05em' }}
          >
            Navigate through <span className="text-cyan-400 font-bold">{is3DMode ? '3D SPACE' : '2D GRID'}</span> to find hidden mines
          </p>
          <div className="mt-1 sm:mt-2 flex justify-center space-x-3 items-center">
            <div className="animate-bounce w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
              <BombIcon className="w-full h-full" />
            </div>

            <div className="animate-bounce animation-delay-200 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
              <PixelFlagIcon className="w-full h-full" />
            </div>

            <div className="animate-bounce animation-delay-400 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
              <NumberIcon value={3} className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div
          className="mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 lg:p-4 border-2 border-gray-400 w-full max-w-3xl"
          style={
            {
              '--xr-background-material': isSpatial ? 'thin' : 'none',
              '--xr-back': 15,
              '--xr-elevation': '0.1',
              enableXr: true,
              background: isSpatial ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.7), 1px 1px 0px rgba(255, 255, 255, 0.3)'
            } as React.CSSProperties
          }
        >
          <h2
            className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-center uppercase tracking-wide"
            style={{
              textShadow: '1px 1px 0px #000',
              letterSpacing: '0.1em'
            }}
          >
            CHOOSE YOUR CHALLENGE
          </h2>

          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="relative w-full max-w-xs">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as keyof GameConfig['difficulty']['preset'])}
                className={`appearance-none text-white text-sm sm:text-base lg:text-lg font-bold px-3 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 pr-6 sm:pr-8 lg:pr-10 cursor-pointer border-2 border-white w-full uppercase tracking-wide`}
                style={
                  {
                    '--xr-background-material': 'thick',
                    '--xr-back': 8,
                    '--xr-elevation': '0.05',
                    enableXr: true,
                    backgroundColor:
                      selectedDifficulty === 'beginner'
                        ? '#22c55e'
                        : selectedDifficulty === 'intermediate'
                          ? '#eab308'
                          : '#ef4444',
                    boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), inset -1px -1px 0px rgba(0, 0, 0, 0.3)',
                    transition: 'none',
                    letterSpacing: '0.05em'
                  } as React.CSSProperties
                }
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level} className="bg-gray-800 text-white">
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Selected Difficulty Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center break-words">
            <div
              className="p-2 sm:p-3 border border-cyan-400"
              style={
                {
                  '--xr-background-material': isSpatial ? 'thin' : 'none',
                  '--xr-back': 5,
                  '--xr-elevation': '0.03',
                  enableXr: true,
                  background: 'rgba(0, 0, 0, 0.8)',
                  boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.5), inset 1px 1px 0px rgba(255, 255, 255, 0.1)'
                } as React.CSSProperties
              }
            >
              <div className="text-xs text-gray-300 mb-1 uppercase tracking-wide">Grid Size</div>
              <div className="text-sm sm:text-base text-cyan-400">
                {currentPreset.width}×{currentPreset.height}×{currentPreset.depth}
              </div>
              <div className="text-xs text-gray-400 uppercase">cells</div>
            </div>
            <div
              className="p-2 sm:p-3 border border-red-400"
              style={
                {
                  '--xr-background-material': isSpatial ? 'thin' : 'none',
                  '--xr-back': 5,
                  '--xr-elevation': '0.03',
                  enableXr: true,
                  background: 'rgba(0, 0, 0, 0.8)',
                  boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.5), inset 1px 1px 0px rgba(255, 255, 255, 0.1)'
                } as React.CSSProperties
              }
            >
              <div className="text-xs text-gray-300 mb-1 uppercase tracking-wide">Mines</div>
              <div className="text-sm sm:text-base text-red-400">{currentConfig.mines.count}</div>
              <div className="text-xs text-gray-400 uppercase">dangers</div>
            </div>
            <div
              className="p-2 sm:p-3 border border-yellow-400"
              style={
                {
                  '--xr-background-material': isSpatial ? 'thin' : 'none',
                  '--xr-back': 5,
                  '--xr-elevation': '0.03',
                  enableXr: true,
                  background: 'rgba(0, 0, 0, 0.8)',
                  boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.5), inset 1px 1px 0px rgba(255, 255, 255, 0.1)'
                } as React.CSSProperties
              }
            >
              <div className="text-xs text-gray-300 mb-1 uppercase tracking-wide">Level</div>
              <div className="flex justify-center">
                <span className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                  {difficultyIcons[selectedDifficulty as keyof typeof difficultyIcons]}
                </span>
              </div>
              <div className="text-xs text-gray-400 uppercase text-center">{selectedDifficulty}</div>
            </div>
          </div>
        </div>

        {/* 2D/3D Toggle - Only show in spatial environments */}
        {isSpatial && (
          <div
            className="mb-2 sm:mb-3 p-2 sm:p-3 border-2 border-purple-400 w-full max-w-md"
            style={
              {
                '--xr-background-material': 'thin',
                '--xr-back': 12,
                '--xr-elevation': '0.06',
                enableXr: true,
                background: 'rgba(0, 0, 0, 0.9)',
                boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.7), 1px 1px 0px rgba(255, 255, 255, 0.3)'
              } as React.CSSProperties
            }
          >
            <h3
              className="text-sm sm:text-base font-bold mb-2 text-center uppercase tracking-wide text-purple-300"
              style={{ textShadow: '1px 1px 0px #000' }}
            >
              Game Mode
            </h3>
            
            <div className="flex justify-center">
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`px-4 py-2 text-sm font-bold border-2 uppercase tracking-wide transition-all flex items-center gap-2 ${
                  is3DMode 
                    ? 'bg-purple-600 text-white border-purple-400' 
                    : 'bg-cyan-600 text-white border-cyan-400'
                }`}
                style={
                  {
                    '--xr-background-material': 'thick',
                    '--xr-back': 8,
                    '--xr-elevation': '0.04',
                    enableXr: true,
                    boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8), inset -1px -1px 0px rgba(0, 0, 0, 0.3)',
                    textShadow: '1px 1px 0px #000'
                  } as React.CSSProperties
                }
              >
                <ToggleIcon className="w-4 h-4" is3D={is3DMode} />
                {is3DMode ? '3D MODE' : '2D MODE'} - Click to Toggle
              </button>
            </div>
            
            <div className="mt-2 text-xs text-center text-gray-400">
              {is3DMode ? 'Navigate in 3D space' : 'Classic flat grid view'}
            </div>
          </div>
        )}

        {/* Enhanced Instructions */}
        <div
          className="mb-2 sm:mb-3 p-2 sm:p-3 border-2 border-white w-full max-w-lg"
          style={
            {
              '--xr-background-material': isSpatial ? 'thin' : 'none',
              '--xr-back': 15,
              '--xr-elevation': '0.08',
              enableXr: true,
              background: 'rgba(0, 0, 0, 0.9)',
              boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.7), 1px 1px 0px rgba(255, 255, 255, 0.2)'
            } as React.CSSProperties
          }
        >
          <h3
            className="text-sm sm:text-base font-bold mb-2 text-center flex items-center justify-center space-x-1 uppercase tracking-wide"
            style={{ textShadow: '1px 1px 0px #000' }}
          >
            <TargetIcon className="w-4 h-4" />
            <span>HOW TO PLAY</span>
          </h3>
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <MouseCursorIcon className="w-full h-full" />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Left Click</div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <MiniFlagIcon className="w-full h-full" />
              </div>
              <div>
                <div className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Right Click</div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <ArrowKeysIcon className="w-full h-full" />
              </div>
              <div>
                <div className="text-xs font-bold text-green-400 uppercase tracking-wide">Navigate</div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <MiniMineIcon className="w-full h-full" />
              </div>
              <div>
                <div className="text-xs font-bold text-red-400 uppercase tracking-wide">Avoid Mines</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => onStartGame(selectedDifficulty, is3DMode)}
          className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-black border-2 border-white uppercase tracking-wider"
          style={
            {
              '--xr-background-material': 'thick',
              '--xr-back': 12,
              '--xr-elevation': '0.15',
              enableXr: true,
              background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
              boxShadow:
                '4px 4px 0px rgba(0, 0, 0, 0.8), 2px 2px 0px rgba(255, 255, 255, 0.3), inset -1px -1px 0px rgba(0, 0, 0, 0.3)',
              textShadow: '1px 1px 0px #000',
              transition: 'none'
            } as React.CSSProperties
          }
        >
          START GAME
        </button>

        {/* Spatial Environment Indicator */}
        {(
          <div
            className="mt-2 sm:mt-3 text-xs sm:text-sm text-cyan-400 font-bold animate-pulse text-center px-4 uppercase tracking-wide border border-cyan-400 p-1"
            style={
              {
                '--xr-elevation': '0.05',
                enableXr: true,
                background: 'rgba(0, 0, 0, 0.9)',
                textShadow: '1px 1px 0px #000',
                boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)'
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-center gap-2">
              {isSpatial ? <SpatialIcon className="w-4 h-4" /> : <BrowserIcon className="w-4 h-4" />}
              {isSpatial ? 'SPATIAL ENVIRONMENT DETECTED' : 'NORMAL BROWSER DETECTED'}
            </div>
          </div>
        )}

        {/* Spatial Scene Transition Hint */}
        {(
          <div
            className="mt-1 sm:mt-2 text-xs text-blue-300 font-bold text-center px-4 uppercase tracking-wide border border-blue-300 p-1"
            style={
              {
                '--xr-elevation': '0.03',
                enableXr: true,
                background: 'rgba(0, 0, 0, 0.9)',
                textShadow: '1px 1px 0px #000',
                boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.7)'
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-center gap-2">
              {isSpatial ? <GamepadIcon className="w-4 h-4" /> : <BrowserIcon className="w-4 h-4" />}
              {isSpatial ? 'GAME OPENS IN NEW SPATIAL SCENE' : 'ONLY 2D MODE FOR NORMAL BROWSERS'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
