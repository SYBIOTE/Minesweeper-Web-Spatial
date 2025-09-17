// Game Configuration for 3D Spatial Minesweeper
export interface GameConfig {  
  // Mine settings
  mines: {
    count: number
    density: number // mines per 100 cells
  }
  
  // Difficulty presets
  difficulty: {
    level: 'beginner' | 'intermediate' | 'expert' 
    preset: {
      beginner: { width: number, height: number, depth: number, mines: number }
      intermediate: { width: number, height: number, depth: number, mines: number }
      expert: { width: number, height: number, depth: number, mines: number }
    }
  }
  
  // 3D Spatial settings
  spatial: {
    cardSize: number // Size of each 3D card in units
    cardSpacing: number // Space between cards
    cardThickness: number // Depth of each card
    gridOffset: { x: number, y: number, z: number } // Center offset for the grid
    cameraDistance: number // Distance from camera to grid center
    cameraHeight: number // Height offset for camera
  }
  
  // Visual settings
  visual: {
    cardColors: {
      unrevealed: string
      revealed: string
      mine: string
      flag: string
      number: string[]
      highlight: string
    }
    animations: {
      revealDuration: number // ms
      flagDuration: number // ms
      explosionDuration: number // ms
      winAnimationDuration: number // ms
    }
    lighting: {
      ambientIntensity: number
      directionalIntensity: number
      shadowEnabled: boolean
    }
  }
  
  // Game mechanics
  mechanics: {
    firstClickSafe: boolean // First click never hits a mine
    autoReveal: boolean // Auto-reveal empty areas
    flagMode: boolean // Toggle between reveal and flag mode
    chordClick: boolean // Middle-click to reveal around numbers
    timerEnabled: boolean
    scoreEnabled: boolean
  }
  
  // Audio settings
  audio: {
    enabled: boolean
    volume: number
    sounds: {
      reveal: string
      flag: string
      mine: string
      win: string
      lose: string
    }
  }
  
  // Performance settings
  performance: {
    maxCardsPerFrame: number // For rendering optimization
    lodEnabled: boolean // Level of detail for distant cards
    frustumCulling: boolean
    instancedRendering: boolean
  }
}

// Default configuration
export const defaultConfig: GameConfig = {
  
  mines: {
    count: 40,
    density: 12.5 // 40 mines in 512 cells = ~7.8%
  },
  
  difficulty: {
    level: 'beginner',
    preset: {
      beginner: { width: 3, height: 3, depth: 3, mines: 5 },
      intermediate: { width: 7, height: 7, depth: 7, mines: 15 },
      expert: { width: 11, height: 11, depth: 11, mines: 20 }
    } 
  },
  
  spatial: {
    cardSize: 0.8,
    cardSpacing: 0.1,
    cardThickness: 0.05,
    gridOffset: { x: 0, y: 0, z: 0 },
    cameraDistance: 8,
    cameraHeight: 1.6
  },
  
  visual: {
    cardColors: {
      unrevealed: '#2a2a2a',
      revealed: '#404040',
      mine: '#ff4444',
      flag: '#ffaa00',
      number: [
        '#0000ff', // 1 - blue
        '#008000', // 2 - green
        '#ff0000', // 3 - red
        '#800080', // 4 - purple
        '#800000', // 5 - maroon
        '#008080', // 6 - teal
        '#000000', // 7 - black
        '#808080'  // 8 - gray
      ],
      highlight: '#ffff00'
    },
    animations: {
      revealDuration: 200,
      flagDuration: 150,
      explosionDuration: 500,
      winAnimationDuration: 1000
    },
    lighting: {
      ambientIntensity: 0.3,
      directionalIntensity: 0.8,
      shadowEnabled: false
    }
  },
  
  mechanics: {
    firstClickSafe: true,
    autoReveal: true,
    flagMode: false,
    chordClick: true,
    timerEnabled: true,
    scoreEnabled: true
  },
  
  audio: {
    enabled: true,
    volume: 0.7,
    sounds: {
      reveal: '/sounds/reveal.mp3',
      flag: '/sounds/flag.mp3',
      mine: '/sounds/mine.mp3',
      win: '/sounds/win.mp3',
      lose: '/sounds/lose.mp3'
    }
  },
  
  performance: {
    maxCardsPerFrame: 100,
    lodEnabled: true,
    frustumCulling: true,
    instancedRendering: true
  }
}

// Utility functions for configuration management
export const GameConfigUtils = {
  // Calculate total cells in grid
  getTotalCells: (config: GameConfig): number => {
    return config.difficulty.preset[config.difficulty.level].width * config.difficulty.preset[config.difficulty.level].height * config.difficulty.preset[config.difficulty.level].depth
  },
  
  // Calculate mine density percentage
  getMineDensity: (config: GameConfig): number => {
    const totalCells = GameConfigUtils.getTotalCells(config)
    return (config.mines.count / totalCells) * 100
  },
  
  // Apply difficulty preset
  applyDifficultyPreset: (config: GameConfig, level: 'beginner' | 'intermediate' | 'expert'): GameConfig => {
    const preset = config.difficulty.preset[level]
    return {
      ...config,
      difficulty: { ...config.difficulty, level },
      spatial: {
        ...config.spatial,
        ...preset
      },
      mines: {
        count: preset.mines,
        density: (preset.mines / (config.difficulty.preset[config.difficulty.level].width * config.difficulty.preset[config.difficulty.level].height * config.difficulty.preset[config.difficulty.level].depth)) * 100
      }
    }
  },
  
  // Validate configuration
  validateConfig: (config: GameConfig): string[] => {
    const errors: string[] = []
    
    if (config.difficulty.preset[config.difficulty.level].width < 1 || config.difficulty.preset[config.difficulty.level].height < 1 || config.difficulty.preset[config.difficulty.level].depth < 1) {
      errors.push('Grid dimensions must be at least 1x1x1')
    }
    
    if (config.difficulty.preset[config.difficulty.level].width > 50 || config.difficulty.preset[config.difficulty.level].height > 50 || config.difficulty.preset[config.difficulty.level].depth > 10) {
      errors.push('Grid dimensions too large (max 50x50x10)')
    }
    
    const totalCells = GameConfigUtils.getTotalCells(config)
    if (config.mines.count >= totalCells) {
      errors.push('Too many mines for grid size')
    }
    
    if (config.mines.count < 1) {
      errors.push('Must have at least 1 mine')
    }
    
    if (config.spatial.cardSize <= 0) {
      errors.push('Card size must be positive')
    }
    
    if (config.audio.volume < 0 || config.audio.volume > 1) {
      errors.push('Audio volume must be between 0 and 1')
    }
    
    return errors
  },
  
  // Calculate optimal camera position
  getOptimalCameraPosition: (config: GameConfig): { x: number, y: number, z: number } => {
    const { width, height, depth } = config.difficulty.preset[config.difficulty.level]
    const { cardSize, cardSpacing, cameraDistance, cameraHeight } = config.spatial
    
    const gridWidth = width * (cardSize + cardSpacing) - cardSpacing
    const gridHeight = height * (cardSize + cardSpacing) - cardSpacing
    const gridDepth = depth * (cardSize + cardSpacing) - cardSpacing
    
    // Position camera to see the entire grid
    const maxDimension = Math.max(gridWidth, gridHeight, gridDepth)
    const distance = Math.max(cameraDistance, maxDimension * 1.5)
    
    return {
      x: 0,
      y: cameraHeight,
      z: distance
    }
  }
}

// Export the default config as the main export
export default defaultConfig
