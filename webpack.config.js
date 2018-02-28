

module.exports = {

    // devtool: 'source-map',

    // entry: './src/app.js',
    entry: ['babel-polyfill', './src/app.js'],

    output: {
        filename: "./public/app.min.js",
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'env', 'stage-0'],
                plugins: ['transform-object-rest-spread', 'transform-regenerator']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
};
