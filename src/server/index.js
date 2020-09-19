// set up modules
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// app configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({"extended":"true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// routes
require("./routes")(app);

// listen
const port = require("./config")["port"];
app.listen(port);
console.log(`Listening to port ${port}`);