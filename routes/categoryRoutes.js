const express = require('express')
const router = express.Router()

// products model
const productm = require('../modules/products/models/product')

// product page
router.get('/categories/:cat', (req, res) => {
  console.log(req.params.cat)

  productm.find().where("category").equals(req.params.cat).then((result) => {
    console.log(result)

    res.render('category/category-page', {title: 'GenshinMaster', products: result})
  })

})

module.exports = router
