import { useEffect, useRef, useState } from 'react'
import type { GameConfig } from '../../AppConfig'
import { AudioService } from '../../game/Audio'

const AUDIO_STORAGE_KEY = 'minesweeper-audio-enabled'

export const useAudio = (config: GameConfig) => {
  const audioServiceRef = useRef<AudioService>(undefined)
  
  // Add localStorage-synced audio state
  const [audioEnabled, setAudioEnabledState] = useState(() => {
    if (typeof window === 'undefined') return config.audio.enabled
    const stored = localStorage.getItem(AUDIO_STORAGE_KEY)
    return stored !== null ? JSON.parse(stored) : config.audio.enabled
  })

  // Create audio service with current enabled state
  useEffect(() => {
    audioServiceRef.current = new AudioService(
      config.audio.sounds,
      audioEnabled, // Use state instead of config
      config.audio.volume
    )
    return () => {
      audioServiceRef.current = undefined
    }
  }, [config.audio, audioEnabled])

  // Listen for storage changes from other windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUDIO_STORAGE_KEY && e.newValue !== null) {
        const newEnabled = JSON.parse(e.newValue)
        setAudioEnabledState(newEnabled)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const playSound = (soundKey: keyof typeof config.audio.sounds) => {
    audioServiceRef.current?.play(soundKey)
  }

  const setVolume = (volume: number) => {
    audioServiceRef.current?.setVolume(volume)
  }

  const setEnabled = (enabled: boolean) => {
    setAudioEnabledState(enabled)
    audioServiceRef.current?.setEnabled(enabled)
    // Sync to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(enabled))
    }
  }

  return { playSound, setVolume, setEnabled, audioEnabled }
}