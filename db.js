const { Client } = require('pg')

const client = new Client({
  user: 'prashanth',
  host: '127.0.0.1',
  database: 'training',
  password: '',
  port: 5432,
})

client.connect()

module.exports = client