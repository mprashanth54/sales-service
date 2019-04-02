const router = require('express').Router();
const productService = require('../services/productService')

router.get('/', async (req, res) => {
  const products = await productService.getProducts()
  res.json({ products: products })
})

router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body, undefined, 4));
  // console.log(req.body)
  res.json({ message: "In products post" })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await productService.getProductByID(parseInt(id))
  res.json({ product: product })
})

module.exports = router