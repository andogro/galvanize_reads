var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookstore' });
});



module.exports = router;
