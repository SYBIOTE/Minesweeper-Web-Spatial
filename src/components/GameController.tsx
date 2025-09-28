import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { GameConfig } from '../AppConfig'
import { MinesweeperGame, type GameConfig as GameConfigType, type GameState } from '../game/MinesweeperGame'

interface GameControllerProps {
  config: GameConfig
  onGameStateChange?: (gameState: GameState) => void
  onGameEnd?: (
    won: boolean,
    stats: {
      revealedCount: number
      flagCount: number
      mineCount: number
      remainingMines: number
      progress: number
      elapsedTime: number
    }
  ) => void
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

  // Initialize game instance - recreate when config changes
  const [game, setGame] = useState(() => new MinesweeperGame(gameConfig))

  // Game state
  const [gameState, setGameState] = useState(game.getGameState())
  const [stats, setStats] = useState(game.getStats())
  const [flagMode, setFlagMode] = useState(config.mechanics.flagMode)

  // Use refs to avoid dependency issues
  const gameStateRef = useRef(gameState)
  gameStateRef.current = gameState

  const onGameStateChangeRef = useRef(onGameStateChange)
  onGameStateChangeRef.current = onGameStateChange

  const onGameEndRef = useRef(onGameEnd)
  onGameEndRef.current = onGameEnd

  // Update game state and stats
  const updateGameState = useCallback(() => {
    const newGameState = game.getGameState()
    const newStats = game.getStats()
    setGameState(newGameState)
    setStats(newStats)

    if (onGameStateChangeRef.current) {
      onGameStateChangeRef.current(newGameState)
    }
  }, [game])

  // Handle cell click
  const handleCellClick = useCallback(
    (index: number, event?: React.MouseEvent) => {
      if (gameStateRef.current.gameStatus !== 'playing') return

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
          if (result.gameOver && onGameEndRef.current) {
            onGameEndRef.current(result.won || false, game.getStats())
          }
        }
      } else {
        // Regular reveal
        const result = game.revealCell(index)
        if (result.success) {
          updateGameState()
          if (result.gameOver && onGameEndRef.current) {
            onGameEndRef.current(result.won || false, game.getStats())
          }
        }
      }
    },
    [game, flagMode, config.mechanics.chordClick, updateGameState]
  )

  // Handle cell right click
  const handleCellRightClick = useCallback(
    (index: number, event: React.MouseEvent) => {
      event.preventDefault()
      handleCellClick(index, event)
    },
    [handleCellClick]
  )

  // Toggle flag mode
  const toggleFlagMode = useCallback(() => {
    setFlagMode((prev) => !prev)
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    game.reset()
    updateGameState()
  }, [game, updateGameState])

  // Get cell variant and number for rendering
  const getCellData = useCallback(
    (index: number) => {
      return {
        variant: game.getCellVariant(index),
        number: game.getCellNumber(index),
        isRevealed: game.getCell(index)?.isRevealed || false,
        isFlagged: game.getCell(index)?.isFlagged || false,
        isMine: game.getCell(index)?.isMine || false
      }
    },
    [game]
  )

  // Update game when config changes
  useEffect(() => {
    // Create new game instance with new config
    const newGame = new MinesweeperGame(gameConfig)
    setGame(newGame)

    const newGameState = newGame.getGameState()
    const newStats = newGame.getStats()
    setGameState(newGameState)
    setStats(newStats)

    if (onGameStateChangeRef.current) {
      onGameStateChangeRef.current(newGameState)
    }
  }, [gameConfig])

  // Memoize the stable controls separately from the changing state
  const stableControls = useMemo(
    () => ({
      handleCellClick,
      handleCellRightClick,
      toggleFlagMode,
      resetGame,
      getCellData
    }),
    [handleCellClick, handleCellRightClick, toggleFlagMode, resetGame, getCellData]
  )

  // Expose game controls and state
  const gameControls = {
    ...stableControls,
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
export const useMinesweeperGame = (
  config: GameConfig,
  onGameStateChange?: (gameState: GameState) => void,
  onGameEnd?: (
    won: boolean,
    stats: {
      revealedCount: number
      flagCount: number
      mineCount: number
      remainingMines: number
      progress: number
      elapsedTime: number
    }
  ) => void
) => {
  return GameController({ config, onGameStateChange, onGameEnd })
}
