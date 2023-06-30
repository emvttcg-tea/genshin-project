require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const exsession = require('express-session')
const logger = require('morgan')
const bodyParser = require('body-parser')
require('./utils/db.config')
const passport = require('passport')
require('./utils/authStrategies/localStrategy')
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const flasherMiddleware = require('./middleware/flasherMiddleware')

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

app.use(express.static('public'))
app.use(logger('dev'))
app.use(passport.session())
app.use(passport.initialize())
app.use('/', authRoutes)
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

// home page render
app.get('/', flasherMiddleware, (req, res) => {
  console.log(req.user)

  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(`welcome ${req.user.username}`)
})

app.use((req, res) => {
  return res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`listenning to ${config.port}...`)
})

module.exports = app
