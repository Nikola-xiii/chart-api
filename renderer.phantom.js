var phantom = require('phantom');
var base64 = require('base-64');
var resolve = require('path').resolve;
var fs = require('fs');

var pageUrl = resolve('./charts/funnel-chart/funnel.html');

var Renderer = function(type, options) { this.init(type, options); };

Renderer.prototype.init = function(type, options) {
  this.type = type;
  this.options = options;

  console.log('init', options.data);

  this.onPageReady();
};

Renderer.prototype.loadPage = function() {
  this.page.open(pageUrl, this.onPageReady.bind(this));
};

Renderer.prototype.onRenderImage = function() {
  var data = base64.decode(this.page.renderBase64('png')),
    decoded = '',
    j = data.length;

  for (var i = 0; i < j; i++) {
    decoded = decoded + String.fromCharCode(data[i]);
  }

  this.page.close();

  return decoded;
};

Renderer.prototype.onPageReady = function() {
  console.log("onPageReady", this);
  var _self = this;
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(pageUrl).then(function(status) {
        page.evaluate(function(_self) {
          var Chart = new window.FunnelChart(_self.options);
          Chart.render();
          console.log(_self.options);

          return document.getElementById('funnel-chart-widget').innerHTML;
        }, _self).then(function(html){
          console.log(html);
        });
      });
    });
  });


  // var image = fs.createWriteStream('sorribas.png');
  // render(pageUrl).pipe(image);
  //
  // this.image = fs.createWriteStream('sorribas.png', {encoding: 'binary'});

};

module.exports = Renderer;
