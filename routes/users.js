const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.send(200)
})

router.get('/wines', (req, res) => {
    res.json({ wine: "pinot" })
})

module.exports = router