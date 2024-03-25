const express = require("express")
const router = express.Router()

router.use('/auth', require('./Router/AuthRouter'))
router.use('/blog', require('./Router/BlogRouter'))

module.exports = router