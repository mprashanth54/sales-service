const knex = require('../db')

exports.createBill = async (username, totalPrice, status, trx) => {
  return await knex.returning(['id', 'total_price', 'status']).insert(
    {
      username: username,
      total_price: totalPrice,
      status: status
    }
  ).table('bills').transacting(trx)
}