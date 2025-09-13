import React from 'react'

import { Tooltip } from './Tooltip'

interface ControlButtonProps {
  isActive?: boolean
  onClick: () => void
  children: React.ReactNode
  tooltipContent?: string
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export const ControlButton = ({
  isActive = false,
  onClick,
  children,
  tooltipContent,
  tooltipPosition = 'top'
}: ControlButtonProps) => {
  const buttonElement = (
    <button
      className="w-10 h-10 p-0 rounded-full cursor-pointer transition-all duration-200 ease-out flex items-center justify-center text-base text-white backdrop-blur-sm hover:scale-105 hover:shadow-xl border shadow-lg __enableXr__"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(0,131,145,0.25) 0%, rgba(0,131,145,0.12) 100%)'
          : 'linear-gradient(180deg, rgba(16,25,30,0.6) 0%, rgba(17,43,48,0.6) 100%)',
        borderColor: isActive ? 'rgba(0,131,145,0.2)' : 'rgba(255,255,255,0.08)',
        boxShadow: isActive ? '0 0.125rem 0.5rem rgba(0,131,145,0.2)' : '0 0.125rem 0.25rem rgba(0,0,0,0.04)',
        '--xr-background-material': 'thin',
        '--xr-back': isActive ? 15 : 10
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )

  // If tooltip content is provided, wrap the button with tooltip
  if (tooltipContent) {
    return (
      <Tooltip content={tooltipContent} position={tooltipPosition}>
        {buttonElement}
      </Tooltip>
    )
  }

  // Otherwise return just the button
  return buttonElement
}
