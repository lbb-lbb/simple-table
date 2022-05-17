
const {
  path
} = require('@vuepress/utils')

module.exports = {
  lang: 'zh-CN',
  title: 'SimpleTable API文档',
  description: '组件说明',
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components')
      }
    ],
  ]
}