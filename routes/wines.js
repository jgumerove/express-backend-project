const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.send(200)
})

router.get('/country/:name', (req, res) => {
    res.json({ name: "United States"})
})

module.exports = router