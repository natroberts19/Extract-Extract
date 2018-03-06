// These are the routes to handle scraping from the news website.
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

  // Routes for the Scrape section
  // ==============================

  // GET route to scrape data from Buffalo Bills news site.
  app.get("/api/scrape", function (req, res) {
    // Make a request for the news section of ycombinator
    axios.get("https://www.boredpanda.com/category/travel/").then(function (response) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(response.data);
      // var i = i.slice(0, 4);
      // For each element with a "h2" class
      $("h2").each(function (i, element) {
        // Save an empty result object
        var result = {};
        

        // Add the text and href of every link, and save them as properties of the result object.
        // var newlink = result.link.replace(/^http:\/\//i, 'https://');

        result.title = $(this)
          .children("a")
          .attr("title")
          // .text("title")
          // .text();
        result.link = $(this)
          .children("a")
          .attr("href");

          console.log("scrape result", result.title);
          console.log("scrape result", result.link);

        // Create new Headlines using the `result` object built from scraping.
        // First search the database for duplicate articles. 

        db.Headline.create(result)
          .then(function (dbHeadline) {
            // View the added result in the console
            console.log(dbHeadline);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
            // If we were able to successfully scrape and save headlines, send a message to the client.
          });
      });
      res.send("Scrape Complete");
    });
  })

  // ==================================================

  // GET route to retrieve scraped Headline data from the mongo db.
  app.get("/api/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.Headline.find({}).sort({date: -1})
      .then(function (dbHeadline) {
        res.json(dbHeadline);
      })
      // If there are no errors, send the data to the browser as json
      .catch(function (err) {
        res.json(err);
      });
  });

};