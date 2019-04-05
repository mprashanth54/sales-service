const salesService = require('../../services/salesService')

describe('Sales Service', () => {

  describe("#calculatePrice", () => {
    it('should give me total price for the products selected', () => {
      const products = [
        {
          id: 1,
          qty: 10
        },
        {
          id: 2,
          qty: 5
        }
      ]
      const productData = [
        {
          id: 1,
          price: 100
        },
        {
          id: 2,
          price: 200
        }
      ]

      const totalPrice = salesService.calculatePrice(products, productData)

      expect(totalPrice).toEqual(2000)
    })
  })

})