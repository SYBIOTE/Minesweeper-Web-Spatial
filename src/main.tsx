// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './App'
import { MinefieldPage } from './pages/MinefieldPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/minefield" element={<MinefieldPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)