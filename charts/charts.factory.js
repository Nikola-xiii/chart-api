(function(window) {
  'use strict';
  var FunnelChartWidget = require('./funnel-chart/FunnelChartWidget').make({
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

}(window));
