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

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();


router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/image').post(function (req, res) {
  var chartType = req.body.type;
  var config = req.body;

  var renderer = new Renderer(req.body.type, req.body);
  renderer.onPageReady(res);

  // console.log('server', renderer.png);
  //
  // res.writeHead(200, {
  //   'Content-Type': 'image/png',
  //   'Content-Length': img.length
  // });
  // res.end(img);
});

app.use('/api', router);
app.use('/image', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
