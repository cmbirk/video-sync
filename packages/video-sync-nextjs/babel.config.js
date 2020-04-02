module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        alias: {
          '@components': './src/components',
          '@config': './next.config.js',
          '@icons': './src/icons',
          '@layout': './src/layout',
        },
      },
    ],
  ],
}
