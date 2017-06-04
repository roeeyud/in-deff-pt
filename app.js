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
    res.sendfile('index.html');
});

app.get('/app.css', function (req, res) {
    res.sendfile('app.css');
});

app.get('/app.js', function (req, res) {
    res.sendfile('client.js');
});

app.listen(process.env.PORT || 4000);
