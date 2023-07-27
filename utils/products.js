const mongoose = require('mongoose')
const db = mongoose.connection
const productm = require('../modules/products/models/product')

// var products = {}

// productm.find({}).then((result) => {
//   products = result
// })

var products = await productm.find({})


// const getArrayOfData = () => {
//   return productm.find({}).then((storedDataArray) => {
//       return storedDataArray
//   }).catch(function(err){
//       if (err) {
//           throw new Error(err.message)
//       }
//   })
// }

console.log(products)



const addProduct =  (product) => {
  products.push(product)
}

module.exports = {
  products,
  addProduct
}
