module.exports = {
  //关闭eslint
  lintOnSave: false,
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  // publicPath: "./",
  // assetsDir: "static",
  // outputDir: 'dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://cquptestion.com/application', // 你要访问的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 路径重写
        }
      }
    }
  }
}
