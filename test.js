var page = require('webpage').create(),
  fs = require('fs'),
  //system = require('system'),
  address, output;

address = 'file:///' + fs.absolute('funnel.html');
script = 'file:///' + fs.absolute('funnel-chart/FunnelChartWidget.js');
output = 'funnel.png';

page.viewportSize = { width: 1440, height: 900 };

page.open(address, function (status) {
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
