module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx,js}',
    '!src/**/*.styles.{ts}',
    '!src/utilities/*.{ts}'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  testMatch: [
    '**/__tests__/*.+(ts|tsx|js)'
  ],
  globals: {
    'ts-jest': {
      'tsConfig': 'tsconfig.json'
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  resetMocks: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    'dist',
    'typings'
  ]
}
