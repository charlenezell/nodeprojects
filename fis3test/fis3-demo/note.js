资源定位
选择器+属性定义
项目有一定的默认值
同时命中会用css式的覆盖规则

var DEFAULT_SETTINGS = {
  project: {
    charset: 'utf8',
    md5Length: 7,
    md5Connector: '_',
    files: ['**'],
    ignore: ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js']
  },

  component: {
    skipRoadmapCheck: true,
    protocol: 'github',
    author: 'fis-components'
  },

  modules: {
    hook: 'components',
    packager: 'map'
  },

  options: {}
};

使用.media(env)做环境的配置
fis3 inspect <media> 查看特定 media 的分配情况
