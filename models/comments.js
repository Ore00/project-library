const DB = require("../db.js");

let db = new DB();
const commentSchema = new db.mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});
// const Comment = db.mongoose.model("Comment", commentSchema);

exports.commentSchema = commentSchema;
// exports.Comment = Comment;
