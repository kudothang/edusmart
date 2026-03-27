import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler'] ],
      },
    }),
  ],
  base: process.env.VERCEL ? '/' : '/edusmart/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (
            id.includes('antd') ||
            id.includes('@ant-design') ||
            id.includes('rc-') ||
            id.includes('dayjs')
          ) {
            return 'antd'
          }

          if (id.includes('framer-motion')) {
            return 'motion'
          }

          if (id.includes('@tanstack/react-query') || id.includes('@tanstack/query-core')) {
            return 'react-query'
          }

          if (id.includes('lucide-react')) {
            return 'icons'
          }

          if (id.includes('react-router')) {
            return 'router'
          }

          if (
            id.includes('react') ||
            id.includes('scheduler')
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
