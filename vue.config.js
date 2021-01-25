//  接口代理
module.exports = {
  outputDir: './wechat-pay',
  publicPath: '/wechat-pay/',
  devServer: {
    proxy: {
      // 容丽姐
      '/wpi': {
        target: 'http://asm-test.seedland.cc:8084/life-web/sso/api/workorder',
        changeOrigin: true,
        pathRewrite: {
          '^/wpi': ''
        }
      },
    }
  },

};
