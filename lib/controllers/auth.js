const { Router } = require('express')

module.exports = Router().get('/login', (req, res) => {
    res.redirect('https://github.com/login/oauth/authorize')
})

