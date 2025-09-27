import React from 'react'

interface PixelBackgroundProps {
  isVisible?: boolean
}

export const PixelBackground: React.FC<PixelBackgroundProps> = ({ isVisible = true }) => {
  if (!isVisible) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-5 right-5 animate-pulse"
        style={{
          width: '64px',
          height: '64px',
          background: `
            conic-gradient(from 0deg at 50% 50%,
              #3b82f6 0deg 45deg,
              #1d4ed8 45deg 90deg,
              #1e40af 90deg 135deg,
              #1e3a8a 135deg 180deg,
              #3b82f6 180deg 225deg,
              #1d4ed8 225deg 270deg,
              #1e40af 270deg 315deg,
              #1e3a8a 315deg 360deg
            )`,
          imageRendering: 'pixelated',
          border: '2px solid rgba(59, 130, 246, 0.8)',
          boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.5), 2px 2px 0px rgba(59, 130, 246, 0.6)'
        }}
      >
        <div
          className="absolute inset-2 border border-blue-300/50"
          style={{
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.4) 25%, transparent 25%, transparent 75%, rgba(59, 130, 246, 0.4) 75%)',
            backgroundSize: '8px 8px'
          }}
        />
      </div>

      <div
        className="absolute bottom-5 left-5 animate-pulse animation-delay-1000"
        style={{
          width: '48px',
          height: '48px',
          background: `
            linear-gradient(0deg, #ec4899 0%, #be185d 50%, #ec4899 100%),
            linear-gradient(90deg, #f97316 0%, #ea580c 50%, #f97316 100%)`,
          backgroundBlendMode: 'multiply',
          imageRendering: 'pixelated',
          border: '2px solid rgba(236, 72, 153, 0.8)',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.6), 1px 1px 0px rgba(236, 72, 153, 0.7)'
        }}
      />

      <div
        className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 animate-pulse animation-delay-500 border border-cyan-300"
        style={{
          imageRendering: 'pixelated',
          boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)'
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-6 h-6 bg-yellow-400 animate-pulse animation-delay-1500 border border-yellow-300"
        style={{
          imageRendering: 'pixelated',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)'
        }}
      />
      <div
        className="absolute top-1/3 right-10 w-3 h-3 bg-green-400 animate-pulse animation-delay-800 border border-green-300"
        style={{
          imageRendering: 'pixelated',
          boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.4)'
        }}
      />
    </div>
  )
}
