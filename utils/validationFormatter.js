const joiErrorFormatter = (rawErrors) => {
  const errors = {}
  const details = rawErrors.details
  details.map(d => {
    errors[d.path] = [d.message]
  })
  return errors
}

const mongooseErrorFormatter = () //9:49 day 11

module.exports = joiErrorFormatter
