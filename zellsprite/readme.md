#主要流程 mainProcess
```javascript
    /**
     * 1.include libs
     */
    import spriteTask from "../index.js" ;

    const gulp = require('gulp');
    const sass = require('gulp-ruby-sass');
    const runSequence = require('run-sequence');
    /**
     * 2.register a spriteTask
     */
    spriteTask(gulp,{src:"./imgSrc",dest:"./imgDest",templateFile:"./css.hb"});
    gulp.task("default",["build","watch"]);
    gulp.task("watch",function(){
      return gulp.watch("./*.scss",["sass"]);
    });
    gulp.task("build",function(done){
      runSequence("sprite","sass",done);
    });
    gulp.task("sass", function() {
      return sass(["./*.scss"],{
          sourcemap: false,
          loadPath: ["E:/projectA/source/web/resource/marketnew/common/src/scss/common"]
        })
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest("./"))
    });
```

#配置项说明configuration info
1. options
    ```javascript

      spriteTask(gulp,{src:"./imgSrc",dest:"./imgDest",templateFile:"./css.hb"});

      const defaultOption={
          src : "./style/r_imgSrc/",
          dest : "./style/r_imgDest/",
          taskName : "sprite",
          templateFile : path.join(modulepath, "./sptemplate.hb")
      }

    ```

2. we need a sptemplate.hb which written syntax of handlebars for the output of the sprite scss file ，it looks like this:

    ```handlebars
    {{#block "sprites"}}
    {{#each sprites}}
    @mixin {{{strings.name}}}($mw:null,$mh:null) {
      background-image: url({{{escaped_image}}});
      width: {{px.width}};
      height: {{px.height}};
      @if $mw != null {
        @include when(mobile){
          width: $mw;
          height: $mw*({{height}}/{{width}});;
        }
      }
      @if $mh != null {
        @include when(mobile){
          width: $mh*({{width}}/{{height}});
          height:$mh;
        }
      }
      @include gp({{width}},{{height}},{{x}},{{y}},{{total_width}},{{total_height}});
    }
    ```
3.生成如下的文件:

原来设计的目的是让sprite更加灵活，
因为雪碧的任意数据都可以通过修改模板来实现坐标和图片大小等东西的运算做成中间可编程的scss控件。

eg:可以这样使用
```handlebars
@include popbtns_exchange-h(10rem);
```

![output files and image][outputRef]

[outputRef]:https://github.com/charlenezell/nodeprojects/raw/master/zellsprite/rst.png "output files and image"

