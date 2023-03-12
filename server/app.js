const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bp = require('body-parser')
const cors = require('cors')
dotenv.config()
const seller = require('./routes/sellerRoute')
const { client } = require('./config/db')

const { urlencoded } = bp

const app = express()

app.use(
  cors({
    methods: ['GET', 'PATCH', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    origin: '*',
    credentials: true
  })
)

app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', seller)

client.connect((err) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err)
    // process.exit(1)
  }

  app.listen(5000, () => {
    console.log('Server listening on port 5000')
  })
})

module.exports = { app }
