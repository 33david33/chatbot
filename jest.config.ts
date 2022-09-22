// jest.config.ts
import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
  coverageDirectory: './coverage',
  verbose: true,
  reporters: ['default', 'jest-junit'],
  projects: [
    {
      displayName: 'bff',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/bff/**/*.test.ts'],
      transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
      setupFilesAfterEnv: ['./jest.setup.console.ts'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      clearMocks: true,
    },
    {
      displayName: 'frontend',
      moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
        'ts',
        'tsx',
        'jsx',
      ],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/tests/frontend/jest/__mocks__/fileMock.ts',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.module.scss$': 'identity-obj-proxy',
      },
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/tests/frontend/**/*.test.ts',
        '<rootDir>/tests/frontend/**/*.test.tsx',
      ],
      setupFilesAfterEnv: ['<rootDir>/jestSetup.ts', './jest.setup.console.ts'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'ts-jest',
      },
      modulePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/setupTestData/',
        '<rootDir>/stress-tests/',
      ],
    },
  ],
};
export default config;
