require('./db')
const app = require('express')()
const bodyParser = require('body-parser')
const productsController = require('./controllers/productsController')
const logisticsController = require('./controllers/logisticsController')
const authController = require('./controllers/authController')
const salesController = require('./controllers/salesController')

// app.use(cors())
app.use(bodyParser.json())

const validate = (req, res, next) => {
  console.log("I'm in validate")
  // next()
}

app.get('/', (req, res) => {
  res.json({ massage: 'Hello World' })
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  console.log(`User id is ${id}`);
  res.json({ message: 'User id is defined' })
})

app.use('/products/', productsController)
app.use('/logistics/', logisticsController)
app.use('/auth/', authController)
app.use('/sales/', salesController)


app.get('/dashboard', (req, res) => {
  console.log(`Dashboard`)
  res.json({ message: "In dashboard" })
})





module.exports = app