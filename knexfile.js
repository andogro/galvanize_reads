
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize_bookstore'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};