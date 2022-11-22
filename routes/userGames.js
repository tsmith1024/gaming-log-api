const express = require("express");

const {
  getUserGames,
  getUserGame,
  createUserGame,
  updateUserGame,
  deleteUserGame,
} = require("../controllers/userGames");

const router = express.Router();

router.route("/").get(getUserGames).post(createUserGame);

router
  .route("/:id")
  .get(getUserGame)
  .put(updateUserGame)
  .delete(deleteUserGame);

module.exports = router;
