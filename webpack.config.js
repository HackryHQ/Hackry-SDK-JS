const path = require('path');

const config = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hackry.min.js',
    library: 'Hackry',
    libraryTarget: 'umd',
  },
};

module.exports = config;
