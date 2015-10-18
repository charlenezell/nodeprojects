//全局依赖 fis3
//局部/全局依赖 npm install [-g] fis3-hook-amd

var releasePath = "./static/";

var srcPath = "./src/";

fis.hook('amd', {
  baseUrl: "./mycomponents/",
  paths: {
    "jquery": '/components/jquery/jquery.js'
  }
});
fis.match(srcPath + '**.less', {
  rExt: '.css', // from .less to .css
  parser: fis.plugin('less-2.x', {
    // fis-parser-less-2.x option
  })
});
fis.match(srcPath + '**.scss', {
  useMap: true
  rExt: '.css', // from .scss to .css
  parser: fis.plugin('sass', {
    //fis-parser-sass option
  })
});
fis.match(srcPath + '**.css', {
  useMap: true
});
fis.match(srcPath + '**.es', {
  useMap: true,
  rExt: '.js',
  parser: fis.plugin('es6-babel')
});
fis.match(srcPath + '**.js', {
  useMap: true
});
fis.match(srcPath + '**.html', {
  optimizer: fis.plugin('html-minifier')
});

fis.match(srcPath + '({common,components}/**)', {
  release: releasePath + "$1";
});

fis.match(srcPath + 'page/**/(*.html)', {
  release: releasePath + "$1";
});
fis.match(srcPath + '(page/**/*.{css,scss,less,js,es})', {
  release: releasePath + "$1";
});

fis.match('::package', {
  spriter: fis.plugin('csssprites'),
  // npm install [-g] fis3-postpackager-loader
  // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
  // packager:fis.plugin("depscombine"),
  postpackager: fis.plugin('loader', {
    /*resourceType: 'amd',*/
    allInOne: {
      ignore: ["lib/**.js", "components/**.js"]
    }
    /*,
            useInlineMap: true */ // 资源映射表内嵌
  })
});
