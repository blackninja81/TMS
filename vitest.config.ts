import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,        // Allows describe/it/expect without importing
    environment: 'jsdom', // Needed to simulate browser environment
    setupFiles: './vitest.setup.ts', // Optional, for jest-dom matchers
    include: ['src/app/booking/__tests__/**/*.test.tsx'], // Points to your test folder
  },
});
