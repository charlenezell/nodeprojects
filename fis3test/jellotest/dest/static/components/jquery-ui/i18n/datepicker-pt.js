define('components/jquery-ui/i18n/datepicker-pt', ['require', 'exports', 'module', 'components/jquery-ui/datepicker'], function(require, exports, module) {

  /* Portuguese initialisation for the jQuery UI date picker plugin. */
  
  (function (factory) {
      // AMD. Register as an anonymous module.
      
      module.exports = factory(require('components/jquery-ui/datepicker'));;
  }(function (datepicker) {
      datepicker.regional['pt'] = {
          closeText: 'Fechar',
          prevText: 'Anterior',
          nextText: 'Seguinte',
          currentText: 'Hoje',
          monthNames: [
              'Janeiro',
              'Fevereiro',
              'Mar\xE7o',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
          ],
          monthNamesShort: [
              'Jan',
              'Fev',
              'Mar',
              'Abr',
              'Mai',
              'Jun',
              'Jul',
              'Ago',
              'Set',
              'Out',
              'Nov',
              'Dez'
          ],
          dayNames: [
              'Domingo',
              'Segunda-feira',
              'Ter\xE7a-feira',
              'Quarta-feira',
              'Quinta-feira',
              'Sexta-feira',
              'S\xE1bado'
          ],
          dayNamesShort: [
              'Dom',
              'Seg',
              'Ter',
              'Qua',
              'Qui',
              'Sex',
              'S\xE1b'
          ],
          dayNamesMin: [
              'Dom',
              'Seg',
              'Ter',
              'Qua',
              'Qui',
              'Sex',
              'S\xE1b'
          ],
          weekHeader: 'Sem',
          dateFormat: 'dd/mm/yy',
          firstDay: 0,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: ''
      };
      datepicker.setDefaults(datepicker.regional['pt']);
      return datepicker.regional['pt'];
  }));

});