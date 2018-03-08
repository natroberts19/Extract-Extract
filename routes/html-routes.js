// This route handles the HTML page that the user is sent to.

var path = require("path");
var db = require("../models");

module.exports = function(app) {

// Simple index route to the test file.
// app.get("/", function(req, res) {
//   console.log("/ html route");
//   res.sendFile(path.join(__dirname, "../public/index-test.html"));
// });

// GET route to get to the index.handlebars page.
app.get("/", function(req, res) {
  console.log("handlebars route");

  db.Headline.find({})
  .then(function (dbHeadline) {
    db.Note.find({})
    .then(function (dbNote) {
      var hbsObject = {
        articles: dbHeadline,
        note: dbNote
      }
      res.render("index", {articles: dbHeadline});
    })
  })
  
});

}