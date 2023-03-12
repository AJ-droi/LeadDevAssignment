const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../config/db')
const { client } = require('../config/db')

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization

    if (!authorization) {
      return res.status(401).json({
        Error: 'Kindly signin'
      })
    }

    const token = authorization.slice(7, authorization.length)
    const verified = jwt.verify(token, APP_SECRET)

    if (!verified) {
      return res.status(401).json({
        Error: 'unauthorised'
      })
    }

    const { id } = verified

    const db = client.db('Olist')

    const user = await db
      .collection('olist_sellers_dataset')
      .findOne({ seller_id: id })

    if (!user) {
      return res.status(401).json({
        Error: 'Invalid Credentials'
      })
    }

    req.user = verified
    next()
  } catch (err) {
    return res.status(500).json({
      Error: 'Internal Server Error'
    })
  }
}

module.exports = { auth }
