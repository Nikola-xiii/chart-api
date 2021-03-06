(function($, window) {
  'use strict';

  var FunnelChart = function(params) { this.init(params); };

  $.extend(FunnelChart.prototype, {
    init: function(params) {
    this.isButtonSpace = false;
    this.tableRowHeight = 27;
    this.chartRowHeight = 24;

    this.params = params;
    this.title = params.title;
    this.config = params.config || {};
    this.headers = params.headers;
    this.colors = ["#c6d3de", "#a1b7c7", "#7894ab", "#59748c", "#354d62"];
    this.aiColor = params.aiColor || '#62D2A2';
    this.series = params.series || [];

    this.wrapper = this._getWrapper(params.container, this.config.id);
    this.container = this._getContainer();
  },

    render: function(data) {
      this.data = data;
      this.wrapper.append(this.container);
    },

    _getWrapper: function(wrapper, id) {
      var wrapperEl;

      if (!wrapper) {
        wrapperEl = $('div');
        console.warn('Container not defined.');
      } else if (typeof wrapper === 'string') {
        wrapperEl = $(wrapper);
      } else if (wrapper.nodeName) {
        wrapperEl = wrapper;
      }

      //wrapperEl.classList.add('wrapper-funnel-bar');

      if (this.config.id) {
        wrapperEl.setAttribute('id', this.config.id);
      }

      this.width = wrapperEl[0].offsetWidth - 10;

      return wrapperEl;
    },



    _getContainer: function() {
      var container = $('div');
      container.attr('class', 'funnel-bar');
      container.append(this._getChartContainer());
      //container.append(this._getTableContainer());
      return container;
    },

    // _getTableContainer: function() {
    //   var container = $('div');
    //   container.attr('class', 'funnel-bar-table-container');
    //   container.append(this._getTable());
    //   return container;
    // },

    _getChartTitle: function() {
      var title = $('div');
      title.attr('class', 'funnel-bar-title');
      title.append(this.title);
      return title;
    },

    _calculatePoints: function(i) {
      return [{
        x: this.width * (100 - this.series[i][2]) / 100 / 2, y: i * this.tableRowHeight
      },{
        x: this.width - this.width * (100 - this.series[i][2]) / 100 / 2, y: i * this.tableRowHeight
      },{
        x: this.width - this.width * (100 - (this.series[i + 1] || this.series[i])[2]) / 100 / 2, y: i * this.tableRowHeight + this.chartRowHeight
      },{
        x: this.width * (100 - (this.series[i + 1] || this.series[i])[2]) / 100 / 2, y: i * this.tableRowHeight + this.chartRowHeight
      }];
    },

    _calculateUpliftPoints: function(i) {
      return [{
        x: this.width - this.width * (100 - this.series[i][2]) / 100 / 2 - this.width * (this.series[i][2] / 100) * (this.series[i][3] / 100), y: i * this.tableRowHeight
      },{
        x: this.width - this.width * (100 - this.series[i][2]) / 100 / 2, y: i * this.tableRowHeight
      },{
        x: this.width - this.width * (100 - (this.series[i + 1] || this.series[i])[2]) / 100 / 2, y: i * this.tableRowHeight + this.chartRowHeight
      },{
        x: this.width - this.width * (100 - (this.series[i + 1] || this.series[i])[2]) / 100 / 2 - this.width * ((this.series[i + 1] || this.series[i])[2] / 100) * ((this.series[i + 1] || this.series[i])[3] / 100), y: i * this.tableRowHeight + this.chartRowHeight
      }];
    },

    _getChartContainer: function() {
      var line = d3.line().x(function(d){return d.x}).y(function(d){return d.y});
      var container = $('div');
      container.attr('class', 'funnel-bar-chart-container');
      container.append(this._getChartTitle());

      var c = d3.select(container[0])
        .append("svg")
        .attr("width", '100%')
        .attr("height", 150);

      var _self = this;
      _self.centerSVG = this.width / 2;
      _self.stringNumber =

      this.series.forEach(function(dataItem, i) {
        c.append('path')
          .attr("d", line(_self._calculatePoints(i)) + 'Z')
          .style("fill", _self.colors[i]);

        c.append('path')
          .attr("d", line(_self._calculateUpliftPoints(i)) + 'Z')
          .style("fill", _self.aiColor);

        if(i === 0) {
          c.append("text").attr("x", _self.centerSVG).attr("y", 17)
            .attr("text-anchor", "middle")
            .text(_self._nFormatter(dataItem[1]) + " ["+ dataItem[2]+"%]")
            .style("font-size", "13px")
            .style("fill", "#FFF");
        }
      });

      return container;
    },

    _nFormatter: function(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'B';
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
      }

      return num;
    },

    // _getTable: function() {
    //   var table = $('table');
    //   table.attr('class', 'funnel-bar-table');
    //   table.append(this._getTableHeader());
    //   var _self = this;
    //   this.series.forEach(function(dataItem, i) {
    //     table.append(_self._getTableRow(dataItem, _self.colors[i]))
    //   });
    //   return table;
    // },
    //
    // _getTableRow: function(dataRow, color) {
    //   var tableRow = $('tr');
    //   tableRow.attr('class', 'funnel-bar-table-row');
    //   var _self = this;
    //
    //   dataRow.forEach(function(dataItem, i) {
    //     var cell = $('td');
    //     if (i === 0) {
    //       cell.append(_self._getColorBadge(color));
    //     }
    //     cell.append(dataItem.toLocaleString());
    //     tableRow.append(cell)
    //   });
    //
    //   return tableRow;
    // },
    //
    // _getTableHeader: function() {
    //   var header = $('thead');
    //   header.attr('class', 'funnel-bar-table-header');
    //   var headerTr = $('tr');
    //
    //   this.headers.forEach(function(field) {
    //     var cell = $('th');
    //     cell.attr('class', 'funnel-bar-table-header-cell');
    //     cell.append(field);
    //     headerTr.append(cell);
    //   });
    //   header.append(headerTr);
    //   return header;
    // },

    _getColorBadge: function(color) {
      var colorBadge = $('div');
      colorBadge.attr('class', 'color-badge');
      colorBadge.attr('style', 'background-color:' + color +';');
      return colorBadge;
    }
  });

  window.FunnelChart = FunnelChart;

})(jQuery, window);
