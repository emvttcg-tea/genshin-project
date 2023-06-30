const Joi = require('joi')

const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .min(2)
    .max(64)
    .required(),

  password: Joi.string()
    .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
})
  .with('password', 'repeat_password')

module.exports = { registerSchema }
