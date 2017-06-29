var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  jsonfile = require('jsonfile'),
  gmailSend = require('gmail-send');


jsonfile.spaces = 4


app.set('views', __dirname + '/');
app.set('view engine', 'ejs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/client.js', function (req, res) {
    res.sendfile('client.js');
});

app.get('/results', function (req, res) {
    res.sendfile('results.html');
});

app.get('/app.css', function (req, res) {
    res.sendfile('app.css');
});

app.get('/app.js', function (req, res) {
    res.sendfile('client.js');
});

app.post('/result', function (req, res) {
    jsonfile.readFile('./results.json', function(err, obj) {
        obj.push(req.body);
        jsonfile.writeFile('./results.json', obj, function (err) {
            res.send(200);
        });
        console.log('* [example1] sending test email');
        var send = gmailSend({
            user: 'nisuim.matan.rubin@gmail.com',
            pass: '4Research',
            to:   'nisuim.matan.rubin@gmail.com',
            subject: 'Result for ID: ' + req.body.id,
            text:    'ID: ' + req.body.id + ' Result: ' + req.body.result

        });

// Override any default option and send email
        send();
    });
});

app.get('/getResults', function (req, res) {
    jsonfile.readFile('./results.json', function(err, obj) {
        res.send(obj);
    });
});

app.listen(process.env.PORT || 4000);
