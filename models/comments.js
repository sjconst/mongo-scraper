const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({ 
    body: {
        type: String,
        required: true
    }
});
const comments = mongoose.model("comments", commentSchema);
module.exports = comments;