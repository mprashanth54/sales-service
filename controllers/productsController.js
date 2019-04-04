const router = require('express').Router();
const productService = require('../services/productService')

router.get('/', async (req, res) => {
  const products = await productService.getProducts()
  res.json({ products: products })
})

router.post('/:userID/:manufacturerID', async (req, res) => {
  try {
    const { userID, manufacturerID } = req.params
    await productService.insert(userID, parseInt(manufacturerID), req.body)
    res.json({ message: "Inserted products successfully" })
  } catch (err) {
    res.status(422).json({ message: err })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const [product] = await productService.getProductByID(parseInt(id))
  res.json({ product: product })
})

module.exports = router