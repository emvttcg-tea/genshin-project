const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.use('/', authRoutes)

// home page render
app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(port, () => {
  console.log(`listenning to ${port}...`)
})

module.exports = app
