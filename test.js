var webpage = require('webpage');
var page = webpage.create();
var fs = require('fs');
  //system = require('system'),
  var address, output;

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
      this.page.injectJs('libs/bind-shim.js');
      this.page.injectJs('charts/funnel.js');
      page.evaluate(function () {
        var Chart = new window.FunnelChart({
          "container": '#funnel-chart-widget',
          "title": "Video Viewable Rates Funnel",
          "headers": ["Metric", "Events", "Rate, %", "AI Uplift, %"],
          "colors": ["#A94CBA", "#9A30AD", "#8D2DA7", "#7A289F", "#692397"],
          "series": [
            ["Video Starts", 3521231, 100, 10],
            ["25% Video Viewed", 1533232, 44, 9],
            ["50% Video Viewed", 1232123, 35, 8],
            ["75% Video Viewed", 934313, 27, 12],
            ["Video Completes", 834123, 24, 10]
          ],
          "config": {
            "width": "100%"
          }
        });

        Chart.render();
      });
      page.render(output);
      phantom.exit();
    }, 200);
  }
});
