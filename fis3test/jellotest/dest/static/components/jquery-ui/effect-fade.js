define('components/jquery-ui/effect-fade', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/jquery-ui/effect'], function(require, exports, module) {

  /*!
   * jQuery UI Effects Fade 1.11.2
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/fade-effect/
   */
  
  (function (factory) {
      // AMD. Register as an anonymous module.
      
      module.exports = factory(require('components/jquery/jquery'), require('components/jquery-ui/effect'));;
  }(function ($) {
      return $.effects.effect.fade = function (o, done) {
          var el = $(this), mode = $.effects.setMode(el, o.mode || 'toggle');
          el.animate({ opacity: mode }, {
              queue: false,
              duration: o.duration,
              easing: o.easing,
              complete: done
          });
      };
  }));

});