const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../config/db')

const Generatesignature = async (payload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
}

const verifySignature = async (signature) => {
  return jwt.verify(signature, APP_SECRET)
}

module.exports = {
  Generatesignature,
  verifySignature
}
