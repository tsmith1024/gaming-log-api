const express = require("express");

const { signIn } = require("../controllers/auth");

const router = express.Router();

router.route("/signin").post(signIn);

module.exports = router;
