const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/hug-web': {
        target: 'http://www.lanniuh.com/',
        changeOrigin: true,
      },
      '/': {
        target: 'https://wuhan.lanniuh.com/',
        changeOrigin: true,
      },
    }
  }
};
