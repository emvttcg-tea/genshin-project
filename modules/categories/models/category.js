const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  category_name: {
    type: String,
    required: [true, 'Category name is required']
  },
  value: {
    type: String,
    required: [true, 'Value is required']
  }
})

const Category = mongoose.model('categories', categorySchema)

module.exports = Category
