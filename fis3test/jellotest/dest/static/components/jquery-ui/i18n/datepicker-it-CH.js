define('components/jquery-ui/i18n/datepicker-it-CH', ['require', 'exports', 'module', 'components/jquery-ui/datepicker'], function(require, exports, module) {

  /* Italian initialisation for the jQuery UI date picker plugin. */
  /* Written by Antonello Pasella (antonello.pasella@gmail.com). */
  
  (function (factory) {
      // AMD. Register as an anonymous module.
      
      module.exports = factory(require('components/jquery-ui/datepicker'));;
  }(function (datepicker) {
      datepicker.regional['it-CH'] = {
          closeText: 'Chiudi',
          prevText: '&#x3C;Prec',
          nextText: 'Succ&#x3E;',
          currentText: 'Oggi',
          monthNames: [
              'Gennaio',
              'Febbraio',
              'Marzo',
              'Aprile',
              'Maggio',
              'Giugno',
              'Luglio',
              'Agosto',
              'Settembre',
              'Ottobre',
              'Novembre',
              'Dicembre'
          ],
          monthNamesShort: [
              'Gen',
              'Feb',
              'Mar',
              'Apr',
              'Mag',
              'Giu',
              'Lug',
              'Ago',
              'Set',
              'Ott',
              'Nov',
              'Dic'
          ],
          dayNames: [
              'Domenica',
              'Luned\xEC',
              'Marted\xEC',
              'Mercoled\xEC',
              'Gioved\xEC',
              'Venerd\xEC',
              'Sabato'
          ],
          dayNamesShort: [
              'Dom',
              'Lun',
              'Mar',
              'Mer',
              'Gio',
              'Ven',
              'Sab'
          ],
          dayNamesMin: [
              'Do',
              'Lu',
              'Ma',
              'Me',
              'Gi',
              'Ve',
              'Sa'
          ],
          weekHeader: 'Sm',
          dateFormat: 'dd.mm.yy',
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: ''
      };
      datepicker.setDefaults(datepicker.regional['it-CH']);
      return datepicker.regional['it-CH'];
  }));

});