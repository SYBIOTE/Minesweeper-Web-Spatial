export class AudioService {
    private sounds: Map<string, HTMLAudioElement> = new Map()
    private enabled: boolean = true
    private volume: number = 0.7
  
    constructor(soundPaths: Record<string, string>, enabled = true, volume = 0.7) {
      this.enabled = enabled
      this.volume = Math.max(0, Math.min(1, volume))
      
      // Preload all sounds
      Object.entries(soundPaths).forEach(([key, path]) => {
        const audio = new Audio(path)
        audio.preload = 'auto'
        audio.volume = this.volume
        this.sounds.set(key, audio)
      })
    }
  
    async play(soundKey: string): Promise<void> {
      if (!this.enabled) return
      
      const sound = this.sounds.get(soundKey)
      if (!sound) {
        console.warn(`Sound '${soundKey}' not found`)
        return
      }
  
      try {
        // Reset to beginning and play
        sound.currentTime = 0
        await sound.play()
      } catch (error) {
        console.warn(`Failed to play sound '${soundKey}':`, error)
      }
    }
  
    setVolume(volume: number): void {
      this.volume = Math.max(0, Math.min(1, volume))
      this.sounds.forEach(sound => {
        sound.volume = this.volume
      })
    }
  
    setEnabled(enabled: boolean): void {
      this.enabled = enabled
    }
  
    // For WebSpatial - spatial audio positioning
    play3D(soundKey: string, position: { x: number, y: number, z: number }): void {
        if (!this.enabled) return
        const sound = this.sounds.get(soundKey)
        if (sound && 'spatialSound' in window) {
          // Use WebSpatial's spatial audio API
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).spatialSound.play(sound, position)
        } else {
          this.play(soundKey)
        }
      }
  }