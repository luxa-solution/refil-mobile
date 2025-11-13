/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', 'android/*', 'ios/*', '.expo/*'],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'react/display-name': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'error', // Disallow console.log/error/warn
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-duplicate-imports': 'error', // Prevent importing the same module twice.
      'no-var': 'error', // Enforce let / const instead of var
      'prefer-const': 'error', // Use const when variable is never reassigned
      'no-unused-expressions': 'error',

      'import/no-cycle': ['error', { maxDepth: 2 }], // Avoid circular imports

      // --- Module boundaries ---
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // core → (cannot import from app, features, or shared)
            { target: './src/core', from: './src/app' },
            { target: './src/core', from: './src/features' },
            { target: './src/core', from: './src/shared' },

            // shared → (cannot import from app, or features)
            { target: './src/shared', from: './src/app' },
            { target: './src/shared', from: './src/features' },

            // features → (cannot import from app)
            { target: './src/features', from: './src/app' },
          ],
        },
      ],

      // --- Import sorting and grouping ---
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: '@/core/**', group: 'internal', position: 'before' },
            { pattern: '@/shared/**', group: 'internal', position: 'before' },
            { pattern: '@/features/**', group: 'internal', position: 'before' },
            { pattern: '@/app/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'import/no-unresolved': 'error',
      'import/extensions': [
        'error',
        'never',
        {
          json: 'always',
        },
      ],
    },
  },
]);
