import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Path to your setup file
  testEnvironment: 'jsdom', // Ensures DOM-related testing works
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Optional: Handle CSS imports
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transpile TypeScript
  },
};

export default config;
