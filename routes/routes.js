const express = require("express");
const axios = require("axios");
const myArticles = require("../models/articles");
const comments = require("../models/comments");
const cheerio = require("cheerio");
const mongojs = require("mongojs");
const path = require("path");
// Initialize Express
const app = express();
// Routes
// Route for scraping the nytimes website
app.get("/scrape", (req, res) => {   
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
        .catch(err => console.log("An error occured, most likely duplicate article being scraped"));    
    });
    res.json("Scrape Complete");
    });
});
// Route for getting all articles from the db
/* app.get("/api/articles", (req, res) => {  
myArticles.find({})
    .then(data => res.json(data))
    .catch(err => res.json(err))
});  */  
app.get("/api/articles", async (req, res) => {
try {
    const result = await myArticles.find({});
    res.json(result);
}
catch(err){
    next(err)
}
});  
//Route for getting all articles of certain date
app.get("/api/articles/:date", (req, res) => {
    let date = req.params.date;
    console.log(date);
    myArticles.find({
    dateCreated: {
        "$gt": new Date(new Date("2019-12-07").setHours(23, 59, 59))
    }})
    .then(data => {
    console.log(data);
    res.json(data)})
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
    .then(data=> res.json(data))
    .catch(err => res.json(err));
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
});
//delete comments
app.delete("/api/comment/:id", (req, res) => {
comments.deleteOne({
    _id: mongojs.ObjectID(req.params.id)
})
.then(data => res.json(data))
.catch(err => res.json(err))
});
// Home route
app.get("/*", (req, res) => {
res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
module.exports = app;