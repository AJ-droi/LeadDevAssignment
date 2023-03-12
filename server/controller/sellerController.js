const { client } = require('../config/db')
const { Generatesignature } = require('../utils/auth')

const sellerLogin = async (req, res) => {
  try {
    const { sellerId, zipCode } = req.body
    const db = client.db('Olist')

    const user = await db
      .collection('olist_sellers_dataset')
      .findOne({ seller_zip_code_prefix: +zipCode, seller_id: sellerId })

    if (!user) {
      return res.status(400).json({ errorMessage: 'Invalid Credentials' })
    }
    const signature = await Generatesignature({ id: sellerId })
    return res.status(200).json({ user, signature, message: 'user login successful' })
  } catch (err) {
    return res.status(500).json({ errorMessage: 'Internal Server Error' })
  }
}

const orderItems = async (req, res) => {
  try {
    const userId = req.user.id

    const orders = []

    const offset = +req.query?.offset
    console.log(offset)
    const defaultLimit = 20

    let limit = +req.query?.limit

    if (limit > 100 || limit < 20) {
      limit = defaultLimit
    }

    const db = client.db('Olist')

    const user = await db
      .collection('olist_order_items_dataset')
      .findOne({ seller_id: userId })

    if (user) {
      await db
        .collection('olist_order_items_dataset')
        .aggregate([
          { $match: { seller_id: userId } },
          {
            $lookup: {
              from: 'olist_products_dataset',
              localField: 'product_id',
              foreignField: 'product_id',
              as: 'order_products'
            }
          },
          {
            $project: {
              product_id: 1,
              order_id: 1,
              price: 1,
              'order_products.product_category_name': 1,
              shipping_limit_date: 1
            }
          },
          {
            $sort: { price: 1, order_item_id: 1 }
          }
        ])
        .skip(offset > 0 ? (offset - 1) * limit : 0)
        .limit(limit)
        .forEach((order) => {
          const { order_id, shipping_limit_date, order_products } = order
          order.id = order_id
          delete order.order_id
          order.date = shipping_limit_date
          delete order.shipping_limit_date
          order.product_category = order_products[0].product_category_name
          delete order.order_products
          orders.push(order)
        })
      const totalDb = await db
        .collection('olist_order_items_dataset')
        .countDocuments()

      return res.status(200).json({
        data: orders,
        total: totalDb,
        limit,
        offset
      })
    }

    return res.status(400).json({ errorMessage: 'User not found' })
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch the documents', err })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id
    console.log(userId)
    const db = client.db('Olist')
    const user = await db
      .collection('olist_order_items_dataset')
      .findOne({ seller_id: userId })
    if (user) {
      const deletedUser = await db
        .collection('olist_order_items_dataset')
        .findOne({ order_id: req.params.id })

      const isDeleted = await db
        .collection('olist_order_items_dataset')
        .deleteOne({ order_id: req.params.id })

      if (isDeleted) {
        return res
          .status(200)
          .json({ deletedUser, message: 'Order deleted successfully' })
      } else {
        return res.status(400).json({
          message: 'failed Delete Operation'
        })
      }
    }

    return res.status(400).json({ errorMessage: 'User not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete sellers details' })
  }
}

const getSeller = async (req, res) => {
  try {
    const userId = req.user.id
    const db = client.db('Olist')
    const user = await db
      .collection('olist_sellers_dataset').findOne({
        seller_id: userId
      })

    return res.status(200).json({
      user
    })
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateSeller = async (req, res) => {
  try {
    const { state, city } = req.body
    const userId = req.user.id
    console.log(userId)
    const db = client.db('Olist')
    const user = await db
      .collection('olist_sellers_dataset')
      .findOne({ seller_id: userId })
    if (user) {
      const updatedUser = await db
        .collection('olist_sellers_dataset')
        .updateMany(
          { seller_id: userId },
          {
            $set: {
              seller_city: city || user.seller_city,
              seller_state: state || user.seller_state
            }
          }
        )

      if (updatedUser) {
        return res
          .status(200)
          .json({ updatedUser, message: 'Seller information updated successfully' })
      }

      return res
        .status(400)
        .json({ errorMessage: 'user could not be updated' })
    }

    return res.status(400).json({ errorMessage: 'User not found' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  sellerLogin,
  orderItems,
  deleteOrder,
  updateSeller,
  getSeller
}
