const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const User = require('./models/User')

require('./utils/db.config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// home page render
app.get('/', (req, res) => {
  return res.render('index')
})

// register page render
app.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

// saving user register input
app.post('/register', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  return res.render('register', { message: 'Registration successful' })
})

app.listen(port, () => {
  console.log(`listenning to ${port}...`)
})

module.exports = app
