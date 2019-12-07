const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
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
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  saved: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
// articleSchema.plugin(uniqueValidator);
const articles = mongoose.model("article", articleSchema);
module.exports = articles;
