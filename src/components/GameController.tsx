import { useState, useEffect, useCallback, useMemo } from 'react'
import { MinesweeperGame, type GameConfig as GameConfigType, type GameState } from '../game/MinesweeperGame'
import type { GameConfig } from '../AppConfig'

interface GameControllerProps {
  config: GameConfig
  onGameStateChange?: (gameState: GameState) => void
  onGameEnd?: (won: boolean, stats: {
    revealedCount: number
    flagCount: number
    mineCount: number
    remainingMines: number
    progress: number
    elapsedTime: number
  }) => void
}

export const GameController = ({ config, onGameStateChange, onGameEnd }: GameControllerProps) => {
  // Convert AppConfig to GameConfig format
  const gameConfig: GameConfigType = useMemo(() => {
    const preset = config.difficulty.preset[config.difficulty.level]
    return {
      width: preset.width,
      height: preset.height,
      depth: preset.depth,
      mineCount: preset.mines,
      firstClickSafe: config.mechanics.firstClickSafe,
      autoReveal: config.mechanics.autoReveal
    }
  }, [config])

  // Initialize game instance
  const [game] = useState(() => new MinesweeperGame(gameConfig))
  
  // Game state
  const [gameState, setGameState] = useState(game.getGameState())
  const [stats, setStats] = useState(game.getStats())
  const [flagMode, setFlagMode] = useState(config.mechanics.flagMode)

  // Update game state and stats
  const updateGameState = useCallback(() => {
    const newGameState = game.getGameState()
    const newStats = game.getStats()
    setGameState(newGameState)
    setStats(newStats)
    
    if (onGameStateChange) {
      onGameStateChange(newGameState)
    }
  }, [game, onGameStateChange])

  // Handle cell click
  const handleCellClick = useCallback((index: number, event?: React.MouseEvent) => {
    if (gameState.gameStatus !== 'playing') return

    const isRightClick = event?.button === 2 || event?.ctrlKey || event?.metaKey
    const isMiddleClick = event?.button === 1

    // Handle different click types
    if (isRightClick || flagMode) {
      // Toggle flag
      const result = game.toggleFlag(index)
      if (result.success) {
        updateGameState()
      }
    } else if (isMiddleClick && config.mechanics.chordClick) {
      // Chord click
      const result = game.chordClick(index)
      if (result.success) {
        updateGameState()
        if (result.gameOver && onGameEnd) {
          onGameEnd(result.won || false, game.getStats())
        }
      }
    } else {
      // Regular reveal
      const result = game.revealCell(index)
      if (result.success) {
        updateGameState()
        if (result.gameOver && onGameEnd) {
          onGameEnd(result.won || false, game.getStats())
        }
      }
    }
  }, [game, gameState.gameStatus, flagMode, config.mechanics.chordClick, updateGameState, onGameEnd])

  // Handle cell right click
  const handleCellRightClick = useCallback((index: number, event: React.MouseEvent) => {
    event.preventDefault()
    handleCellClick(index, event)
  }, [handleCellClick])

  // Toggle flag mode
  const toggleFlagMode = useCallback(() => {
    setFlagMode(prev => !prev)
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    game.reset()
    updateGameState()
  }, [game, updateGameState])

  // Get cell variant and number for rendering
  const getCellData = useCallback((index: number) => {
    return {
      variant: game.getCellVariant(index),
      number: game.getCellNumber(index),
      isRevealed: game.getCell(index)?.isRevealed || false,
      isFlagged: game.getCell(index)?.isFlagged || false,
      isMine: game.getCell(index)?.isMine || false
    }
  }, [game])

  // Update game when config changes
  useEffect(() => {
    // Reset game with new config
    game.reset()
    updateGameState()
  }, [gameConfig, game, updateGameState])

  // Expose game controls and state
  const gameControls = {
    handleCellClick,
    handleCellRightClick,
    toggleFlagMode,
    resetGame,
    getCellData,
    gameState,
    stats,
    flagMode,
    isGameOver: gameState.gameStatus !== 'playing',
    isWon: gameState.gameStatus === 'won',
    isLost: gameState.gameStatus === 'lost'
  }

  return gameControls
}

// Hook for using the game controller
// eslint-disable-next-line react-refresh/only-export-components
export const useMinesweeperGame = (config: GameConfig, onGameStateChange?: (gameState: GameState) => void, onGameEnd?: (won: boolean, stats: {
  revealedCount: number
  flagCount: number
  mineCount: number
  remainingMines: number
  progress: number
  elapsedTime: number
}) => void) => {
  return GameController({ config, onGameStateChange, onGameEnd })
}
