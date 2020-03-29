module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
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
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    // 'flowtype',
    'jest',
  ],
  rules: {
    semi: 'off'
  },
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
};
