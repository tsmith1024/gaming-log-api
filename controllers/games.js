const { Game } = require("../models/game");

const getGames = async (req, res, next) => {
  let games;
  try {
    games = await Game.findAll();
  } catch (e) {
    res.status(401).json({
      message: "unable to find games",
      error: e,
    });
    return;
  }

  res.json(games);
};

const getGame = async (req, res, next) => {
  let gameID = req.params.id;

  let game;
  try {
    game = await Game.findByPk(gameID);
  } catch (e) {
    res.status(404).json({
      message: "unable to find game with that id",
      error: e,
    });
    return;
  }

  res.json(game);
};

const createGame = async (req, res, next) => {
  const { name, publishedDate, minPlayers, maxPlayers, online, esrbRating } =
    req.body;

  let game;
  try {
    game = await Game.create({
      name,
      publishedDate,
      minPlayers,
      maxPlayers,
      online,
      esrbRating,
    });
  } catch (e) {
    res.status(422).json({
      message: "error creating game in database",
      error: e,
    });
    return;
  }

  res.status(201).json({
    id: game.id,
    message: "game created successfully",
  });
};

const updateGame = async (req, res, next) => {
  const gameID = req.params.id;

  let game;
  try {
    game = await Game.findByPk(gameID);
  } catch (e) {
    res.status(404).json({
      message: "unable to find game with that id",
      error: e,
    });
    return;
  }

  const {
    name,
    publishedDate,
    minPlayers,
    maxPlayers,
    online,
    esrbRating,
    description,
  } = req.body;

  let gameData = {
    name,
    publishedDate,
    minPlayers,
    maxPlayers,
    online,
    esrbRating,
    description,
  };

  try {
    await game.update(gameData);
  } catch (e) {
    console.log(e);
    res.status(422).json({
      message: "unable to update game with that id",
      error: e,
    });
    return;
  }

  res.json(game);
};

const deleteGame = async (req, res, next) => {
  const gameID = req.params.id;

  let game;
  try {
    game = await Game.findByPk(gameID);
  } catch (e) {
    res.status(404).json({
      message: "unable to find game with that id",
      error: e,
    });
    return;
  }

  try {
    await game.destroy();
  } catch (e) {
    res.status(422).json({
      message: "unable to delete game with that id",
      error: e,
    });
    return;
  }

  res.status(204);
};

module.exports = { getGames, getGame, createGame, updateGame, deleteGame };