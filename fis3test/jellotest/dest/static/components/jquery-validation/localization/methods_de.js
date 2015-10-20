define('components/jquery-validation/localization/methods_de', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/jquery-validation/jquery.validate'], function(require, exports, module) {

  
  (function (factory) {
      
      module.exports = factory(require('components/jquery/jquery'), require('components/jquery-validation/jquery.validate')) || module.exports;;
  }(function ($) {
      /*
   * Localized default methods for the jQuery validation plugin.
   * Locale: DE
   */
      $.extend($.validator.methods, {
          date: function (value, element) {
              return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
          },
          number: function (value, element) {
              return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
          }
      });
  }));

});