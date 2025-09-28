# 🎮 WebSpatial 3D Minesweeper

> **A next-generation 3D Minesweeper game designed for Apple Vision Pro using WebSpatial SDK**

[![Apple Vision Pro](https://img.shields.io/badge/Apple%20Vision%20Pro-Compatible-blue?style=for-the-badge&logo=apple)](https://developer.apple.com/visionos/)
[![WebSpatial](https://img.shields.io/badge/WebSpatial-SDK-green?style=for-the-badge)](https://webspatial.io)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

## 🌟 Overview

Experience the classic Minesweeper game reimagined for spatial computing! This immersive 3D version brings volumetric gameplay to Apple Vision Pro, featuring intelligent environment detection, adaptive UI, and seamless transitions between 2D and 3D modes.

### ✨ Key Features

- **🕶️ Apple Vision Pro Native**: Built specifically for spatial computing with WebSpatial SDK
- **🎯 True 3D Gameplay**: Navigate volumetric minefields with 26-neighbor logic
- **🔄 Adaptive Modes**: Automatic 2D/3D mode switching based on environment
- **🎨 Pixel Art Design**: Retro-inspired visual style with modern spatial interactions
- **⚡ High Performance**: Optimized rendering with instancing and LOD systems
- **🎵 Audio Ready**: Complete sound system configuration (implementation ready)

## 🚀 Quick Start

### Prerequisites
- **Apple Vision Pro** (recommended) or modern web browser
- **Node.js** 18+ and **pnpm**
- **WebSpatial Developer Account** (for deployment)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/Minesweeper-Web-Spatial.git
cd Minesweeper-Web-Spatial

# Install dependencies
pnpm install

# Start development server
pnpm dev

# For Apple Vision Pro development
pnpm dev:avp
```

### WebSpatial Deployment

```bash
# Build for WebSpatial platform
pnpm build:avp

# Deploy to WebSpatial (requires .env.local configuration)
pnpm publish:avp
```

## 🎮 How to Play

### 🎯 Game Modes

**🖥️ Normal Browser Mode**
- Automatically detects regular browsers
- Forces 2D flat grid gameplay (11×11 grid)
- Optimized touch and mouse interactions

**🕶️ Apple Vision Pro Mode**
- Detects WebSpatial environment automatically  
- True 3D volumetric grids (3×3×3 to 7×7×7)
- Toggle between 2D and 3D modes
- Spatial gesture support

### 📊 Difficulty Levels

| Difficulty | Grid Size | Mines | Total Cells | Density |
|------------|-----------|-------|-------------|---------|
| **Beginner** | 3×3×3 | 2 | 27 | 7.4% |
| **Intermediate** | 5×5×5 | 10 | 125 | 8.0% |
| **Expert** | 7×7×7 | 30 | 343 | 8.7% |
| **Flatscreen** | 11×11×1 | 20 | 121 | 16.5% |

### 🖱️ Controls

- **Left Click/Tap**: Reveal cell
- **Right Click/Long Press**: Toggle flag
- **Middle Click/Double Tap**: Chord click (reveal neighbors)
- **Flag Mode Toggle**: Switch interaction modes
- **Reset**: Start new game
- **Exit**: Return to main menu

## 🏗️ Architecture

### 📁 Project Structure

```
src/
├── 🎮 game/
│   └── MinesweeperGame.ts     # Core 3D game logic
├── 🧩 components/
│   ├── GameController.tsx     # React game integration
│   ├── Volume3D.tsx          # 3D spatial rendering
│   └── common/               # Shared UI components
├── 📱 pages/
│   ├── GameStartScene.tsx    # Main menu scene
│   └── MinefieldPage.tsx     # Game scene
├── 🎨 assets/
│   └── svgs/pixels/          # Pixel art icon system
├── ⚙️ AppConfig.ts           # Game configuration
└── 🗺️ Router.tsx             # WebSpatial routing
```

### 🛠️ Tech Stack

**Core Technologies**
- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **WebSpatial SDK** - Apple Vision Pro integration
- **Three.js** - 3D graphics (via React Three Fiber)
- **Vite** - Fast build system

**Spatial Computing**
- **@webspatial/core-sdk** - Core WebSpatial functionality
- **@webspatial/react-sdk** - React WebSpatial components
- **@react-three/fiber** - React Three.js renderer
- **@react-three/drei** - Three.js helpers
- **@react-three/xr** - XR/VR support

**Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🔧 Configuration

### Environment Variables (.env.local)
```env
# WebSpatial Configuration
XR_DEV_SERVER=your-dev-server
XR_PRE_SERVER=your-pre-server  
XR_PROD_SERVER=your-prod-server
XR_BUNDLE_ID=your-bundle-id
XR_TEAM_ID=your-team-id
XR_VERSION=1.0.0
XR_DEV_NAME=your-dev-name
XR_DEV_PASSWORD=your-dev-password
```

### Game Configuration (AppConfig.ts)

The game supports extensive customization:

- **🎯 Difficulty Settings**: Grid dimensions, mine counts, density calculations
- **🎨 Visual Theming**: Colors, animations, lighting effects  
- **⚙️ Game Mechanics**: Auto-reveal, first-click safety, chord clicking
- **🔊 Audio System**: Sound effects, volume controls (ready for implementation)
- **⚡ Performance**: Rendering optimizations, LOD, frustum culling

## 🎨 Features Deep Dive

### 🔍 Environment Detection
```typescript
const isSpatial = navigator.userAgent.includes('WebSpatial') || 
                  import.meta.env.XR_ENV === 'avp'
```

### 🎯 Smart Mine Generation
- **First-click safety** ensures first cell is never a mine
- **Balanced distribution** with configurable density
- **3D neighbor calculation** (up to 26 neighbors per cell)

### 🎮 Adaptive UI
- **Browser**: Fixed 2D mode with touch optimization
- **Vision Pro**: Full 3D with mode toggle and spatial gestures
- **Responsive scaling** for different viewport sizes

### ⚡ Performance Optimizations
- **Instanced rendering** for large 3D grids
- **Level of Detail (LOD)** for distant elements
- **Frustum culling** to render only visible cells
- **React optimizations** with memoization and careful re-renders

## 📱 WebSpatial Integration

This game leverages WebSpatial's full feature set:

- **🖼️ Scene Management**: Multi-window spatial scenes
- **🎯 Environment Detection**: Automatic platform optimization  
- **📐 Spatial Rendering**: Native 3D positioning and scaling
- **🖱️ Interaction Handling**: Gesture and touch event processing
- **🔧 Build Pipeline**: Integrated development and deployment tools

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:

- **🐛 Bug Reports**: Issue templates and debugging info
- **✨ Feature Requests**: Enhancement proposals
- **🔧 Pull Requests**: Code contribution guidelines
- **📚 Documentation**: Help improve our docs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple** - For Vision Pro and spatial computing innovation
- **WebSpatial** - For the excellent spatial development SDK  
- **React Team** - For the amazing React framework
- **Three.js** - For powerful 3D graphics capabilities

---

**🚀 Ready to experience Minesweeper in a whole new dimension?**

*Built with ❤️ for the future of spatial computing*