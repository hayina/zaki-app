

module.exports = {

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
                presets: ['react']
              }
            }
          }
        ]
      }
};