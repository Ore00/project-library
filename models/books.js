const DB = require("../db.js");

const { commentSchema } = require("./comments.js");

let db = new DB();
const bookSchema = new db.mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  comments: {
    type: [commentSchema],
    default: () => ([])
  }
});


const Book = db.mongoose.model('book', bookSchema);

exports.Book = Book;
exports.bookSchema = bookSchema;
