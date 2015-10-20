define('components/jquery-validation/localization/messages_bg', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/jquery-validation/jquery.validate'], function(require, exports, module) {

  
  (function (factory) {
      
      module.exports = factory(require('components/jquery/jquery'), require('components/jquery-validation/jquery.validate')) || module.exports;;
  }(function ($) {
      /*
   * Translated default messages for the jQuery validation plugin.
   * Locale: BG (Bulgarian; български език)
   */
      $.extend($.validator.messages, {
          required: '\u041F\u043E\u043B\u0435\u0442\u043E \u0435 \u0437\u0430\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E.',
          remote: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043D\u0430\u0442\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442.',
          email: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u0435\u043D email.',
          url: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u043E URL.',
          date: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0434\u0430\u0442\u0430.',
          dateISO: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0434\u0430\u0442\u0430 (ISO).',
          number: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u043E\u043C\u0435\u0440.',
          digits: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0430\u043C\u043E \u0446\u0438\u0444\u0440\u0438.',
          creditcard: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u043E\u043C\u0435\u0440 \u043D\u0430 \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u0430 \u043A\u0430\u0440\u0442\u0430.',
          equalTo: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u044A\u0449\u0430\u0442\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u043E\u0442\u043D\u043E\u0432\u043E.',
          extension: '\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0441 \u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0440\u0430\u0437\u0448\u0438\u0440\u0435\u043D\u0438\u0435.',
          maxlength: $.validator.format('\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u043F\u043E\u0432\u0435\u0447\u0435 \u043E\u0442 {0} \u0441\u0438\u043C\u0432\u043E\u043B\u0430.'),
          minlength: $.validator.format('\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u043F\u043E\u043D\u0435 {0} \u0441\u0438\u043C\u0432\u043E\u043B\u0430.'),
          rangelength: $.validator.format('\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0441 \u0434\u044A\u043B\u0436\u0438\u043D\u0430 \u043C\u0435\u0436\u0434\u0443 {0} \u0438 {1} \u0441\u0438\u043C\u0432\u043E\u043B\u0430.'),
          range: $.validator.format('\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u043C\u0435\u0436\u0434\u0443 {0} \u0438 {1}.'),
          max: $.validator.format('\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u043F\u043E-\u043C\u0430\u043B\u043A\u0430 \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u0430 \u043D\u0430 {0}.'),
          min: $.validator.format('\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u043F\u043E-\u0433\u043E\u043B\u044F\u043C\u0430 \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u0430 \u043D\u0430 {0}.')
      });
  }));

});