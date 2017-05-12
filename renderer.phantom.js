var phantom = require('phantom');
var resolve = require('path').resolve;
var fs = require('fs');

var pageUrl = resolve('./charts/funnel-chart/funnel.html');

var Renderer = function(type, options) { this.init(type, options); };

Renderer.prototype.init = function(type, options) {
  this.type = type;
  this.options = options;
};

Renderer.prototype.onPageReady = function(res) {
  var _self = this;
  var _ph, _page, _img, _data;

  phantom.create().then(function(ph) {
    _ph = ph;
    return _ph.createPage();
  }).then(function (page) {
      _page = page;
    return _page.open(pageUrl);
  }).then(function(status) {
      console.log(status);
      _page.property('viewportSize', {width: 600, height: 200});
      _page.evaluate(function (_self) {
        var Chart = new window.FunnelChart(_self.options);
        Chart.render();
      }, _self);
      return _page.renderBase64('PNG');
  }).then(function(content){
    _data = content;
    _img = new Buffer(_data, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': _img.length
    });
    res.end(_img);
    _page.close();
    _ph.exit();
  }).catch(function(e) { console.log(e)});
};


module.exports = Renderer;
