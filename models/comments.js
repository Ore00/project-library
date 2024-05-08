const DB = require("../db.js");

let db = new DB();
const commentSchema = new db.mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

exports.commentSchema = commentSchema;
