const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Pet-Shelter | Main Page'
    })
})


router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
    })
})

module.exports = router