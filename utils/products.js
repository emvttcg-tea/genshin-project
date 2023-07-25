const mongoose = require('mongoose')
const db = mongoose.connection
const productm = require('../modules/products/models/product')

//var products = []

productm.find({}).then((result) => {
  const products = result
})

console.log(products)



const addProduct =  (product) => {
  products.push(product)
}

module.exports = {
  products,
  addProduct
}
