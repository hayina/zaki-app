

module.exports = {

    // devtool: 'source-map',

    entry: './src/app.js',

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
                presets: ['react', 'env'],
                plugins: ['transform-object-rest-spread']
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
