/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const books = require("../controllers/books.js");
const comments = require("../controllers/comments.js");
const { check } = require("express-validator");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        let result = await books.getAllBooks();
        return result ? res.json(result) : res.send("no book exists");
      } catch (err) {
        console.log(err.message);
      }
    })

    .post(async function (req, res) {
      const result = await check("title").notEmpty().run(req);
      if (!result.isEmpty()) {
        res.send("missing required field title");
      } else {
        try {
          let title = req.body.title;
          //response will contain new book object including at least _id and title
          const book = await books.createBook(title);
          res.send(book);
        } catch (err) {
          console.log(err.message);
        }
      }
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      try {
        let bookid = req.params.id;
        //if successful response will be 'delete successful'
        const result = await books.deleteAllBooks();
        res.send(result);
      } catch (err) {
        res.send(err.message);
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      try {
        let bookid = req.params.id;
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        let result = await books.getBook(bookid);
        res.send(result);
      } catch (err) {
        console.log(err.message);
        res.send(err.message);
      }
    })

    .post(async function (req, res) {
      try {
        const result = await check("comment").notEmpty().run(req);
        if (!result.isEmpty()) {
          throw new Error("missing required field comment");
        }
        let book = await comments.createComment(
          req.params.id,
          req.body.comment
        );
        res.send(book);
        //json res format same as .get
      } catch (err) {
        res.send(err.message);
      }
    })

    .delete(async function (req, res) {
      try {
        let bookid = req.params.id;
        //if successful response will be 'delete successful'
        const result = await books.deleteBook(bookid);
        res.send(result);
      } catch (err) {
        res.send(err.message);
      }
    });
};
