# 3D Spatial Minesweeper Game

A fully functional 3D Minesweeper game built with React and the WebSpatial SDK, specifically designed for Apple Vision Pro and spatial computing platforms.

## 🎯 Overview

This immersive 3D Minesweeper experience brings the classic game into spatial computing, featuring both 2D and 3D gameplay modes with environment-aware adaptive behavior for Apple Vision Pro using WebSpatial technology.

## ✨ Features

### 🎮 Core Game Logic
- **True 3D Grid**: Play on volumetric 3D grids (width × height × depth)
- **Intelligent Mine Generation**: Random mine placement with guaranteed first-click safety
- **Smart Cell Revealing**: Click to reveal cells with flood-fill auto-reveal for empty areas
- **Advanced Flagging System**: Right-click or dedicated flag mode for mine marking
- **Dynamic Win/Lose Detection**: Real-time game state monitoring
- **Comprehensive Statistics**: Track progress, remaining mines, elapsed time, and completion percentage

### 🖱️ Spatial Controls & Interactions
- **Left Click/Tap**: Reveal cell (or toggle flag in flag mode)
- **Right Click/Long Press**: Toggle flag on cell
- **Middle Click/Double Tap**: Chord click (reveal all unflagged neighbors around a number)
- **Flag Mode Toggle**: Switch between reveal and flag modes with visual feedback
- **Reset & Exit Controls**: Start new games or return to main menu
- **Environment-Adaptive Input**: Optimized for both touch and spatial interactions

### 📊 Difficulty Levels & Configurations
- **Beginner**: 3×3×3 grid with 2 mines (27 cells, 7.4% density)
- **Intermediate**: 5×5×5 grid with 10 mines (125 cells, 8.0% density)
- **Expert**: 7×7×7 grid with 30 mines (343 cells, 8.7% density)
- **Flatscreen Mode**: 11×11×1 grid with 20 mines (121 cells, 16.5% density)

### 🌐 WebSpatial & Apple Vision Pro Integration
- **Environment Detection**: Automatic detection of spatial vs. traditional browser environments
- **Adaptive UI**: Dynamic interface optimization for Apple Vision Pro
- **Scene Management**: Multi-window spatial scene transitions
- **2D/3D Mode Toggle**: Available in spatial environments only
- **Responsive Scaling**: Automatic grid and UI scaling for different devices

### 🎨 Visual & Audio Features
- **Pixel Art Aesthetic**: Retro-style pixel art SVG icons throughout
- **Dynamic Animations**: Smooth transitions for reveals, flags, and game state changes
- **Audio System Ready**: Complete sound effect configuration (reveal, flag, mine, win, lose)
- **Customizable Themes**: Configurable color schemes and visual settings
- **Spatial Lighting**: Environment-appropriate lighting and shadows

### ⚡ Performance Optimizations
- **Instanced Rendering**: Optimized for large 3D grids
- **Level of Detail (LOD)**: Dynamic quality adjustment based on distance
- **Frustum Culling**: Render only visible game elements
- **Efficient State Management**: Minimized re-renders with React optimizations

## 🎯 How to Play

### Getting Started
1. **Launch the Game**: Choose your preferred difficulty level
2. **Select Mode**: In spatial environments, toggle between 2D and 3D modes
3. **First Click**: Click any cell to begin (mines generate after first click for fairness)
4. **Reveal Strategy**: Use number clues to deduce mine locations
5. **Flag Mines**: Mark suspected mines to avoid accidental clicks
6. **Victory**: Reveal all non-mine cells to win!

### Advanced Techniques
- **Chord Clicking**: Middle-click on revealed numbers to auto-reveal safe neighbors
- **Flag Mode**: Toggle to place flags without risk of accidental reveals
- **Pattern Recognition**: Learn common mine distribution patterns in 3D space

## 🔧 Game Mechanics

### 🛡️ Safety Features
- **First Click Safety**: First cell clicked is guaranteed mine-free
- **Auto-Reveal**: Connected empty areas reveal automatically (flood-fill algorithm)
- **Flag Protection**: Flagged cells cannot be accidentally revealed

### 📐 3D Spatial Logic
- **26-Neighbor System**: Each cell has up to 26 neighbors in 3D space
- **Volumetric Mine Detection**: Numbers indicate mines in full 3D neighborhood
- **Spatial Navigation**: Intuitive 3D grid interaction and visualization

### 🎚️ Adaptive Configuration
- **Environment-Aware**: Automatically adjusts mine density for 2D vs 3D modes
- **Dynamic Difficulty**: Grid complexity scales with spatial capabilities
- **Performance Scaling**: Optimizes rendering based on device capabilities

## 🏗️ Technical Architecture

### 📁 Core Files & Structure
```
src/
├── game/
│   └── MinesweeperGame.ts          # Core game logic and state management
├── components/
│   ├── GameController.tsx          # React integration and game controls
│   ├── Volume3D.tsx               # 3D spatial grid rendering
│   ├── MineSweeperTile2D.tsx      # Individual tile components
│   └── common/                    # Shared UI components
├── pages/
│   ├── GameStartScene.tsx         # Main menu with difficulty selection
│   └── MinefieldPage.tsx          # Active game interface
├── assets/
│   └── svgs/pixels/               # Pixel art icon system
├── AppConfig.ts                   # Comprehensive game configuration
└── Router.tsx                     # WebSpatial scene routing
```

### 🎮 Game State Management
The game maintains comprehensive state including:
- **Cell Properties**: Mine status, revealed state, flags, neighbor counts, 3D coordinates
- **Game Status**: Playing, won, lost with timing information
- **Real-time Statistics**: Mines, flags, progress percentage, elapsed time
- **Configuration**: Difficulty settings, mechanics, visual preferences

### 🖥️ Multi-Platform Rendering
- **WebSpatial Scenes**: Native Apple Vision Pro scene management
- **2D CSS/SVG**: High-performance pixel art rendering
- **Responsive Design**: Adapts to various viewport sizes and orientations
- **Environment Detection**: Automatic platform optimization

### 🔧 Configuration System
Extensive customization through `AppConfig.ts`:
- **Grid Dimensions**: Flexible width/height/depth configurations
- **Mine Distribution**: Density calculations and placement algorithms
- **Visual Styling**: Colors, animations, lighting effects
- **Game Mechanics**: Toggle features like auto-reveal, first-click safety
- **Performance Settings**: Rendering optimizations and quality controls
- **Audio Configuration**: Sound effects and volume controls

### 📱 WebSpatial Integration
- **Scene Initialization**: Dynamic scene setup with proper sizing
- **Environment Variables**: XR_ENV detection for Apple Vision Pro
- **Spatial Controls**: Native spatial interaction handling
- **Multi-Window Support**: Seamless scene transitions

## 🚀 Development & Build System

### 📦 Key Dependencies
- **WebSpatial SDK**: `@webspatial/core-sdk`, `@webspatial/react-sdk`
- **Three.js Ecosystem**: `@react-three/fiber`, `@react-three/drei`, `@react-three/xr`
- **React 19**: Modern React with latest features
- **TypeScript**: Full type safety and IDE support
- **Vite**: Fast development and optimized builds

### 🛠️ Build Scripts
- `npm run dev`: Development server
- `npm run dev:avp`: Apple Vision Pro development mode
- `npm run build:avp`: Production build for WebSpatial
- `npm run publish:avp`: Deploy to WebSpatial platform

### 📊 Performance Monitoring
- **Frame Rate Optimization**: Maintains smooth 60+ FPS
- **Memory Management**: Efficient cleanup of 3D resources
- **Network Optimization**: Minimal asset loading for fast startup

## 🔮 Future Enhancements

### 🎵 Planned Features
- **3D Spatial Audio**: Positional sound effects in Apple Vision Pro
- **Haptic Feedback**: Touch and spatial interaction feedback
- **Multiplayer Support**: Collaborative mine-clearing experiences
- **Custom Grid Builder**: User-created difficulty configurations
- **Achievement System**: Progress tracking and unlockable content

### 🎨 Visual Improvements
- **Enhanced Animations**: Smooth state transitions and celebrations
- **Particle Effects**: Mine explosions and victory celebrations
- **Environmental Themes**: Different visual environments and settings
- **Accessibility Features**: Color-blind support and interaction alternatives

### 📈 Analytics & Insights
- **Performance Metrics**: Game completion statistics
- **Difficulty Balancing**: Data-driven mine density optimization
- **User Experience**: Interaction pattern analysis for improvements

---

*Built for the future of spatial computing with Apple Vision Pro and WebSpatial technology.*