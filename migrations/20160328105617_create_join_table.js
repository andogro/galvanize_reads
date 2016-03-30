
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors_books', function(table){
    table.integer('book_id').unsigned().references('id').inTable('books');
    table.integer('author_id').unsigned().references('id').inTable('authors');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors_books');
};
