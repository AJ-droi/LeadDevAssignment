const MongoClient = require('mongodb').MongoClient

const url = process.env.MONGO_URI
const APP_SECRET = process.env.APP_SECRET

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true })

module.exports =
({
  client,
  APP_SECRET
})
