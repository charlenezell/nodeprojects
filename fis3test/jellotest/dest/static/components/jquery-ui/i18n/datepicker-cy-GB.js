define('components/jquery-ui/i18n/datepicker-cy-GB', ['require', 'exports', 'module', 'components/jquery-ui/datepicker'], function(require, exports, module) {

  /* Welsh/UK initialisation for the jQuery UI date picker plugin. */
  /* Written by William Griffiths. */
  
  (function (factory) {
      // AMD. Register as an anonymous module.
      
      module.exports = factory(require('components/jquery-ui/datepicker'));;
  }(function (datepicker) {
      datepicker.regional['cy-GB'] = {
          closeText: 'Done',
          prevText: 'Prev',
          nextText: 'Next',
          currentText: 'Today',
          monthNames: [
              'Ionawr',
              'Chwefror',
              'Mawrth',
              'Ebrill',
              'Mai',
              'Mehefin',
              'Gorffennaf',
              'Awst',
              'Medi',
              'Hydref',
              'Tachwedd',
              'Rhagfyr'
          ],
          monthNamesShort: [
              'Ion',
              'Chw',
              'Maw',
              'Ebr',
              'Mai',
              'Meh',
              'Gor',
              'Aws',
              'Med',
              'Hyd',
              'Tac',
              'Rha'
          ],
          dayNames: [
              'Dydd Sul',
              'Dydd Llun',
              'Dydd Mawrth',
              'Dydd Mercher',
              'Dydd Iau',
              'Dydd Gwener',
              'Dydd Sadwrn'
          ],
          dayNamesShort: [
              'Sul',
              'Llu',
              'Maw',
              'Mer',
              'Iau',
              'Gwe',
              'Sad'
          ],
          dayNamesMin: [
              'Su',
              'Ll',
              'Ma',
              'Me',
              'Ia',
              'Gw',
              'Sa'
          ],
          weekHeader: 'Wy',
          dateFormat: 'dd/mm/yy',
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: ''
      };
      datepicker.setDefaults(datepicker.regional['cy-GB']);
      return datepicker.regional['cy-GB'];
  }));

});