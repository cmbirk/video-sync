module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    // 'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    // 'plugin:flowtype/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [
    {
      files: ['.utils/**'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-console': 0,
      },
    },
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'babel',
    'react',
    // 'flowtype',
    // 'jest',
  ],
  rules: {
    semi: 'off'
  },
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
    react: {
      version: 'detect',
    },
  },
};
