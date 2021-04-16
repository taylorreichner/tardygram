const { Router } = require('express');
const Gram = require('../models/Gram');
const ensureAuth = require('../middleware/ensureAuth')

module.exports = Router()
.post('/', ensureAuth, (req, res, next) => {
  Gram.insert({
    ...req.body,
    username: req.user.username,
  })
    .then((gram) => res.send(gram))
    .catch(next);
})