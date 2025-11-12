module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push([
    'react-native-unistyles/plugin',
    {
      autoProcessRoot: 'src/app',
      autoProcessImports: ['~/src/shared/components'],
    },
  ]);

  plugins.push('react-native-worklets/plugin');

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
