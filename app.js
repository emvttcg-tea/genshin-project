const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(port, () => {
  console.log(`listenning to ${port}...`)
})

module.exports = app
