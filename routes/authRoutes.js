/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/AUTHvalidation.js')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')

// renders registration page
router.get('/register', (req, res) => {
  return res.render('register', { message: {}, formData: {}, errors: {} })
})

// handles user registration
router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    // if (validationResult.error) {
    //   return res.render('register', {
    //     message: {
    //       type: 'error',
    //       body: 'Validation Errors'
    //     },
    //     errors: joiErrorFormatter(validationResult.error),
    //     formData: req.body
    //   })
    // }
    const user = await addUser(req.body)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registration success'
      },
      errors: {},
      formData: req.body
    })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Validation Errors'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    })
  }
})

//login page here
router.get('/login', (req, res) => {
  return res.render('login', { message: {}, formData: {}, errors: {} })
})

//logs in an user
router.post('/login', passport.authenticate('local', { successRedirect: '/login-success', failureRedirect: '/login-failed' }), (req, res) => {
  return res.render('login', {
    message: {
      type: 'success',
      body: 'Login success!'
    },
    formData: {},
    errors: {}
  })
})

module.exports = router
