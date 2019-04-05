const authService = require('../../services/authService')

describe('Auth Service', () => {

  it('should return undefined when username and password are admin and admin@123', () => {
    const username = 'admin'
    const password = 'admin@123'

    const result = authService.login(username, password)

    expect(result).toBe(undefined)
  })

  it('should throw an error when password is only wrong', () => {
    try {
      const username = 'admin'
      const password = 'wrong-password'

      authService.login(username, password)

    } catch (err) {
      expect(err).toEqual('Invalid Credentials')
    }
  })

  it('should throw an error when username is wrong', () => {
    try {
      const username = 'wrong-user'
      const password = 'admin@123'

      authService.login(username, password)

    } catch (err) {
      expect(err).toEqual('Invalid Credentials')
    }
  })
})