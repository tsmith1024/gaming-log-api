const express = require("express")

const {
  signin,
  requestRecovery,
  recoverAccount,
} = require("../controllers/auth")

const router = express.Router()

// signin
router.route("/signin").post(signin)
router.route("/recover").post(requestRecovery)
router.route("/resetPassword").post(recoverAccount)

module.exports = router
