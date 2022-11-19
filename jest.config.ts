import nextJest from 'next/jest.js';

// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/playwright/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
};

export default createJestConfig(config);
