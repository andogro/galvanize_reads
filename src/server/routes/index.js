var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
var queries = require('../queries/queries.js')
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}

// view index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookstore' });
});

// view all books
router.get('/books', function(req, res, next) {
  queries.getBooks().then(function(results) {
  res.render('books', {array: results});
  });
});

// view add new books page
router.get('/books/new', function(req, res, next) {
  res.render('new');
  });

// view single book
router.get('/books/:id', function(req,res,next) {
  var id = req.params.id;
  queries.getSingleBook(id).then(function(results) {
    res.render('singlebook', {array: results});
  });
});

// delete single book
router.post('/books/:id', function(req,res,next) {
  var id = req.params.id;
  queries.deleteSingleBook(id).then(function() {
    res.redirect('/books');
  });
});


router.post('/books/new', function(req, res, next) {
  var title = req.body.title;
  var genre = req.body.genre;
  var desc = req.body.desc;
  var coverurl = req.body.coverurl;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var bio = req.body.bio;
  var portraiturl = req.body.portraiturl;
  queries.addBook(title, genre, desc, coverurl, firstname, lastname, bio, portraiturl).then(function(results) {
  res.redirect('/books');
  });
});







module.exports = router;
