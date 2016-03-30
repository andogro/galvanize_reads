var knex = require('../../../db/knex');
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}


module.exports = {
    getBooks: function(){
        return knex.from('books').innerJoin('authors_books', 'books.id', 'authors_books.book_id')
        .innerJoin('authors', 'authors_books.author_id', 'authors.id')
        .then(function(results) {
            return results;
        });
    },
    getAuthors: function(){
        return knex.from('authors').innerJoin('authors_books', 'authors.id', 'authors_books.author_id')
        .innerJoin('books', 'authors_books.book_id', 'books.id')
        .then(function(results) {
            return results;
        });
    },
    getSingleBook: function(id) {
      return knex.from('books').innerJoin('authors_books', 'books.id', 'authors_books.book_id')
        .innerJoin('authors', 'authors_books.author_id', 'authors.id').where('books.id', id)
        .then(function(results) {
            return results;
        });
    },
      deleteSingleBook: function(id) {
      return Books().where('id', id)
            .del().then(function(results) {
            return results;
        });
    },
    addBook: function(title, genre, description, coverurl, firstname, lastname) {
      return Books().insert({
        title: title,
        genre: genre,
        description: description,
        coverurl: coverurl
         },'id').then(function (bookId) {
          return Authors().insert({
            firstname: firstname,
            lastname: lastname
          }, 'id').then(function (authorId) {
            return [bookId, authorId];
          });
        }).then(function (result) {
          var bookid = parseInt(result[0]);
          var authorid = parseInt(result[1]);
          return knex('authors_books').insert({
           book_id: bookid,
           author_id: authorid
          });
        });
      }
    };
