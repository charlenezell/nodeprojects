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

@function  {{{strings.name}}}_inspect($attrName) {
  $ix:{{px.offset_x}};
  $iy:{{px.offset_y}};
  $iw:{{px.width}};
  $ih:{{px.height}};
  $img:"{{{escaped_image}}}";
  @return (height:$ih,width:$iw,x:$ix,y:$iy,img:$img);
}

{{/each}}
{{/block}}


