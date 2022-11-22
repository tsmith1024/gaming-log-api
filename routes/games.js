const express = require("express");
const {
  getGames,
  createGame,
  getGame,
  updateGame,
  deleteGame,
} = require("../controllers/games");

const router = express.Router();

// router.get("/", getGames);
// router.post("/", createGame);

// "/" handlers shorthand
// localhost:3000/games
router.route("/").get(getGames).post(createGame);

// "/:id" handlers
// localhost:3000/games/:id
router.route("/:id").get(getGame).put(updateGame).delete(deleteGame);

module.exports = router;
