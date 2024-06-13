module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],

      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  plugins: ['react-hooks', 'simple-import-sort'],
  ignorePatterns: [
    'webpack.config.js',
    '**/node_modules/**',
    'web-build/**',
    'dist/**',
    '.expo/**',
    '.expo-shared/**',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'no-console': 'error',
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: false,
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000', '^react', '^react-native'],
          ['^@?\\w', '^react-native-?\\w'],
          ['^expo?\\w'],
          ['^tamagui?\\w', '^@tamagui?\\w'],
          [
            '^@/assets',
            '^@/components',
            '^@/hooks',
            '^@/app',
            '^@/router',
            '^@/utils',
            '^@/store',
            '^@/config',
          ],
          ['^\\.'],
          ['~?\\w'],
          ['\\./styles'],
        ],
      },
    ],
    'import/order': ['off'],
  },
}
