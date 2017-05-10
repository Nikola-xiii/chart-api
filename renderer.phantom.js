(function() {
  'use strict';

  var webpage = require('webpage').create();
  var base64 = require('base-64');

  Renderer = function(options) { this.init(options); };

  Renderer.prototype.init = function(options) {
    this.page = webpage.create();
  };

  Renderer.prototype.onPageReady = function() {
    this.page.injectJs('./chart/charts.factory.js');


  };

})();
