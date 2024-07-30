/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true)
  const plugins = []

  plugins.push([
    '@tamagui/babel-plugin',
    {
      components: ['tamagui'],
      config: './tamagui.config.ts',
      logTimings: true,
      disableExtraction: process.env.NODE_ENV === 'development',
    },
    'react-native-reanimated/plugin',
  ])

  return {
    presets: ['babel-preset-expo'],
    plugins,
  }
}
