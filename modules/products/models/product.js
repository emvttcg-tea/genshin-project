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
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  imageURL: {
    type: String,
    required: [true, 'ImageURL is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// validates unique name
productSchema.path('itemname').validate(async (itemname) => {
  const itemnameCount = await mongoose.models.products.countDocuments({ itemname })
  return !itemnameCount
}, 'Product with the same name already exists')

const Product = mongoose.model('products', productSchema)

module.exports = Product
