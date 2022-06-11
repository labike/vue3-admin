/*
 * @Author: your name
 * @Date: 2022-03-11 09:47:32
 * @LastEditTime: 2022-03-11 09:57:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/vue.config.js
 */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack(config) {
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
  }
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'https://auth1.ymstu.cn',
  //       changeOrigin: true
  //     }
  //   }
  // }
}
