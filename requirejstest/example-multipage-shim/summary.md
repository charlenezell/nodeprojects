# 小结一下r.js的examples #
```javascript
//下面为build.js
{
    appDir: '../www',
    mainConfigFile: '../www/js/common.js',//读取配置的路径里面的shim和baseurl会起作用
    dir: '../www-built',//构造的结果目录
    modules: [//modules里面的路径都是相对于mainConfig里面的baseUrl的
        {
            name: '../common',
            include: ['jquery',
                      'app/lib',
                      'app/controller/Base',
                      'app/model/Base'
            ]//手动include定义模块的concat
        },
        {
            name: 'app/main1',
            exclude: ['../common']//会exclude掉common里面所有的依赖
        },
        {
            name: 'app/main2',
            exclude: ['../common']
        }/*依赖是可以用requirejs的amd的require([...])或者cmd的require(name)
        传入但是嵌套的require不会生效只能通过在这里配置include项目来注入，
        (嵌套的require表达的是一种异步的依赖，看看是否可以放到同步依赖上面，或者说
        本来就是必须异步的话就没有必要合并了。。。这里需要权衡和注意）*/
    ]
}
//下面为common.js
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    },
    shim: {
        backbone: {
            deps: ['jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

```
