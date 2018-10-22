const path = require('path');

const filename = './build/app.js';
const outpath = __dirname;
const mode = 'development';
const extensions = ['.js', '.ts'];
const entry = path.join(__dirname, 'index');
const output = { filename, path: outpath };

const rules = [
  { test: /\.ts?$/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] },
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  { test: /\.yml$/, loader: 'json-loader!yaml-loader' },
];
const devServer = {
  contentBase: __dirname,
  historyApiFallback: {
    index: 'index.html'
  }
};

module.exports = () => ({
  module: { rules },
  mode,
  entry,
  resolve: { extensions },
  output,
  devServer,
});
