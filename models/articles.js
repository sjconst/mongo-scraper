const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  URL: {
    type: String,
    required: true
  }, 
  summary: {
    type: String,
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});
mySchema.plugin(uniqueValidator);
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
