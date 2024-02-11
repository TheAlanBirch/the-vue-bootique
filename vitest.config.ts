import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    globals: true,
    // Specify the paths to your test files
    include: ['test/**/*.test.ts']
  }
})
