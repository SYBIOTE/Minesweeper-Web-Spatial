import React, { useState } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export const Tooltip = ({ children, content, position = 'top', delay = 500 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setIsVisible(false)
  }

  const getPositionClasses = () => {
    const baseClasses = `absolute z-[10000] pointer-events-none transition-all duration-200 ease-in-out whitespace-nowrap text-xs font-medium text-white backdrop-blur-sm border rounded-lg px-3 py-2 shadow-xl max-w-48 text-center ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`

    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2`
      case 'bottom':
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2`
      case 'left':
        return `${baseClasses} right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2`
      case 'right':
        return `${baseClasses} left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2`
      default:
        return baseClasses
    }
  }

  return (
    <div enable-xr className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <div
        className={`${getPositionClasses()}`}
        style={{
          background: 'linear-gradient(180deg, rgba(16,25,30,0.9) 0%, rgba(17,43,48,0.9) 100%)',
          borderColor: 'rgba(255,255,255,0.12)',
          enableXr: true,
          '--xr-background-material': 'thick',
          '--xr-back': 60
        }}
      >
        {content}
      </div>
    </div>
  )
}
