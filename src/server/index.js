// set up modules
const express = require("express");
const app = express();

// app configuration
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(express.urlencoded({extended: true}));

// routes
require("./routes")(app);

// listen
const port = require("./config")["port"];
app.listen(port);
console.log(`Listening to port ${port}`);