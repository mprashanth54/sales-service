const knex = require('../db')
const billService = require('./billService')
const productService = require('./productService')

exports.getQueriesProductQty = (products) => {
  return products.map((product) => {
    return knex('products').where({ id: product.id }).decrement({
      qty: product.qty,
    })
  })
}

exports.insertSales = async (billID, products) => {
  const queries = products.map((product) => {
    return knex.insert({
      product: product.id,
      qty: product.qty,
      bill_no: billID
    }).table('sales')
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
  try {
    const ids = products.map((product) => { return product.id })
    const productData = await productService.getProductsFromIds(ids)
    await Promise.all(this.getQueriesProductQty(products))
    const totalPrice = this.calculatePrice(products, productData)
    let [bill] = await billService.createBill(userID, totalPrice, true)
    await this.insertSales(bill.id, products)
    return bill
  } catch (err) {
    console.log(err)
    throw `Unable to create the bill`
  }
}