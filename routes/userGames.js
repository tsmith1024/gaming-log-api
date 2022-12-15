const express = require("express")

const {
  getUserGames,
  getUserGame,
  createUserGame,
  updateUserGame,
  deleteUserGame,
} = require("../controllers/userGames")

const { verifyToken } = require("../middleware/auth")

const router = express.Router()

router.route("/").get(getUserGames).post(verifyToken, createUserGame)

router
  .route("/:id")
  .get(getUserGame)
  .put(verifyToken, updateUserGame)
  .delete(verifyToken, deleteUserGame)

module.exports = router
