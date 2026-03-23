import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
        '@assets': path.resolve(__dirname, 'assets'),
        '@components': path.resolve(__dirname, 'components'),
        '@pages': path.resolve(__dirname, 'pages'),
        '@services': path.resolve(__dirname, 'store/services'),
        '@store': path.resolve(__dirname, 'store'),
        '@util': path.resolve(__dirname, 'util'),
    },
}
})
