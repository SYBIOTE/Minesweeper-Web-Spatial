import { memo } from 'react'

export const GraphicsFallback = memo(() => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[#0C1418] to-[#17252A] text-neutral-100">
      <div className="mx-4 max-w-lg w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white/80">
          <span className="text-xl">⚠️</span>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Graphics Unavailable</h2>
        <p className="text-sm text-neutral-300 mb-4">
          Your browser does not support WebGPU/WebGL or hardware acceleration is disabled.
        </p>
        <div className="text-xs text-neutral-400 space-y-1">
          <p>• Enable hardware acceleration in your browser settings</p>
          <p>• Update to the latest browser version</p>
          <p>• Try a different browser or device</p>
        </div>
      </div>
    </div>
  )
})


