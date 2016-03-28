
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('firstname');
    table.string('lastname');
    table.text('biography');
    table.string('portraiturl');
  })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors');
};
