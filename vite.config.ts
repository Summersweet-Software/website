import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  build: {
    cssMinify: 'lightningcss',
  },
//   resolve: {
//     alias: {
//         '@assets': path.resolve(__dirname, 'assets'),
//         '@components': path.resolve(__dirname, 'components'),
//         '@pages': path.resolve(__dirname, 'pages'),
//         '@services': path.resolve(__dirname, 'store/services'),
//         '@store': path.resolve(__dirname, 'store'),
//         '@util': path.resolve(__dirname, 'util'),
//     },
// }
})
