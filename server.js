var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.CONNECTION_STRING || 8000, function() {
    console.log("yo yo yo, on 8000!!")
  })