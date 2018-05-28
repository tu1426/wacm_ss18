module.exports = {
  entry: './frontend/main.js',
  output: {
    filename: './frontend/dist/bundle.js'
  },
  resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
},
  module: {
    loaders: [
      {
        // Ask webpack to check: If this file ends with .js, then apply some transforms
        test: /\.js$/,
        // Transform it with babel
        loader: 'babel-loader',
        // don't transform node_modules folder (which don't need to be compiled)
        exclude: /node_modules/
      },
      {
        // Ask webpack to check: If this file ends with .vue, then apply some transforms
        test: /\.vue$/,
        // don't transform node_modules folder (which don't need to be compiled)
        exclude: /(node_modules|bower_components)/,
        // Transform it with vue
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};
