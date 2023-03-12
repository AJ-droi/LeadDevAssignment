const request = require('supertest')
const { app } = require('./app')

let authToken

describe('/POST Login Sellers', () => {
  test('should respond with 200 status and return user, signature and message', async () => {
    const response = await request(app)
      .post('/login')
      .send({ sellerId: 'df560393f3a51e74553ab94004ba5c87', zipCode: 87900 })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('signature')
    expect(response.body).toHaveProperty('message')

    authToken = response.body.signature
    console.log(authToken)
  })

  test('should respond with 400 status and return an error message for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ sellerId: 'df560393f3a51e74553ab94004ba5c87', zipCode: 87000 })
    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('errorMessage')
  })
})

describe('/DELETE order_items', () => {
  test('should respond with 200 status and return deleted order and message for successful delete operation', async () => {
    const response = await request(app)
      .delete('/order_items/00042b26cf59d7ce69dfabb4e55b4fd9')
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('deletedUser')
    expect(response.body).toHaveProperty('message')
  })

  test('should respond with 400 status and return an error message for failed delete operation', async () => {
    const response = await request(app)
      .delete('/order_items/00042b26cf59d7ce69dfabb4e55b4fd9')
      .set('Authorization', `Bearer ${null}`)
    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('Error')
  })
})

describe('/GET Single Sellers', () => {
  test('should respond with 200 status and return user details', async () => {
    const response = await request(app)
      .get('/seller')
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('user')
  })

  test('should respond with 500 status and return an error message for internal server error', async () => {
    const response = await request(app)
      .get('/seller')
      .set('Authorization', `Bearer ${null}`)
    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('Error')
    console.log(authToken)
  })
})

describe('/GET Order_items', () => {
  test('should respond with 200 status and return an array of orders, total count, limit and offset', async () => {
    const response = await request(app)
      .get('/order_items?limit=20&offset=1')
      .set('Authorization', `Bearer ${authToken}`)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body.data)).toBe(true)
    expect(response.body).toHaveProperty('total')
    expect(response.body).toHaveProperty('limit')
    expect(response.body).toHaveProperty('offset')
  })
})

describe('/UPDATE Seller City/State', () => {
  test('should update seller information successfully', async () => {
    const updateData = {
      state: 'New YorK',
      city: 'New York City'
    }

    const res = await request(app)
      .put('/account')
      .send(updateData)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
    expect(res.body.updatedUser.acknowledged).toBe(true)
    expect(res.body.message).toEqual('Seller information updated successfully')
  })
})

module.exports = {
  testEnvironment: 'node'
}
