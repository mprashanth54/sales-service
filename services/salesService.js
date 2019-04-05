const knex = require('../db')
const billService = require('./billService')

exports.getQueriesProductQty = (products, trx) => {
  return products.map((product) => {
    return knex('products').where({ id: product.id }).decrement({
      qty: product.qty,
    }).transacting(trx)
  })
}

exports.insertSales = async (billID, products, trx) => {
  const queries = products.map((product) => {
    return knex.insert({
      product: product.id,
      qty: product.qty,
      bill_no: billID
    }).table('sales').transacting(trx)
  })
  return await Promise.all(queries)
}

exports.calculatePrice = (products, productData) => {
  let cost = 0;
  products.map((product) => {
    const foundProduct = productData.find((data) => {
      if (data.id === product.id) return data
    })

    cost += foundProduct.price * product.qty
  })
  return cost
}


exports.generateBill = async (userID, products) => {
  const trx = knex.transaction()
  try {
    const ids = products.map((product) => { return product.id })
    const productData = await knex.select('*').from('products').whereIn('id', ids)
    await Promise.all(this.getQueriesProductQty(products, trx))
    const totalPrice = this.calculatePrice(products, productData)
    let [bill] = await billService.createBill(userID, totalPrice, true, trx)
    await this.insertSales(bill.id, products, trx)
    trx.commit()
    return bill
  } catch (err) {
    trx.rollback()
    console.log(err)
    throw `Unable to create the bill`
  }
}