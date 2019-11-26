const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = 3000;
//Mongoose settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Routes
// A GET route for scraping the nytimes website
app.get("/scrape", function(req, res) { 
  axios.get("http://www.nytimes.com/").then(function(response) {  
      //article class css-8atqhb
      //a href has link
      //headlines h2 with class es182me0
      //summary is p with class css-1pfq5u e1n8kpyg0
    const $ = cheerio.load(response.data);    
    $("article").each((i, element) => {     
        let result = {};        
        result.title = $(this)
            .children("h2")
            .text();
        result.link = $(this)
            .children("a")
            .attr("href");      
        result.summary = $(this)
        .children("p")
        .attr("href");  
      db.Article.create(result)
        .then(function(dbArticle) {        
          console.log(dbArticle);
        })
        .catch(function(err) {          
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});
// Route for getting all Articles from the db
app.get("/articles", function(req, res) {  
  db.Article.find({})
    .then(function(dbArticle) {      
      res.json(dbArticle);
    })
    .catch(function(err) {     
      res.json(err);
    });
});
// Route for grabbing a specific Article by id and populate all comments
app.get("/articles/:id", function(req, res) { 
  db.Article.findOne({
        _id: req.params.id}, { 
        runValidators: true, context: 'query' 
    })
    // ..and populate all of the comments associated with it
    .populate("comment")
    .then(dbArticle => {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
// Route for saving/updating an Article's associated comment
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(dbNote => {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});