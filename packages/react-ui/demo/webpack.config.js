const path = require('path');
const filename = './dist/demo.js';
const outpath = path.join(__dirname);
const mode = 'development';
const entry = path.join(__dirname, 'index');
const output = { filename, path: outpath };
const resolve = { extensions: ['.js', '.ts', '.tsx'] };
const rules = [
  { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
  { test: /\.svg$/, use: 'svg-inline-loader' },
];
const devServer = {
  contentBase: __dirname,
  historyApiFallback: {
    index: 'index.html'
  }
};

const buildDemo = {
  mode,
  entry,
  output,
  resolve,
  module: { rules },
  devServer,
}

module.exports = () => [ buildDemo ];
