const AzureFunctionsWebpackPlugin = require('../../');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new AzureFunctionsWebpackPlugin(),
  ],
};
