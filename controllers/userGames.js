const { DataTypes } = require("sequelize")
const { UserGame } = require("../models/userGame")

// GET /userGames
const getUserGames = async (req, res, next) => {
  let userGames
  try {
    userGames = await UserGame.findAll()
  } catch (error) {
    res.status(401).json({
      message: "unable to find userGames",
      error,
    })
    return
  }

  res.json(userGames)
}

// GET /userGames/:id
const getUserGame = async (req, res, next) => {
  let userGameID = req.params.id

  let userGame
  try {
    userGame = await UserGame.findByPk(userGameID)
  } catch (error) {
    res.status(404).json({
      message: "unable to find userGame with that id",
      error,
    })
  }

  res.json(userGame)
}

// POST /userGames
const createUserGame = async (req, res, next) => {
  const { gameId: GameId, rating, progress, status } = req.body

  const UserId = req.user.id

  const userGameData = {
    UserId,
    GameId,
    rating,
    progress,
    status,
  }

  let userGame
  try {
    userGame = await UserGame.create(userGameData)
  } catch (error) {
    console.log(error)
    res.status(422).json({
      message: "error creating userGame in database",
      error: error,
    })
    return
  }

  console.log(userGame.GameId)

  res.status(201).json({
    id: userGame.id,
    message: "userGame created successfully",
  })
}

// PUT /userGames/:id
const updateUserGame = async (req, res, next) => {
  const userGameID = req.params.id

  const { gameId, rating, progress } = req.body

  const UserId = req.user.id
  // if UserId is null/undefined, error
  if (UserId === undefined) {
    res.status(401).json({
      message: "not authorized to update userGame",
    })
    return
  }

  let userGame
  try {
    userGame = await UserGame.findByPk(userGameID)
  } catch (error) {
    res.status(404).json({
      message: "unable to find userGame with that id",
      error,
    })
    return
  }

  // if userIDs don't match, error
  // also check to see user is admin, and override
  if (userGame.UserId !== UserId && req.user.role !== "admin") {
    res.status(401).json({
      message: "not authorized to update userGame",
    })
    return
  }

  userGame.gameId = gameId
  userGame.rating = rating
  userGame.progress = progress

  try {
    await userGame.save()
  } catch (error) {
    res.status(422).json({
      message: "error updating userGame in database",
      error: error,
    })
    return
  }

  res.status(200).json({
    id: userGame.id,
    message: "userGame updated successfully",
  })
}

// DELETE /userGames/:id
const deleteUserGame = async (req, res, next) => {
  const userGameID = req.params.id

  let userGame

  // get userId from req.user
  // if userId is undefined, return 401
  const userId = req.user.id
  if (userId === undefined) {
    res.status(401).json({
      message: "user not logged in",
    })
    return
  }

  try {
    userGame = await UserGame.findByPk(userGameID)
  } catch (error) {
    res.status(404).json({
      message: "unable to find userGame with that id",
      error,
    })
    return
  }

  // if userGame is undefined, return 404
  if (userGame === undefined) {
    res.status(404).json({
      message: "unable to find userGame with that id",
    })
    return
  }

  // if userGame.userId !== userId and user.role is not admin, return 401
  if (userGame.userId !== userId && req.user.role !== "admin") {
    res.status(401).json({
      message: "user not authorized to delete this userGame",
    })
    return
  }

  try {
    await userGame.destroy()
  } catch (error) {
    res.status(422).json({
      message: "error deleting userGame in database",
      error: error,
    })
    return
  }

  res.status(200).json({
    id: userGame.id,
    message: "userGame deleted successfully",
  })
}

module.exports = {
  getUserGames,
  getUserGame,
  createUserGame,
  updateUserGame,
  deleteUserGame,
}
