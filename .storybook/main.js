module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    config.module.rules.unshift({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
    });
    return config;
  },
};
