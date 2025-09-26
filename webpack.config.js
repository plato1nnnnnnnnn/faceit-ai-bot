const path = require('path');

module.exports = {
  entry: {
    popup: './src/Popup.jsx',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  mode: 'development',
};
