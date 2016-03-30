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
  var authorArray = [{book_id: results[0].book_id, name: results[0].firstname + " " + results[0].lastname }];
  var bookArray = [{book_id: results[0].book_id, coverurl: results[0].coverurl, title: results[0].title, genre: results[0].genre, description: results[0].description}];
  for (i = 1; i < results.length; i++ ) { 
    if (results[i].book_id === results[i-1].book_id) {
      authorArray.push({book_id: results[i].book_id, name: results[i].firstname + " " + results[i].lastname});
    }
    else {
      bookArray.push({book_id: results[i].book_id, coverurl: results[i].coverurl, title: results[i].title, genre: results[i].genre, description: results[i].description, name: results[i].firstname + " " + results[i].lastname});
    }
   }
  res.render('books', {array: bookArray, authorarray: authorArray});
  });
});


// view authors page
router.get('/authors', function(req, res, next) {
  queries.getAuthors().then(function(results) {
  res.render('authors', {array: results});
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


// view single book to delete
router.get('/books/delete/:id', function(req,res,next) {
  var id = req.params.id;
  queries.getSingleBook(id).then(function(results) {
    res.render('singlebook', {array: results});
  });
});

// delete single book
router.post('/books/delete/:id', function(req,res,next) {
  var id = req.params.id;
  queries.deleteSingleBook(id).then(function() {
    res.redirect('/books');
  });
});

// add a single book
router.post('/books/new', function(req, res, next) {
  var title = req.body.title;
  var genre = req.body.genre;
  var description = req.body.description;
  var coverurl = req.body.coverurl;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  queries.addBook(title, genre, description, coverurl, firstname, lastname).then(function(results) {
  res.redirect('/books');
  });
});







module.exports = router;
