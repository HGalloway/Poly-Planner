module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
    ],
    plugins: [
      ["module:react-native-dotenv"],
      ['module-resolver', {
        root: ['./'],
        alias: {
          "@assets": ["./assets"],
          "@components": ["./assets/components"],
          "@functionFiles": ["./assets/functionFiles"],
          "@images": ["./assets/images"],
          "@screens": ["./assets/screens"],
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      }
      ]
    ]
  };
};