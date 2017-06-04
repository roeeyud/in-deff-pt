var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  jsonfile = require('jsonfile');

app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/app.js', function (req, res) {
    res.sendfile('app.js');
});
