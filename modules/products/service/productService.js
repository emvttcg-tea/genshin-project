const Product = require('../models/product')

/**
 * Create a new user and returns it
 * @param {Object} userInput - It is user input with all variables for user model
 */

const addProduct = async (productInput) => {
  const product = new Product(productInput)
  await product.save()
  console.log(productInput)
  return product
}

module.exports = { addProduct }
