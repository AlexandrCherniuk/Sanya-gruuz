import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// На GitHub Pages сайт живёт в /<репо>/. Когда подключим домен, задать BASE_PATH=/ при сборке.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.BASE_PATH ?? (repoName ? `/${repoName}/` : '/')

export default defineConfig(({ isSsrBuild }) => ({
  base,
  plugins: [react()],
  build: isSsrBuild
    ? { outDir: 'dist-ssr', emptyOutDir: true }
    : {
        outDir: 'dist',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: { input: 'src/client.tsx' },
      },
  server: { host: true, port: 5173 },
}))
