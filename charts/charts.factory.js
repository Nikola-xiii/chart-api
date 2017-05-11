(function(window) {
  'use strict';

  var ChartFactory = function(type, options) { this.init(type, options); };

  ChartFactory.prototype.init = function (type, options) {
    console.log(type);
    switch (type) {
      case 'funnel':
        var Chart = new window.FunnelChart(options);
        console.log("ChartFactory");
        break;
      default:
        "Undefined type";
    }
  };

  window.ChartFactory = ChartFactory;

}(window));
