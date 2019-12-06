const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios");
const myArticles = require("./models/articles");
const comments = require("./models/comments");
const PORT = process.env.PORT || 3001;
const cheerio = require("cheerio");
const mongojs = require("mongojs");
// Initialize Express
const app = express();
//Cors middleware
const cors = require("cors");
app.use(cors());
//Mongoose settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
// Routes
// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Route for scraping the nytimes website
app.get("/scrape", (req, res) => {   
  //need to implement: limit to 10-20
  axios.get("https://www.nytimes.com/")
  .then(response => {  
    const $ = cheerio.load(response.data);      
    $("article").each((i, element) => {  
      let results = [];
      let headline = $(element).find("h2").attr("class", "es182me0").text();     
      let URL = $(element).find("a").attr("href")  
      let summary = $(element).find("p").attr("class", "css-1pfq5u").attr("class", "e1n8kpyg0").text();    
      results.push({
        headline: headline,
        URL: URL,
        summary: summary
      })
      myArticles.create(results)        
        .then(data => console.log(data))
        .catch(err => console.log(err));    
    });
    res.json("Scrape Complete");
   });
});
// Route for getting all articles from the db
app.get("/api/articles", (req, res) => {  
  myArticles.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err))
}); 
//Route for getting all articles of certain date
app.get("/api/articles/:date", (req, res) => {
    let date = req.params.date;
    myArticles.find({
      dateCreated: date
    })
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
// Route for getting all saved articles from the db
app.get("/api/savedArticles", (req, res) => {  
  myArticles.find({ saved: true })
    .then(data => res.json(data))
    .catch(err => res.json(err))
}); 
// Route for grabbing a specific Article by id and populate all comments
app.get("/api/articles/:id", function(req, res) { 
  myArticles.findOne({
        _id: req.params.id}/* , { 
        runValidators: true, context: 'query' 
    } */)
    .populate("comment")
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});
// Route for saving/updating an Article's associated comment
app.post("/api/articles/:id", (req, res) => {
  console.log(req.body);
  // Create a new note and pass the req.body to the entry
  comments.create({body: req.body.comment})
    .then(data => {
      // If a comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new comment
      // { new: true } tells the query that we want it to return the updated articles -- it returns the original by default
      return myArticles.findOneAndUpdate({ _id: req.params.id }, { comment: data._id }, { new: true });
    })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});
//Route for updating article
app.put("/api/articles/:isSaved/:id", (req, res) => {   
  myArticles.update({    
    _id: mongojs.ObjectId(req.params.id)},{
      $set:{
        saved: req.params.isSaved
      }
    })
    .then(data => res.json(data))
    .catch(err => res.json(err))    
})
//delete comments
app.delete("/api/comment/:id", (req, res) => {
  comments.deleteOne({
    _id: mongojs.ObjectID(req.params.id)
  })
  .then(data => res.json(data))
  .catch(err => res.json(err))
})
// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});