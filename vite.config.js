import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(dir, 'index.html'),
        events: resolve(dir, 'events/index.html'),
        payment: resolve(dir, 'payment/index.html'),
        ticket_buy: resolve(dir, 'ticket_buy/index.html'),
        eventcreate: resolve(dir, 'eventcreate/index.html')
      },
    },
  },
})