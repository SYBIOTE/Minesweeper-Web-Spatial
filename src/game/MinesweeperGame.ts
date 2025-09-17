// Core Minesweeper Game Logic
export interface Cell {
  x: number
  y: number
  z: number
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMineCount: number
  index: number
}

export interface GameState {
  cells: Cell[]
  width: number
  height: number
  depth: number
  mineCount: number
  flagCount: number
  revealedCount: number
  gameStatus: 'playing' | 'won' | 'lost'
  firstClick: boolean
  startTime: number | null
  endTime: number | null
}

export interface GameConfig {
  width: number
  height: number
  depth: number
  mineCount: number
  firstClickSafe: boolean
  autoReveal: boolean
}

export class MinesweeperGame {
  private state: GameState
  private config: GameConfig

  constructor(config: GameConfig) {
    this.config = config
    this.state = this.initializeGame()
  }

  private initializeGame(): GameState {
    const { width, height, depth, mineCount } = this.config

    // Initialize empty cells
    const cells: Cell[] = []
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        for (let z = 0; z < depth; z++) {
          const index = x + y * width + z * width * height
          cells.push({
            x,
            y,
            z,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMineCount: 0,
            index
          })
        }
      }
    }

    return {
      cells,
      width,
      height,
      depth,
      mineCount,
      flagCount: 0,
      revealedCount: 0,
      gameStatus: 'playing',
      firstClick: true,
      startTime: null,
      endTime: null
    }
  }

  // Generate mines after first click (if firstClickSafe is enabled)
  private generateMines(excludeIndex: number): void {
    const { cells, mineCount } = this.state
    const minesToPlace = Math.min(mineCount, cells.length - 1) // Ensure at least one non-mine cell

    // Reset all mines
    cells.forEach(cell => cell.isMine = false)

    // Place mines randomly, excluding the first click position
    const availableIndices = cells
      .map((_, index) => index)
      .filter(index => index !== excludeIndex)

    for (let i = 0; i < minesToPlace; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length)
      const cellIndex = availableIndices[randomIndex]
      cells[cellIndex].isMine = true
      availableIndices.splice(randomIndex, 1)
    }

    // Calculate neighbor mine counts
    this.calculateNeighborCounts()
  }

  private calculateNeighborCounts(): void {
    const { cells, width, height, depth } = this.state

    cells.forEach(cell => {
      let count = 0
      
      // Check all 26 neighbors in 3D space
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            if (dx === 0 && dy === 0 && dz === 0) continue // Skip self

            const nx = cell.x + dx
            const ny = cell.y + dy
            const nz = cell.z + dz

            // Check bounds
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && nz >= 0 && nz < depth) {
              const neighborIndex = nx + ny * width + nz * width * height
              if (cells[neighborIndex].isMine) {
                count++
              }
            }
          }
        }
      }

      cell.neighborMineCount = count
    })
  }

  // Get all neighbors of a cell
  private getNeighbors(cell: Cell): Cell[] {
    const { cells, width, height, depth } = this.state
    const neighbors: Cell[] = []

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue

          const nx = cell.x + dx
          const ny = cell.y + dy
          const nz = cell.z + dz

          if (nx >= 0 && nx < width && ny >= 0 && ny < height && nz >= 0 && nz < depth) {
            const neighborIndex = nx + ny * width + nz * width * height
            neighbors.push(cells[neighborIndex])
          }
        }
      }
    }

    return neighbors
  }

  // Reveal a cell
  public revealCell(index: number): { success: boolean; gameOver?: boolean; won?: boolean } {
    const { cells, gameStatus } = this.state

    if (gameStatus !== 'playing') {
      return { success: false }
    }

    const cell = cells[index]
    if (!cell || cell.isRevealed || cell.isFlagged) {
      return { success: false }
    }

    // Generate mines on first click if firstClickSafe is enabled
    if (this.state.firstClick && this.config.firstClickSafe) {
      this.generateMines(index)
      this.state.firstClick = false
      this.state.startTime = Date.now()
    }

    // Reveal the cell
    cell.isRevealed = true
    this.state.revealedCount++

    // Check if it's a mine
    if (cell.isMine) {
      this.state.gameStatus = 'lost'
      this.state.endTime = Date.now()
      return { success: true, gameOver: true, won: false }
    }

    // Auto-reveal neighbors if cell is empty and autoReveal is enabled
    if (cell.neighborMineCount === 0 && this.config.autoReveal) {
      this.autoRevealEmptyArea(cell)
    }

    // Check win condition
    if (this.checkWinCondition()) {
      this.state.gameStatus = 'won'
      this.state.endTime = Date.now()
      return { success: true, gameOver: true, won: true }
    }

    return { success: true }
  }

  // Auto-reveal empty areas (flood fill)
  private autoRevealEmptyArea(cell: Cell): void {
    const queue: Cell[] = [cell]
    const visited = new Set<number>()

    while (queue.length > 0) {
      const currentCell = queue.shift()!
      
      if (visited.has(currentCell.index) || currentCell.isRevealed || currentCell.isFlagged) {
        continue
      }

      visited.add(currentCell.index)
      currentCell.isRevealed = true
      this.state.revealedCount++

      // If this cell is also empty, add its neighbors to the queue
      if (currentCell.neighborMineCount === 0) {
        const neighbors = this.getNeighbors(currentCell)
        queue.push(...neighbors.filter(n => !visited.has(n.index) && !n.isRevealed && !n.isFlagged))
      }
    }
  }

  // Toggle flag on a cell
  public toggleFlag(index: number): { success: boolean } {
    const { cells, gameStatus, flagCount, mineCount } = this.state

    if (gameStatus !== 'playing') {
      return { success: false }
    }

    const cell = cells[index]
    if (!cell || cell.isRevealed) {
      return { success: false }
    }

    if (cell.isFlagged) {
      cell.isFlagged = false
      this.state.flagCount--
    } else {
      // Check if we can place more flags
      if (flagCount >= mineCount) {
        return { success: false }
      }
      cell.isFlagged = true
      this.state.flagCount++
    }

    return { success: true }
  }

  // Chord click (reveal all unflagged neighbors around a number)
  public chordClick(index: number): { success: boolean; gameOver?: boolean; won?: boolean } {
    const { cells, gameStatus } = this.state

    if (gameStatus !== 'playing') {
      return { success: false }
    }

    const cell = cells[index]
    if (!cell || !cell.isRevealed || cell.neighborMineCount === 0) {
      return { success: false }
    }

    const neighbors = this.getNeighbors(cell)
    const flaggedNeighbors = neighbors.filter(n => n.isFlagged).length
    const unrevealedNeighbors = neighbors.filter(n => !n.isRevealed && !n.isFlagged)

    // Only proceed if flagged neighbors match the number
    if (flaggedNeighbors !== cell.neighborMineCount) {
      return { success: false }
    }

    // Reveal all unrevealed neighbors
    let gameOver = false
    let won = false

    for (const neighbor of unrevealedNeighbors) {
      const result = this.revealCell(neighbor.index)
      if (result.gameOver) {
        gameOver = true
        won = result.won || false
        break
      }
    }

    return { success: true, gameOver, won }
  }

  // Check win condition
  private checkWinCondition(): boolean {
    const { cells, mineCount } = this.state
    const totalCells = cells.length
    const nonMineCells = totalCells - mineCount
    
    return this.state.revealedCount >= nonMineCells
  }

  // Get cell by index
  public getCell(index: number): Cell | null {
    return this.state.cells[index] || null
  }

  // Get all cells
  public getAllCells(): Cell[] {
    return [...this.state.cells]
  }

  // Get game state
  public getGameState(): GameState {
    return { ...this.state }
  }

  // Reset game
  public reset(): void {
    this.state = this.initializeGame()
  }

  // Get game statistics
  public getStats() {
    const { revealedCount, flagCount, mineCount, startTime, endTime } = this.state
    const totalCells = this.state.cells.length
    const nonMineCells = totalCells - mineCount
    
    return {
      revealedCount,
      flagCount,
      mineCount,
      remainingMines: mineCount - flagCount,
      progress: Math.round((revealedCount / nonMineCells) * 100),
      elapsedTime: startTime ? (endTime || Date.now()) - startTime : 0
    }
  }

  // Get cell variant for rendering
  public getCellVariant(index: number): 'empty' | 'bomb' | 'flag' | 'number' {
    const cell = this.getCell(index)
    if (!cell) return 'empty'

    if (cell.isFlagged) return 'flag'
    if (!cell.isRevealed) return 'empty'
    if (cell.isMine) return 'bomb'
    if (cell.neighborMineCount > 0) return 'number'
    return 'empty'
  }

  // Get cell number for rendering
  public getCellNumber(index: number): number | undefined {
    const cell = this.getCell(index)
    if (!cell || !cell.isRevealed || cell.isMine) return undefined
    return cell.neighborMineCount > 0 ? cell.neighborMineCount : undefined
  }
}
