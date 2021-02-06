const path = require('path');

const express = require('express');
const app = express();

// app configuration
app.use(express.static(path.resolve(__dirname, '../../build')));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(express.urlencoded({extended: true}));

// API endpoints
require('./routes')(app);

// root
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
});

// listen
const port = 8080;
app.listen(port);
console.log(`Listening to port ${port}`);
