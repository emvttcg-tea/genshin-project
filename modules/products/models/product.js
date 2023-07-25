const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  itemname: {
    type: String,
    required: [true, 'Item name is required'],
    minlength: [2, 'Item name can\'t be smaller than 2 characters'],
    maxlength: [64, 'Item name can\'t be greater than 64 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Product = mongoose.model('products', productSchema)

module.exports = Product
