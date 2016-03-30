// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});


    deleteSingleBook: function(id) {
      return Books().where('id', id)
            .del().then(function(results) {
            console.log(results);
            return results;
        });
    },