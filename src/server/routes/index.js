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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookstore' });
});

router.get('/books', function(req, res, next) {
  queries.getBooks().then(function(results) {
  res.render('books', {array: results});
  console.log(results);
  })
});


module.exports = router;
