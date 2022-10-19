const express = require("express");
const {
  getGames,
  createGame,
  getGame,
  updateGame,
  deleteGame,
} = require("../controllers/games");

const router = express.Router();

// "/" handlers
router.route("/").get(getGames).post(createGame);

// "/:id" handlers
router.route("/:id").get(getGame).put(updateGame).delete(deleteGame);

module.exports = router;
