const express = require("express")

const { createUser, updateUser } = require("../controllers/users")
const { verifyToken, verifyRole } = require("../middleware/auth")

const router = express.Router()

// create user
router.route("/").post(createUser)

// router.route("/:id").put(verifyToken, verifyRole("admin"), updateUser)
router.route("/:id").put(verifyToken, verifyRole("admin"), updateUser)

module.exports = router
