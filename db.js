const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'prashanth',
    host: '127.0.0.1',
    database: 'training',
    password: '',
  }
});

module.exports = knex