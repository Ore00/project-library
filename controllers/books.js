const { Book } = require("../models/books.js");

const createBook = async (data) => {
  let result;
  await Book.create({ title: data })
    .then((book) => {
      result = book._doc;
    })
    .catch((err) => {
      return { error: err.message };
    });
  delete result.comments;
  delete result.__v;
  return result;
};

const deleteBook = async (id) => {
  let result;
  await Book.deleteOne({ _id: id })
    .then((book) => {
      result = book.deletedCount == 1 ? "delete successful" : "no book exists";
    })
    .catch((err) => {
      return { error: err.message };
    });
  return result;
};

const deleteAllBooks = async () => {
  let result;
  await Book.deleteMany()
    .then((book) => {
      result =
        book.deletedCount > 0 ? "complete delete successful" : "no book exists";
    })
    .catch((err) => {
      return { error: err.message };
    });
  return result;
};

const getBook = async (id) => {
  let result;
  await Book.findById(id)
    .then((book) => {
      if (book == null) {
        result = "no book exists";
      } else {
        result = book._doc;
        delete result.__v;
      }
    })
    .catch((err) => {
      console.log(err);
      return { error: err.message };
    });
  if (typeof result == "object") {
    const commentsText = result.comments.map((i) => i.text);
    result.comments = commentsText;
  }
  return result;
};

const findBookById = async (id) => {
  let book = await Book.findById(id)
    .then((book) => book)
    .catch((err) => {
      error: err.message;
    });
  return book;
};
const getAllBooks = async () => {
  try {
    const books = await Book.aggregate([
      {
        $project: {
          title: 1,
          commentcount: {
            $cond: {
              if: { $isArray: "$comments" },
              then: { $size: "$comments" },
              else: "0",
            },
          },
        },
      },
    ]).exec();
    return books;
  } catch (err) {
    console.log({ error: err.message });
  }
};

exports.createBook = createBook;
exports.deleteBook = deleteBook;
exports.deleteAllBooks = deleteAllBooks;
exports.findBookById = findBookById;
exports.getAllBooks = getAllBooks;
exports.getBook = getBook;
