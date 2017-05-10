(function() {
  'use strict';

  var webpage = require('webpage').create();
  var base64 = require('base-64');

  Renderer = function(options) { this.init(options); };

  Renderer.prototype.init = function(options) {
    this.page = webpage.create();
  };

  Renderer.prototype.loadPage = function() {
    this.page.open('about:blank', this.onPageReady.bind(this));
  };

  Renderer.prototype.onRenderImage = function() {
    var data    = base64.decode(this.page.renderBase64('png')),
      decoded = '',
      j = data.length;

    for (var i = 0; i < j; i++) {
      decoded = decoded + String.fromCharCode(data[i]);
    }

    this.page.close();

    return decoded;
  };

  Renderer.prototype.onPageReady = function() {
    this.page.injectJs('./chart/charts.factory.js');

    this.page.evaluate(function () {
      var Chart = new ChartFactory();
    });

    this.image = this.onRenderImage();
  };

  module.exports = Renderer;

})();
