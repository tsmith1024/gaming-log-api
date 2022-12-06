const express = require("express")
const logger = require("../middleware/logger")
const {
  getGames,
  createGame,
  getGame,
  updateGame,
  deleteGame,
} = require("../controllers/games")
const { verifyToken } = require("../middleware/auth")

const router = express.Router()

// router.get("/", getGames);
// router.post("/", createGame);

// "/" handlers shorthand
// localhost:3000/games
router.route("/").get(verifyToken, getGames).post(createGame)

// "/:id" handlers
// localhost:3000/games/:id
router.route("/:id").get(getGame).put(updateGame).delete(deleteGame)

module.exports = router
