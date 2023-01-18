const express = require("express")

const { signin, requestRecovery } = require("../controllers/auth")

const router = express.Router()

// signin
router.route("/signin").post(signin)
router.route("/recover").post(requestRecovery)

module.exports = router
