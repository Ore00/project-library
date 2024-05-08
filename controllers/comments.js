const { findBookById } = require("./books.js");

const createComment = async (bookId, commentText) => {
  try {
    let result;
    let comments = {
      text: commentText,
    };
    let book = await findBookById(bookId);

    if (book == null) {
      return "no book exists";
    }
    if (book.comments) {
      book.comments.push(comments);
      result = await book.save();
    }

    const commentsText = result.comments.map((i) => i.text);

    return { _id: result._id, title: result.title, comments: commentsText };
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

exports.createComment = createComment;
