import nextJest from 'next/jest.js';

// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  //testEnvironment: 'node',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/playwright/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  preset: 'ts-jest',
};

export default createJestConfig(config);
