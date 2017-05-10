var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Renderer = require('./renderer.phantomjs');


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

  var renderer = new Renderer(config);

  res.statusCode = 200;
  res.setEncoding('binary');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', renderer.image.length());
  res.write(renderer.image);
  res.close();
});

app.use('/api', router);
app.use('/image', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
