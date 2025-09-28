import React from 'react'

import { App } from './App'
import { MinefieldPage } from './pages/MinefieldPage'

// Simple router for WebSpatial scenes
export const Router: React.FC = () => {
  // Check current path to determine which component to render
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (currentPath === '/minefield') {
    return <MinefieldPage />
  }

  // Default to main app
  return <App />
}
