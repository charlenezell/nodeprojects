define('components/jquery-ui/effect-puff', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/jquery-ui/effect', 'components/jquery-ui/effect-scale'], function(require, exports, module) {

  /*!
   * jQuery UI Effects Puff 1.11.2
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/puff-effect/
   */
  
  (function (factory) {
      // AMD. Register as an anonymous module.
      
      module.exports = factory(require('components/jquery/jquery'), require('components/jquery-ui/effect'), require('components/jquery-ui/effect-scale'));;
  }(function ($) {
      return $.effects.effect.puff = function (o, done) {
          var elem = $(this), mode = $.effects.setMode(elem, o.mode || 'hide'), hide = mode === 'hide', percent = parseInt(o.percent, 10) || 150, factor = percent / 100, original = {
                  height: elem.height(),
                  width: elem.width(),
                  outerHeight: elem.outerHeight(),
                  outerWidth: elem.outerWidth()
              };
          $.extend(o, {
              effect: 'scale',
              queue: false,
              fade: true,
              mode: mode,
              complete: done,
              percent: hide ? percent : 100,
              from: hide ? original : {
                  height: original.height * factor,
                  width: original.width * factor,
                  outerHeight: original.outerHeight * factor,
                  outerWidth: original.outerWidth * factor
              }
          });
          elem.effect(o);
      };
  }));

});