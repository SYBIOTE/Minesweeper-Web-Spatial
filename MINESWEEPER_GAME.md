# 3D Minesweeper Game

A fully functional 3D Minesweeper game built with React and Three.js for WebSpatial environments.

## Features

### Core Game Logic
- **3D Grid**: Play on a 3D grid (width × height × depth)
- **Mine Generation**: Random mine placement with first-click safety
- **Cell Revealing**: Click to reveal cells, with auto-reveal for empty areas
- **Flagging System**: Right-click or use flag mode to mark suspected mines
- **Win/Lose Detection**: Automatic game end detection
- **Statistics**: Track progress, remaining mines, and elapsed time

### Game Controls
- **Left Click**: Reveal cell (or toggle flag in flag mode)
- **Right Click**: Toggle flag on cell
- **Middle Click**: Chord click (reveal all unflagged neighbors around a number)
- **Flag Mode Toggle**: Switch between reveal and flag modes
- **Reset Button**: Start a new game

### Difficulty Levels
- **Beginner**: 3×3×3 grid with 5 mines
- **Intermediate**: 7×7×7 grid with 15 mines  
- **Expert**: 11×11×11 grid with 20 mines

## How to Play

1. **Start the Game**: Click any cell to begin (mines are generated after first click)
2. **Reveal Cells**: Left-click on cells to reveal them
3. **Flag Mines**: Right-click or use flag mode to mark suspected mines
4. **Use Numbers**: Numbers show how many mines are in adjacent cells
5. **Win**: Reveal all non-mine cells to win
6. **Lose**: Click on a mine to lose

## Game Mechanics

### Auto-Reveal
When you reveal an empty cell (no adjacent mines), all connected empty cells are automatically revealed.

### First Click Safety
The first cell you click will never be a mine, ensuring a fair start.

### Flagging
- Right-click any unrevealed cell to place/remove a flag
- You can only place as many flags as there are mines
- Flagged cells cannot be revealed

### Chord Click
When you middle-click on a revealed number cell, it will reveal all unflagged neighbors if the number of flags matches the number.

## Technical Implementation

### Core Files
- `src/game/MinesweeperGame.ts` - Core game logic and state management
- `src/components/GameController.tsx` - React integration and game controls
- `src/components/Volume3D.tsx` - 3D grid rendering
- `src/components/MineSweeperTile2D.tsx` - Individual tile rendering
- `src/App.tsx` - Main application with UI

### Game State
The game maintains state for:
- Cell properties (mine, revealed, flagged, neighbor count)
- Game status (playing, won, lost)
- Statistics (mines, flags, progress, time)
- Configuration (difficulty, mechanics)

### Rendering
- Uses 2D CSS/SVG rendering for performance
- Supports both 2D and 3D tile variants
- Responsive grid positioning
- Visual feedback for different cell states

## Configuration

The game can be configured through `src/AppConfig.ts`:
- Grid dimensions and mine count
- Visual styling and colors
- Game mechanics (auto-reveal, first-click safety, etc.)
- Performance settings

## Future Enhancements

- 3D WebGL rendering for true 3D experience
- Sound effects and animations
- Multiple difficulty presets
- High score tracking
- Custom grid sizes
- Multiplayer support
