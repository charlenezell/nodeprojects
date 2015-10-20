define('components/jquery-validation/localization/methods_pt', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/jquery-validation/jquery.validate'], function(require, exports, module) {

  
  (function (factory) {
      
      module.exports = factory(require('components/jquery/jquery'), require('components/jquery-validation/jquery.validate')) || module.exports;;
  }(function ($) {
      /*
   * Localized default methods for the jQuery validation plugin.
   * Locale: PT_BR
   */
      $.extend($.validator.methods, {
          date: function (value, element) {
              return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d?\d?$/.test(value);
          }
      });
  }));

});