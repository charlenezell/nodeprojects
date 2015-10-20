define('components/bootstrap/bootstrap', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/bootstrap/alert', 'components/bootstrap/button', 'components/bootstrap/carousel', 'components/bootstrap/collapse', 'components/bootstrap/dropdown', 'components/bootstrap/modal', 'components/bootstrap/tooltip', 'components/bootstrap/popover', 'components/bootstrap/scrollspy', 'components/bootstrap/tab', 'components/bootstrap/affix'], function(require, exports, module) {

  var jQuery = require('components/jquery/jquery');
  require('components/bootstrap/alert');
  require('components/bootstrap/button');
  require('components/bootstrap/carousel');
  require('components/bootstrap/collapse');
  require('components/bootstrap/dropdown');
  require('components/bootstrap/modal');
  require('components/bootstrap/tooltip');
  require('components/bootstrap/popover');
  require('components/bootstrap/scrollspy');
  require('components/bootstrap/tab');
  require('components/bootstrap/affix');
  module.exports = require('components/jquery/jquery');
  

});