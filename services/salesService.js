const knex = require('../db')
const billService = require('./billService')

exports.getQueriesProductQty = (products) => {
  return products.map((product) => {
    return knex('products').where({ id: product.id }).decrement({
      qty: product.qty,
    })
  })
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
  try {
    let bill;
    const ids = products.map((product) => { return product.id })
    const productData = await knex.select('*').from('products').whereIn('id', ids)
    await Promise.all(this.getQueriesProductQty(products))
    const totalPrice = this.calculatePrice(products, productData)
    bill = await billService.createBill(userID, totalPrice, true)
    return bill
  } catch (err) {
    console.log(err)
    throw `Unable to create the bill`
  }
}