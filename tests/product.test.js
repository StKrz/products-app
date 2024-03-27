const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const helper = require('../helpers/product.helper')

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(
      () => { console.log("Connection to MOngoDB established")},
      err => { console.log("Failed to connect to MongoDB", err)}
    )
});

afterEach(async ()=>{
  await mongoose.connection.close();
})

describe("Request GET /api/products", () => {
  it("Returns all products", async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0)
  }, 2000)
})

describe('Request GET /api/products/:product', () =>{
  it('Returns a product', async ()=>{
    
    const result = await helper.findLastInsertedProduct();
    // console.log(result);
    
    const res = await request(app).get('/api/products/' + result.product);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.product).toBe(result.product);
    // expect(res.body.data.email).toBe(result.email);
  }, 10000)
})

describe('Request POST /api/products', () => {
  it('Creates a product', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "testProduct",
      cost: "10000",
      description:"Test description",
      quantity: "10000"
    })
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeTruthy();
  }, 10000);
})

describe("DELETE /api/products/:product", () => {
  it("Delete last inserted product", async () =>{
    const result = await helper.findLastInsertedProduct();
    const res = await request(app)
      .delete('/api/products/' + result.product);
    
    expect(res.statusCode).toBe(200)
  },10000)
})