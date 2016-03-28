var knex = require('../../../db/knex');
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}


module.exports = {
    getBooks: function(){
        return Books().select()
        .then(function(results) {
            return results;
        }) 
    },
    getSingleBook: function(id){
        return knex.raw("SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id WHERE restaurants.id ="+id)
        .then(function(results) {
            return results;
        }) 
    }
};