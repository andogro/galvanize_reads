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
            console.log(results);
            return results;
        });
    },
    getSingleBook: function(id) {
      return knex.from('books').innerJoin('authors_books', 'books.id', 'authors_books.book_id')
        .innerJoin('authors', 'authors_books.author_id', 'authors.id').where('books.id', id)
        .then(function(results) {
            console.log(results);
            return results;
        });
    },
    deleteSingleBook: function(id) {
      return Books().where('id', id)
            .del().then(function(results) {
            console.log(results);
            return results;
        });
    },
    addBook: function(title, genre, description, coverurl) {
      return Books().insert({
        title: title,
        genre: genre,
        description: description,
        coverurl: coverurl
         }).returning('id').then(function (response) {
      return knex('authors_books').insert({
        book_id: response[0]
         }).then (function (firstname, lastname, bio, url) {
      return Authors().insert({
         firstname: firstname,
         lastname: lastname,
         bio: bio,
         url: url,
         }).returning('id').then(function (response) {
      return knex('authors_books').insert({
         author_id: response[0],
                })
              })
            })
          })
        },
    };


