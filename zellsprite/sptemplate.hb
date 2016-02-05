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
  @include when(mobile){
    @include bgp({{width}},{{height}},{{x}},{{y}},{{total_width}},{{total_height}});
  }
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


