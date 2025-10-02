import react from '@vitejs/plugin-react'
import webspatial from '@webspatial/vite-plugin'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    
    basicSsl(),
    react({
      jsxImportSource: '@webspatial/react-sdk'
    }),
    webspatial(
      {
        outputDir: "",
      }
    ),
    createHtmlPlugin({
      inject: {
        data: {
          XR_ENV: process.env.XR_ENV
        }
      }
    })
  ],
  base: process.env.NODE_ENV === 'production'
  && (
    process.env.XR_ENV !== 'avp'
      ? '/minesweeper/'
     : '/webspatialminesweeper/'
  ) || ''
})
