const adminMiddleware = (req, res, next) => {
  if (req.user.admin) {
    return next()
  }

  res.redirect('/no-access')

}

module.exports = adminMiddleware
