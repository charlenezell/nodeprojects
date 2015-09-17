/**
 * @require nav/index
 * @require player/index
 */
require(['nav/index'], function(nav) {
  nav.showNav();
  nav.showSideBarNav();
});
require(['player/index'],function(player){
  console.log(player)
})
