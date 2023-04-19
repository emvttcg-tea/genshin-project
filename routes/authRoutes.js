/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/AUTHvalidation.js')
const joiErrorFormatter = require('../utils/validationFormatter')

// renders registration page
router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

// handles user registration
router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })

    if (validationResult.error) {
      return res.send(joiErrorFormatter(validationResult.error))
      //return res.render('register', { message: 'Validation Errors' })
    }

    const user = await addUser(req.body)
    return res.render('register', { message: 'Registration success' })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', { message: 'Something went wrong' })
  }
})

module.exports = router
