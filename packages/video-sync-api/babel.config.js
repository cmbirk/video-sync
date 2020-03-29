module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-flow',
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        config: './config',
      },
    }],
  ],
}
