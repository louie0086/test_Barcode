const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
          query: {
            plugins: ['lodash'],
            presets: [['@babel/env', { targets: { node: 6 } }]]
          }
        }
      ]
    },
    plugins: []
  },
  transpileDependencies: ['barcode-detector'],
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    if (!isDev) {
      config.when(!isDev, config => {
        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [
            {
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }
          ])
          .end()
        config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            vantUI: {
              name: 'chunk-vantUI', // split vantUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
        config.optimization.runtimeChunk('single')

        const {
          terserOptions: { compress, ...otherOpt },
          ...props
        } = require('@vue/cli-service/lib/config/terserOptions')({
          productionSourceMap: false,
          parallel: true
        })

        // config.optimization
        //   .minimizer('terser')
        //     .use(TerserPlugin, [{
        //       terserOptions:{
        //         compress:{
        //           ...compress,
        //           drop_console: true
        //         },
        //         ...otherOpt,
        //         output: {
        //           comments: false,
        //       } ,
        //       },
        //       ...props
        //     }])
      })
    }
  }
}
