const express = require("express")

const { createUser, updateUser, uploadURL } = require("../controllers/users")
const { verifyToken, verifyRole } = require("../middleware/auth")

const router = express.Router()

// create user
router.route("/").post(createUser)

// router.route("/:id").put(verifyToken, verifyRole("admin"), updateUser)
router.route("/:id").put(verifyToken, updateUser)

// BASE_URL/users/12345-4567/upload
router.route("/:id/upload").get(verifyToken, uploadURL)

module.exports = router
