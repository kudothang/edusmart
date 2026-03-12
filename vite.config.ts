import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path/win32'

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
  base: "/edusmart/",
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
