/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
const express = require('express')
const exsession = require('express-session')
const port = 3000
const bodyParser = require('body-parser')
require('./utils/db.config')
const passport = require('passport')
require('./utils/authStrategies/localStrategy')
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// sessions
app.use(exsession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.session())
app.use(passport.initialize())
app.use('/', authRoutes)

// home page render
app.get('/', (req, res) => {
  
  req.session.views = (req.session.views || 0) + 1

  console.log(req.user)

  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(`welcome ${req.user.name}`)
})

app.listen(port, () => {
  console.log(`listenning to ${port}...`)
})

module.exports = app
