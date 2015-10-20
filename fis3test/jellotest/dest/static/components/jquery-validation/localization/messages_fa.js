define('components/jquery-validation/localization/messages_fa', ['require', 'exports', 'module', 'components/jquery/jquery', 'components/jquery-validation/jquery.validate'], function(require, exports, module) {

  
  (function (factory) {
      
      module.exports = factory(require('components/jquery/jquery'), require('components/jquery-validation/jquery.validate')) || module.exports;;
  }(function ($) {
      /*
   * Translated default messages for the jQuery validation plugin.
   * Locale: FA (Persian; فارسی)
   */
      $.extend($.validator.messages, {
          required: '\u062A\u06A9\u0645\u06CC\u0644 \u0627\u06CC\u0646 \u0641\u06CC\u0644\u062F \u0627\u062C\u0628\u0627\u0631\u06CC \u0627\u0633\u062A.',
          remote: '\u0644\u0637\u0641\u0627 \u0627\u06CC\u0646 \u0641\u06CC\u0644\u062F \u0631\u0627 \u062A\u0635\u062D\u06CC\u062D \u06A9\u0646\u06CC\u062F.',
          email: '.\u0644\u0637\u0641\u0627 \u06CC\u06A9 \u0627\u06CC\u0645\u06CC\u0644 \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F',
          url: '\u0644\u0637\u0641\u0627 \u0622\u062F\u0631\u0633 \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.',
          date: '\u0644\u0637\u0641\u0627 \u06CC\u06A9 \u062A\u0627\u0631\u06CC\u062E \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F',
          dateFA: '\u0644\u0637\u0641\u0627 \u06CC\u06A9 \u062A\u0627\u0631\u06CC\u062E \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F',
          dateISO: '\u0644\u0637\u0641\u0627 \u062A\u0627\u0631\u06CC\u062E \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F (ISO).',
          number: '\u0644\u0637\u0641\u0627 \u0639\u062F\u062F \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.',
          digits: '\u0644\u0637\u0641\u0627 \u062A\u0646\u0647\u0627 \u0631\u0642\u0645 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F',
          creditcard: '\u0644\u0637\u0641\u0627 \u06A9\u0631\u06CC\u062F\u06CC\u062A \u06A9\u0627\u0631\u062A \u0635\u062D\u06CC\u062D \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.',
          equalTo: '\u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631 \u0628\u0631\u0627\u0628\u0631\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F',
          extension: '\u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F \u06A9\u0647 ',
          maxlength: $.validator.format('\u0644\u0637\u0641\u0627 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 {0} \u062D\u0631\u0641 \u0648\u0627\u0631\u062F \u0646\u06A9\u0646\u06CC\u062F.'),
          minlength: $.validator.format('\u0644\u0637\u0641\u0627 \u06A9\u0645\u062A\u0631 \u0627\u0632 {0} \u062D\u0631\u0641 \u0648\u0627\u0631\u062F \u0646\u06A9\u0646\u06CC\u062F.'),
          rangelength: $.validator.format('\u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631\u06CC \u0628\u06CC\u0646 {0} \u062A\u0627 {1} \u062D\u0631\u0641 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.'),
          range: $.validator.format('\u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631\u06CC \u0628\u06CC\u0646 {0} \u062A\u0627 {1} \u062D\u0631\u0641 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.'),
          max: $.validator.format('\u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631\u06CC \u06A9\u0645\u062A\u0631 \u0627\u0632 {0} \u062D\u0631\u0641 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.'),
          min: $.validator.format('\u0644\u0637\u0641\u0627 \u0645\u0642\u062F\u0627\u0631\u06CC \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 {0} \u062D\u0631\u0641 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.'),
          minWords: $.validator.format('\u0644\u0637\u0641\u0627 \u062D\u062F\u0627\u0642\u0644 {0} \u06A9\u0644\u0645\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.'),
          maxWords: $.validator.format('\u0644\u0637\u0641\u0627 \u062D\u062F\u0627\u06A9\u062B\u0631 {0} \u06A9\u0644\u0645\u0647 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.')
      });
  }));

});