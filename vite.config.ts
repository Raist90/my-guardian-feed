import react from '@vitejs/plugin-react'
import ssr from 'vike/plugin'
import { defineConfig } from 'vite'
import webfontDownload from 'vite-plugin-webfont-dl'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react({}),
    ssr({}),
    tsconfigPaths(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    ]),
  ],
})
