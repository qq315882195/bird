const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        // 忽略 Node.js 模块
        net: false,
        tls: false,
        dns: false,
        fs: false,
      }
    }
  }
})
