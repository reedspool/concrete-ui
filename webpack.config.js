module.exports = {
  context: "./app/scripts",
  entry: "./main",
  module: {
      loaders: [
        { test: /bacon\.jquery/, loader: 'imports?define=>false' },
        { test: /bacon\.model/, loader: 'imports?define=>false' }
      ]
  },
  output: {
      path: "./dist/scripts/bundle",
      filename: "bundle.js"
  },
  resolveLoader: {
    root: require('path').join(__dirname, "node_modules")
  }
};
