const express = require("express");
const { updateGame, deleteGame } = require("../controllers/games");
const {
  getPlatforms,
  createPlatform,
  getPlatform,
} = require("../controllers/platforms");

const router = express.Router();

router.route("/").get(getPlatforms).post(createPlatform);

router.route("/:id").get(getPlatform).put(updateGame).delete(deleteGame);
