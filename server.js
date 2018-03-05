// Dependencies.
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
// Request axios and cheerio make the scraping possible.
var axios = require("axios");
var cheerio = require("cheerio");

// Set up the Express server.
var app = express();
// Set up the PORT.
var PORT = process.env.PORT || 8080;

// Require all models.
var db = require("./models");


// Configure the middleware.
// Morgan logger for logging requests.
app.use(logger("dev"));

// Use body parsing for comment submission.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Require and enable Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Static directory.
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
// ** Look at supplemental file for how to connect to remote db.
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadlines", {
  // useMongoClient: true
});

// Routes.
require("./routes/html-routes.js")(app);
require("./routes/api-scrape-routes.js")(app);
require("./routes/api-note-routes.js")(app);


// Listen on port 8080.
app.listen(8080, function() {
  console.log("App running on port 8080!");
});
