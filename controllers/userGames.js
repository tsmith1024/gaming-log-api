const { UserGame } = require("../models/models");

// GET /userGames
const getUserGames = async (req, res, next) => {
  let userGames;
  try {
    userGames = await UserGame.findAll();
  } catch (error) {
    res.status(401).json({
      message: "unable to find userGames",
      error,
    });
    return;
  }

  res.json(userGames);
};

// GET /userGames/:id
const getUserGame = async (req, res, next) => {
  let userGameID = req.params.id;

  let userGame;
  try {
    userGame = await UserGame.findByPk(userGameID);
  } catch (error) {
    res.status(404).json({
      message: "unable to find userGame with that id",
      error,
    });
  }

  res.json(userGame);
};

// POST /userGames
const createUserGame = async (req, res, next) => {
  const { userId, gameId, rating, review } = req.body;

  let userGame;

  try {
    userGame = await UserGame.create({
      userId,
      gameId,
      rating,
      review,
    });
  } catch (error) {
    res.status(422).json({
      message: "error creating userGame in database",
      error: error,
    });
    return;
  }

  res.status(201).json({
    id: userGame.id,
    message: "userGame created successfully",
  });
};

// PUT /userGames/:id
const updateUserGame = async (req, res, next) => {
  const userGameID = req.params.id;

  const { userId, gameId, rating, review } = req.body;

  let userGame;

  try {
    userGame = await UserGame.findByPk(userGameID);
  } catch (error) {
    res.status(404).json({
      message: "unable to find userGame with that id",
      error,
    });
    return;
  }

  userGame.userId = userId;
  userGame.gameId = gameId;
  userGame.rating = rating;
  userGame.review = review;

  try {
    await userGame.save();
  } catch (error) {
    res.status(422).json({
      message: "error updating userGame in database",
      error: error,
    });
    return;
  }

  res.status(200).json({
    id: userGame.id,
    message: "userGame updated successfully",
  });
};

// DELETE /userGames/:id
const deleteUserGame = async (req, res, next) => {
  const userGameID = req.params.id;

  let userGame;

  try {
    userGame = await UserGame.findByPk(userGameID);
  } catch (error) {
    res.status(404).json({
      message: "unable to find userGame with that id",
      error,
    });
    return;
  }

  try {
    await userGame.destroy();
  } catch (error) {
    res.status(422).json({
      message: "error deleting userGame in database",
      error: error,
    });
    return;
  }

  res.status(200).json({
    id: userGame.id,
    message: "userGame deleted successfully",
  });
};

module.exports = {
  getUserGames,
  getUserGame,
  createUserGame,
  updateUserGame,
  deleteUserGame,
};
