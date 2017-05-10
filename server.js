var express = require('express');
var path = require('path');

var app = express();

app.use(express.bodyParser());

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.listen(1337, function(){
  console.log('Express server listening on port 1337');
});
