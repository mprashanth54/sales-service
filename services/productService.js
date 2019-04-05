const knex = require('../db')

exports.getProducts = async () => {
  return await knex.select('*').from('products')
}

exports.getProductByID = async (id) => {
  return await knex.select('*').from('products').where({ id: id });
}

exports.getProductsFromIds = async (ids) => {
  return await knex.select('*').from('products').whereIn('id', ids)
}

exports.insert = async (userID, manufacturerID, product) => {
  try {
    const productData = JSON.parse(JSON.stringify(product))
    productData.created_at = new Date()
    productData.created_by = userID
    productData.manufacturer_id = manufacturerID
    await knex.insert(productData).table('products')
  } catch (err) {
    console.log(err)
    throw 'Unable to insert product'
  }
}