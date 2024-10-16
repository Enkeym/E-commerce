import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// Получаем текущий путь через fileURLToPath
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Загружаем .env файл из кастомного пути
config({ path: path.resolve(__dirname, '../.env') })

// Конфигурация Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
