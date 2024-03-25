const express = require("express")
const router = express.Router()
const {Signupdata} = require("../Controllers/AuthController")
// router.get("/", (req, res) => {
// res.status(200).send("okie!!")
// })

router.route("/signup").get(Signupdata)
module.exports = router