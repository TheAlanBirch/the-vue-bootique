import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  define: {
    'import.meta.test': 'true',
  },
  // any custom Vitest config you require
  test: {
    environment: 'nuxt',
    globals: true,
  },
});
