const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema({ 
    body: {
        type: String,
        required: true
    }
});
const Comment = mongoose.model("Comment", NoteSchema);
module.exports = Comment;