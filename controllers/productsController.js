const router = require('express').Router();
const productService = require('../services/productService')

router.get('/', (req, res) => {
  const products = productService.getProducts()
  res.json({ products: products })
})

router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body, undefined, 4));
  // console.log(req.body)
  res.json({ message: "In products post" })
})

router.get('/:id', (req, res) => {
  console.log(`Products ${req.params.id}`)
  res.json({ message: "In products single" })
})

module.exports = router