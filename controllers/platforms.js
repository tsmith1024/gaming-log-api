const { Platform } = require("../models/platform");

// GET /platforms
const getPlatforms = async (req, res, next) => {
  let platforms;

  try {
    platforms = await Platform.findAll();
  } catch (error) {
    res.status(401).json({
      message: "unable to find platforms",
      error,
    });
    return;
  }

  res.json(platforms);
};

// GET /platforms/:id
const getPlatform = async (req, res, next) => {
  let platformID = req.params.id;

  let platform;
  try {
    platform = await Platform.findByPk(platformID);
  } catch (error) {
    res.status(404).json({
      message: "unable to find game with that id",
      error,
    });
  }

  res.json(platform);
};

// POST /platforms
const createPlatform = async (req, res, next) => {
  const { name } = req.body;

  let platform;

  try {
    platform = await Platform.create({
      name,
    });
  } catch (error) {
    res.status(422).json({
      message: "error creating platform in database",
      error: error,
    });
    return;
  }

  res.status(201).json({
    id: platform.id,
    message: "platform created successfully",
  });
};

// PUT /platforms/:id
const updatePlatform = async (req, res, next) => {
  const platformID = req.params.id;

  let platform;

  try {
    platform = await Platform.findByPk(platformID);
  } catch (error) {}
};

// DELETE /platforms/:id
const deletePlatform = async (req, res, next) => {
  const platformID = req.params.id;

  let platform;

  try {
    platform = await Platform.findByPk(platformID);
  } catch (error) {
    res.status(404).json({
      message: "unable to find platform with that id",
      error,
    });
    return;
  }

  try {
    await platform.destroy();
  } catch (error) {
    res.status(500).json({
      message: "unable to delete platform",
      error,
    });
    return;
  }

  res.status(200).json({
    message: "platform deleted successfully",
  });
};

module.exports = {
  getPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
