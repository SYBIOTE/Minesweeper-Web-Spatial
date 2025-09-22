import React, { useState } from 'react'
import { type GameConfig, getPresetForEnvironment, getConfigForEnvironment } from '../AppConfig'

interface GameStartSceneProps {
  config: GameConfig
  isSpatial: boolean
  onStartGame: (selectedDifficulty: keyof GameConfig['difficulty']['preset']) => void
}

export const GameStartScene: React.FC<GameStartSceneProps> = ({
  config,
  isSpatial,
  onStartGame
}) => {
  const { difficulty } = config
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty.level)
  const currentPreset = getPresetForEnvironment(selectedDifficulty, isSpatial)
  const currentConfig = getConfigForEnvironment(selectedDifficulty, isSpatial)

  const difficultyLevels: (keyof GameConfig['difficulty']['preset'])[] = ['beginner', 'intermediate', 'expert']

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'from-green-500 to-green-600'
      case 'intermediate': return 'from-yellow-500 to-yellow-600'
      case 'expert': return 'from-red-500 to-red-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'beginner': return '🟢'
      case 'intermediate': return '🟡'
      case 'expert': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full text-white relative overflow-hidden"
      style={{
        '--xr-background-material': isSpatial ? 'thick' : 'none',
        '--xr-back': 20,
        '--xr-elevation': '0.3',
        enableXr: true
      } as React.CSSProperties}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-8">
        {/* Title Section */}
        <div
          className="text-center mb-12"
          style={{
            '--xr-background-material': isSpatial ? 'thin' : 'none',
            '--xr-back': 10,
            '--xr-elevation': '0.15',
            enableXr: true
          } as React.CSSProperties}
        >
          <h1 className="text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-2xl">
            3D Minesweeper
          </h1>
          <p className="text-2xl text-gray-300 font-light tracking-wide">
            Navigate through <span className="text-cyan-400 font-semibold">3D space</span> to find hidden mines
          </p>
          <div className="mt-4 flex justify-center space-x-2 text-3xl">
            <span className="animate-bounce">💣</span>
            <span className="animate-bounce animation-delay-200">⚡</span>
            <span className="animate-bounce animation-delay-400">🎮</span>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div
          className="mb-8 p-8 rounded-2xl backdrop-blur-md shadow-2xl"
          style={{
            '--xr-background-material': isSpatial ? 'thin' : 'none',
            '--xr-back': 15,
            '--xr-elevation': '0.1',
            enableXr: true,
            background: isSpatial ? 'transparent' : 'rgba(0, 0, 0, 0.4)',
            border: isSpatial ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'
          } as React.CSSProperties}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Challenge</h2>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as keyof GameConfig['difficulty']['preset'])}
                className={`appearance-none bg-gradient-to-r ${getDifficultyColor(selectedDifficulty)} text-white text-xl font-bold px-8 py-4 pr-12 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30`}
                style={{
                  '--xr-background-material': 'thick',
                  '--xr-back': 8,
                  '--xr-elevation': '0.05',
                  enableXr: true
                } as React.CSSProperties}
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level} className="bg-gray-800 text-white">
                    {getDifficultyIcon(level)} {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Selected Difficulty Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div
              className="p-4 rounded-xl"
              style={{
                '--xr-background-material': isSpatial ? 'thin' : 'none',
                '--xr-back': 5,
                '--xr-elevation': '0.03',
                enableXr: true,
                background: isSpatial ? 'transparent' : 'rgba(255, 255, 255, 0.05)'
              } as React.CSSProperties}
            >
              <div className="text-sm text-gray-400 mb-1">Grid Size</div>
              <div className="text-2xl font-bold text-cyan-400">
                {currentPreset.width}×{currentPreset.height}×{currentPreset.depth}
              </div>
              <div className="text-xs text-gray-500 mt-1">cells</div>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                '--xr-background-material': isSpatial ? 'thin' : 'none',
                '--xr-back': 5,
                '--xr-elevation': '0.03',
                enableXr: true,
                background: isSpatial ? 'transparent' : 'rgba(255, 255, 255, 0.05)'
              } as React.CSSProperties}
            >
              <div className="text-sm text-gray-400 mb-1">Mines</div>
              <div className="text-2xl font-bold text-red-400">
                {currentConfig.mines.count}
              </div>
              <div className="text-xs text-gray-500 mt-1">hidden dangers</div>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                '--xr-background-material': isSpatial ? 'thin' : 'none',
                '--xr-back': 5,
                '--xr-elevation': '0.03',
                enableXr: true,
                background: isSpatial ? 'transparent' : 'rgba(255, 255, 255, 0.05)'
              } as React.CSSProperties}
            >
              <div className="text-sm text-gray-400 mb-1">Difficulty</div>
              <div className="text-2xl font-bold text-yellow-400">
                {getDifficultyIcon(selectedDifficulty)}
              </div>
              <div className="text-xs text-gray-500 mt-1 capitalize">{selectedDifficulty}</div>
            </div>
          </div>
        </div>

        {/* Enhanced Instructions */}
        <div
          className="mb-10 p-6 rounded-xl backdrop-blur-md max-w-2xl"
          style={{
            '--xr-background-material': isSpatial ? 'thin' : 'none',
            '--xr-back': 15,
            '--xr-elevation': '0.08',
            enableXr: true,
            background: isSpatial ? 'transparent' : 'rgba(0, 0, 0, 0.25)',
            border: isSpatial ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
          } as React.CSSProperties}
        >
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
            <span>🎯</span>
            <span>How to Play</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">👆</div>
              <div>
                <div className="font-semibold text-cyan-400">Left Click</div>
                <div className="text-sm text-gray-300">Reveal cells</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">🚩</div>
              <div>
                <div className="font-semibold text-yellow-400">Right Click</div>
                <div className="text-sm text-gray-300">Flag mines</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">🧭</div>
              <div>
                <div className="font-semibold text-green-400">Navigate</div>
                <div className="text-sm text-gray-300">Explore 3D space</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">💥</div>
              <div>
                <div className="font-semibold text-red-400">Avoid</div>
                <div className="text-sm text-gray-300">Clicking on mines!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => onStartGame(selectedDifficulty)}
          className="px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl text-2xl font-black transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-2xl"
          style={{
            '--xr-background-material': 'thick',
            '--xr-back': 12,
            '--xr-elevation': '0.15',
            enableXr: true,
            boxShadow: isSpatial
              ? '0 12px 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)'
          } as React.CSSProperties}
        >
          🚀 Start 3D Adventure
        </button>

        {/* Spatial Environment Indicator */}
        {isSpatial && (
          <div
            className="mt-6 text-lg text-cyan-400 font-semibold animate-pulse"
            style={{
              '--xr-elevation': '0.05',
              enableXr: true
            } as React.CSSProperties}
          >
            🕶️ Spatial Environment Detected - Ready for 3D Immersion!
          </div>
        )}

        {/* Spatial Scene Transition Hint */}
        {isSpatial && (
          <div
            className="mt-4 text-sm text-blue-300 font-medium"
            style={{
              '--xr-elevation': '0.03',
              enableXr: true
            } as React.CSSProperties}
          >
            🎮 Starting game will open in a new spatial scene
          </div>
        )}
      </div>
    </div>
  )
}
