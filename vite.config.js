import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './config',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8098
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('pages', resolve('src/pages'))
      .set('router', resolve('src/router'))
  },
  build: {
    chunkSizeWarningLimit: 1500,
    outDir: 'dist/templates/'
  }

})
