/// <reference types="vitest" />
import { defineConfig } from 'vite'
import globalSetup from './vitest-global-setup'

export default defineConfig({
  test: {
    global: true,
    globalSetup,
  },
})
