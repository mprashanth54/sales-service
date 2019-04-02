const client = require('../db')

exports.getProducts = async () => {
  const result = await client.query('select * from products')
  return result.rows
}

exports.getProductByID = async (id) => {
  const result = await client.query(`select * from products where id = ${id}`)
  return result.rows[0]
}