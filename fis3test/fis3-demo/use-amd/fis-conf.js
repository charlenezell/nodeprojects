// npm install [-g] fis3-hook-amd
var del = require("del");
del.sync("./dist/**");

var releasePath = "/"
    // var deployUri="http://127.0.0.1:8080";

// fis.hook('commonjs');
fis.hook('amd', {
    baseUrl:"./component/",
    paths: {
        "jquery": '/components/jquery/jquery.js'
    }
});
fis.match('*.html', {
    useMap: true
})

fis.match('::package', {
    spriter: fis.plugin('csssprites'),
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    // packager:fis.plugin("depscombine"),
    postpackager: fis.plugin('loader', {
        /*resourceType: 'amd',*/
        allInOne: {
            ignore:["lib/**.js","components/**.js"]
        }/*,
        useInlineMap: true */// 资源映射表内嵌
    })
});


(function() {
    var orgignore = fis.config.get("project.ignore");
    fis.config.set("project.ignore", orgignore.concat(["dist/**"]));
})();

fis.match('/component/**/*.scss', {
        // fis-parser-less 插件进行解析
        parser: fis.plugin('node-sass'),
        // .less 文件后缀构建后被改成 .css 文件
        rExt: '.css',
        useHash:true
    })
    // fis.match("component/nav/index.js",{
    //     id:"hellonav"
    // })
fis.match("/lib/**.js",{
    useHash:true,
    optimizer: fis.plugin('uglify-js')
});
fis.match("/page/**.js",{
    useHash:true,
    optimizer: fis.plugin('uglify-js')
})
fis.match('/component/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: releasePath + "$0",
    // url:deployUri+"$0",
    optimizer: fis.plugin('uglify-js'),
    useHash: true
});

fis.match("/component/**/*.css", {
    optimizer: fis.plugin('clean-css'),
    release: releasePath + "$0",
    // url:deployUri+"$0",
    useSprite: true,
    useHash: true
});

fis.match("/component/**/bg_*.{jpg,jpeg}", {
    release: releasePath + "$0",
    // url:deployUri+"$0",
    useHash: true,
    optimizer: function(content) {
        return content
    }
});

fis.match("/comp/**/bg_*.png", {
    release: releasePath + "$0",
    // url:deployUri+"$0",
    useHash: true,
    optimizer: fis.plugin('png-compressor', {
        //这里应该可以文件名前后缀配置处理器
        // pngcrush or pngquant
        // default is pngcrush
        type: 'pngquant'
    })
});

// fis3 release prod 产品发布，进行合并
// fis.media('prod')
//     .match('*.js', {
//         packTo: '/static/aio.js'
//     });
// fis.media('debug').match('*.{js,css,png}', {
//     useHash: false,
//     useSprite: false,
//     optimizer: null
// })
