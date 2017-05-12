var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Renderer = require('./renderer.phantom');
var resolve = require('path').resolve;
var fs = require('fs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT0 || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();


router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/image').post(function (req, res) {
  var chartType = req.body.type;
  var config = req.body;

  var renderer = new Renderer(chartType, config);
  renderer.onPageReady(res);
});

app.use('/api', router);
app.use('/image', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
