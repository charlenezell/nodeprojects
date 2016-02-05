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
  @include bgp({{width}},{{height}},{{x}},{{y}},{{total_width}},{{total_height}});
}

@function  {{{strings.name}}}_inspect() {
  $ix:{{px.offset_x}};
  $x:{{x}};
  $y:{{y}};
  $iy:{{px.offset_y}};
  $iw:{{px.width}};
  $ih:{{px.height}};
  $width:{{width}};
  $height:{{height}};
  $img:"{{{escaped_image}}}";
  $totalWidth:{{total_width}};
  $totalHeight:{{total_height}};
  @return (px_height:$ih,px_width:$iw,px_x:$ix,px_y:$iy,img:$img,totalHeight:$totalHeight,totalWidth:$totalWidth,x:$x,y:$y,width:$width,height:$height);
}

{{/each}}
{{/block}}
