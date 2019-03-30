const router = require('express').Router();

router.get('/logistics', (req, res) => {
  console.log(`Logistics `)
  res.json({ message: "In logistics" })
})

router.get('/logistics/:id', (req, res) => {
  console.log(`Logistics ${id} `)
  res.json({ message: "In logistics single" })
})

router.get('/logistics/:id/products', (req, res) => {
  console.log(`Logistics Products ${id} `)
  res.json({ message: "In logistics Products" })
})

module.exports = router
