const { Game } = require("../models/game")

// GET /games
const getGames = async (req, res, next) => {
  console.log(req.userID)
  // since we have a user, look for their games only?

  let games
  try {
    games = await Game.findAll()
  } catch (error) {
    res.status(401).json({
      message: "unable to find games",
      error,
    })
    return
  }

  res.json(games)
}

// GET /games/:id
const getGame = async (req, res, next) => {
  let gameID = req.params.id

  let game
  try {
    game = await Game.findByPk(gameID)
  } catch (e) {
    res.status(404).json({
      message: "unable to find game with that id",
      error: e,
    })
    return
  }

  res.json(game)
}

// POST /games
const createGame = async (req, res, next) => {
  const {
    name,
    publishedDate,
    minPlayers,
    maxPlayers,
    online,
    esrbRating,
    description,
  } = req.body

  let game
  try {
    game = await Game.create({
      name,
      publishedDate,
      minPlayers,
      maxPlayers,
      online,
      esrbRating,
      description,
    })
  } catch (e) {
    res.status(422).json({
      message: "error creating game in database",
      error: e,
    })
    return
  }

  res.status(201).json({
    id: game.id,
    message: "game created successfully",
  })
}

const updateGame = async (req, res, next) => {
  const gameID = req.params.id

  let game
  try {
    game = await Game.findByPk(gameID)
  } catch (e) {
    res.status(404).json({
      message: "unable to find game with that id",
      error: e,
    })
    return
  }

  const {
    name,
    publishedDate,
    minPlayers,
    maxPlayers,
    online,
    esrbRating,
    description,
  } = req.body

  let gameData = {
    name,
    publishedDate,
    minPlayers,
    maxPlayers,
    online,
    esrbRating,
    description,
  }

  try {
    await game.update(gameData)
  } catch (e) {
    console.log(e)
    res.status(422).json({
      message: "unable to update game with that id",
      error: e,
    })
    return
  }

  res.json(game)
}

const deleteGame = async (req, res, next) => {
  const gameID = req.params.id

  let game
  try {
    game = await Game.findByPk(gameID)
  } catch (e) {
    res.status(404).json({
      message: "unable to find game with that id",
      error: e,
    })
    return
  }

  try {
    await game.destroy()
  } catch (e) {
    res.status(422).json({
      message: "unable to delete game with that id",
      error: e,
    })
    return
  }

  res.status(204)
}

module.exports = { getGames, getGame, createGame, updateGame, deleteGame }
