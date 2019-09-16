//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log('Server is listening on port 3000 ...');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
  const crypto = req.body.crypto;
  const currency = req.body.currency;
  const amount = req.body.amount;
  const options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    qs: {
      from: crypto,
      to: currency,
      amount
    }
  };
  request(options, function(error, response, body) {
    const data = JSON.parse(body);
    res.write('<p>The current time is ' + data.time + '</p>');
    res.write('<h1>' + amount + ' ' + crypto + ' are currently worth ' + data.price + ' ' + currency + '.</h1>');
    res.send();
  });
});