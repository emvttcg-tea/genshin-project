const Joi = require('joi')

const productSchema = Joi.object({
  itemname: Joi.string()
    .trim()
    .min(2)
    .max(64)
    .required(),

  description: Joi.string()
    .required(),

  imageURL: Joi.string()
    .required(),

  category: Joi.string()
    .required(),

  price: Joi.number()
    .required()
})

module.exports = { productSchema }
