import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages hosts this project under /<repository-name>/, while local
// development serves it from the domain root.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
  server: {
    // 明确指定 public 目录
    fs: {
      strict: false,
    },
  },
})