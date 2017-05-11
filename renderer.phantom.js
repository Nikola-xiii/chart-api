var phantom = require('phantom');
var base64 = require('base-64');
var resolve = require('path').resolve;
var fs = require('fs');

var pageUrl = resolve('./charts/funnel-chart/funnel.html');

var Renderer = function(type, options) { this.init(type, options); };

Renderer.prototype.init = function(type, options) {
  this.type = type;
  this.options = options;

  this.data = this.onPageReady();
};

Renderer.prototype.loadPage = function() {
  this.page.open(pageUrl, this.onPageReady.bind(this));
};

Renderer.prototype.onRenderImage = function(page) {
  var data = page.renderBase64('png'),
    decoded = '',
    j = data.length;


  for (var i = 0; i < j; i++) {
    decoded = decoded + String.fromCharCode(data[i]);
  }

  page.close();

  return decoded;
};

Renderer.prototype.onPageReady = function() {
  var _self = this;
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(pageUrl).then(function(status) {
        //page.injectJs('./charts/charts.factory.js');
        page.evaluate(function(_self) {
          var Chart = new window.FunnelChart(_self.options);
          Chart.render();
          return document.getElementById('funnel-chart-widget').innerHTML;
        }, _self).then(function(html){
        });

        page.renderBase64('PNG').then(function(content) {
           Renderer.prototype.data = content;
        });

      });
    });
  });
  console.log('Renderer this', this.data);
};

module.exports = Renderer;
