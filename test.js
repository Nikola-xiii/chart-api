var webpage = require('webpage');
var page = webpage.create();
var fs = require('fs');
  //system = require('system'),
  var address, output;

address = 'file:///' + fs.absolute('charts/funnel-chart/funnel.html');
script = 'file:///' + fs.absolute('funnel-chart/FunnelChartWidget.js');
output = 'funnel.png';

page.viewportSize = { width: 500, height: 300 };

page.open(address, function (status) {
  debugger;
  if (status !== 'success') {
    console.log('Unable to load the address: ' + address);
    phantom.exit(1);
  } else {
    window.setTimeout(function () {
      page.render(output);
      phantom.exit();
    }, 200);
  }
});
