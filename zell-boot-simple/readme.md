#安装方式#
1. node,npm环境
2. ruby,ruby-sass环境
3. 安装zell-boot
```Shell
   $ npm install -g zell-boot
```
4. 初始化项目
```Shell
    $ mkdir projectPath
    $ cd projectPath
    $ zell-boot
```
选择各种选项创建好项目框架。
5. 安装项目依赖
```Shell
  $ npm install
```
6. 构建项目
```Shell
  $ gulp
```

#配置说明#
 env.json

```JSON
{
    "deployPath":"./dp/",
    "sourceUrl":"http://xxx.100bt.com/resource/",
    "resourcePath":"./resource/",
    "spriteGeneratTemplate":"./sptemplate.hb"
}
```

1. deployPath 站点部署路径
2. sourceUrl 站点的根url
3. resourcePath 站点图片等耗时编译资源的路径
4. spriteGeneratTemplate 图片雪碧图生成中间scss代码的模板

sptemplate.hb

项目使用scss作为css的预编译语言，sprite会根据目录结构生成相应名字和格式的图片。
比如如下目录结构。
```Shell
    sprite/p8_v_sprite/*.{png,jpg}
```

这样子的话会生成一个叫做sprite的图片，图片内容为文件夹内的所有图片；
而p8,v,s,h等前缀会作为参数去改变雪碧图的生成规则
p8:生成png8的透明图片半透明在ie6下回表现出全透明；
v:vertical地拼接图片
s:阶梯状拼接图片
h:horizontal地拼接图片
此时会在src目录里面生成一个佳作sprite.scss的雪碧图定义scss;
内容就是通过sptemplate.hb模板定义的。
```Handlebars
{{#block "sprites"}}
    {{#each sprites}}
    @mixin {{{strings.name}}}($x:null,$y:null) {
      background-image: url({{{escaped_image}}});
      $ix:{{px.offset_x}};
      $iy:{{px.offset_y}};
      @if $x != null {
      $ix:$x;
      }
      @if $y !=null{
        $iy:$y;
      }
      background-position: $ix $iy;
      width: {{px.width}};
      height: {{px.height}};
    }

    @function  {{{strings.name}}}_inspect() {
      $ix:{{px.offset_x}};
      $iy:{{px.offset_y}};
      $iw:{{px.width}};
      $ih:{{px.height}};
      $img:"{{{escaped_image}}}";
      @return (height:$ih,width:$iw,x:$ix,y:$iy,img:$img);
    }

    {{/each}}
{{/block}}
```

这里是handlebars的语法。
比如:
sprite/p8_v_spritename/hello.png
会正常一份这样子的scss mixin 和一个自省的函数

```SCSS
@mixin spritename_hello($x:null,$y:null) {
  background-image: url(img/sprite/spritename.png);
  $ix:-144px;
  $iy:0px;
  @if $x != null {
  $ix:$x;
  }
  @if $y !=null{
    $iy:$y;
  }
  background-position: $ix $iy;
  width: 150px;
  height: 36px;
}

@function  spritename_hello_inspect() {
  $ix:-144px;
  $iy:0px;
  $iw:150px;
  $ih:36px;
  $img:"img/sprite/spritename.png";
  @return (height:$ih,width:$iw,x:$ix,y:$iy,img:$img);
}
```

这样子就可以通过其他入口scss去引用这个scss来做灵活的sprite处理；

```SCSS
@import "sprite";
.hellobtn{
    border:1px solid red;
    @include spritename_hello;//注入sprite的mixin
    margin-left:map-get(spritename_hello_inspect(),"width");//注入图片的大小等自省的数据
}
```
