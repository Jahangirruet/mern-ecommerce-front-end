import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server:{
      proxy:{
          '/api/':{
              target: 'http://51.89.220.85:5000'
          }
      }
    }

})
