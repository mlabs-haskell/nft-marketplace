const path = require('path');
const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (config) => {
      // Add wasm loader
      const wasmExtensionRegExp = /\.wasm$/
      config.resolve.extensions.push('.wasm')
      config.module.rules.forEach(rule => {
        (rule.oneOf || []).forEach(oneOf => {
          if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
            oneOf.exclude.push(wasmExtensionRegExp)
          }
        })
      })
    
      config.module.rules.push({
        test: wasmExtensionRegExp,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: require.resolve('wasm-loader'), options: {} }]
      })

      return config;
    },
    plugins: {
      add: [
        new webpack.DefinePlugin({
          BROWSER_RUNTIME: 1
        }),
      ],
    },
  },
};
