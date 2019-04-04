const router = require('express').Router()
const salesService = require('../services/salesService')
const knex = require

router.post('/:userID', async (req, res) => {
  try {
    const { products } = req.body
    const { userID } = req.params
    console.log(products)
    const bill = await salesService.generateBill(userID, products)
    res.json({ bill: bill })
  } catch (err) {
    res.status(422).json({ message: err })
  }

})

module.exports = router