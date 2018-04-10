
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Q = require('q');

var user = require('./routes/user');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
  res.send('Express is excellent!');
});

app.get('/api/maxwell', function (req, res) {
  res.send('Express is excellent!xxxxxx');
});

app.use('/user', user);

app.listen(3003, function () {
  console.log('Example app is running on port 3003!');}
);
