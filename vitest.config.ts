import { defineConfig } from 'vitest/config';

// This repo is the source of the shared config, not a consumer of it, so it
// doesn't have a src/ layout to alias — this is a plain, local Vitest config
// just for testing base.js itself.
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['vitest/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
