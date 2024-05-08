/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const { faker } = require("@faker-js/faker");
const server = require("../server");
const books = require("../controllers/books.js");

chai.use(chaiHttp);

const requester = chai.request(server).keepOpen();

suite("Functional Tests", function () {
  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!

  test('#example Test GET /api/books', function(done) {
    requester
      .get('/api/books')
      .end(function(err, res) {
        if (err) done(err);

        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });

  * ----[END of EXAMPLE TEST]----
  */

  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          let title = faker.lorem.words(5);
          requester
            .post("/api/books")
            .send({ title: title })
            .end(function (err, res) {
              if (err) {
                console.error({ error: err });
                done(err);
              }
              assert.equal(res.status, 200);
              assert.equal(res.body.title, title);
              assert.property(
                res.body,
                "_id",
                "Book in array should contain _id",
              );
              assert.property(
                res.body,
                "title",
                "Book in array should contain title",
              );
              assert.isUndefined(
                res.body.comments,
                "Book should not contain comments",
              );
              done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          requester.post("/api/books").end(function (err, res) {
            if (err) {
              console.error({ error: err });
            }
            assert.equal(res.status, 200);
            assert.equal(res.text, "missing required field title");
            done();
          });
        });

        suite("GET /api/books => array of books", function () {
          test("Test GET /api/books", function (done) {
            requester.get("/api/books").end(function (err, res) {
              if (err) done(err);

              assert.equal(res.status, 200);
              assert.isArray(res.body, "response should be an array");
              assert.property(
                res.body[0],
                "commentcount",
                "Books in array should contain commentcount",
              );
              assert.property(
                res.body[0],
                "title",
                "Books in array should contain title",
              );
              assert.property(
                res.body[0],
                "_id",
                "Books in array should contain _id",
              );
              done();
            });
          });
        });

        suite("GET /api/books/[id] => book object with [id]", function () {
          test("Test GET /api/books/[id] with id not in db", function (done) {
            let id = faker.database.mongodbObjectId();
            requester.get(`/api/books/${id}`).end(function (err, res) {
              if (err) done(err);
              assert.equal(res.text, "no book exists");
              done();
            });
          });

          test("Test GET /api/books/[id] with valid id in db", async function () {
            let book = await books.getAllBooks();
            let num = Math.floor(Math.random() * book.length);
            let id = book[num]._id.toString();
            requester
              .get(`/api/books/${id}`)
              .then(function (res) {
                assert.equal(res.status, 200);
                assert.property(
                  res.body,
                  "comments",
                  "Books in array should contain commentcount",
                );
                assert.property(
                  res.body,
                  "title",
                  "Books in array should contain title",
                );
                assert.property(
                  res.body,
                  "_id",
                  "Books in array should contain _id",
                );
              })
              .catch(function (err) {
                console.error({ error: err });
              });
          });
        });

        suite(
          "POST /api/books/[id] => add comment/expect book object with id",
          function () {
            test("Test POST /api/books/[id] with comment", async function () {
              let book = await books.getAllBooks();
              let num = Math.floor(Math.random() * book.length);
              let id = book[num]._id.toString();
              requester
                .post(`/api/books/${id}`)
                .send({ comment: faker.lorem.words(5) })
                .then(function (res) {
                  assert.equal(res.status, 200);
                  assert.property(
                    res.body,
                    "comments",
                    "Books in array should contain commentcount",
                  );
                  assert.property(
                    res.body,
                    "title",
                    "Books in array should contain title",
                  );
                  assert.property(
                    res.body,
                    "_id",
                    "Books in array should contain _id",
                  );
                  assert.notProperty(
                    res.body,
                    "__v",
                    "Books in array should not contain __v",
                  );
                })
                .catch(function (err) {
                  console.error({ error: err });
                });
            });

            test("Test POST /api/books/[id] without comment field", function (done) {
              let id = faker.database.mongodbObjectId();
              requester.post(`/api/books/${id}`).end(function (err, res) {
                if (err) done(err);
                assert.equal(res.text, "missing required field comment");
                done();
              });
            });

            test("Test POST /api/books/[id] with comment, id not in db", function (done) {
              let id = faker.database.mongodbObjectId();
              requester
                .post(`/api/books/${id}`)
                .send({ comment: faker.lorem.words(5) })
                .end(function (err, res) {
                  if (err) done(err);
                  assert.equal(res.text, "no book exists");
                  done();
                });
            });
          },
        );

        suite("DELETE /api/books/[id] => delete book object id", function () {
          test("Test DELETE /api/books/[id] with valid id in db", async function () {
            let book = await books.getAllBooks();
            let num = Math.floor(Math.random() * book.length);
            let id = book[num]._id.toString();
            requester
              .delete(`/api/books/${id}`)
              .then(function (res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "delete successful");
              })
              .catch(function (err) {
                console.error({ error: err });
              });
          });

          test("Test DELETE /api/books/[id] with id not in db", function (done) {
            let id = faker.database.mongodbObjectId();
            requester
              .delete(`/api/books/${id}`)
              .send({ comment: faker.lorem.words(5) })
              .end(function (err, res) {
                if (err) done(err);
                assert.equal(res.text, "no book exists");
                done();
              });
          });
        });
      },
    );
  });
});
