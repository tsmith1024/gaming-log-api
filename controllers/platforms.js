const { Platform } = require("../models/platform");

const getPlatforms = async (req, res, next) => {
  let platforms;
  try {
    platforms = await Platform.findAll();
  } catch (e) {
    res.status(401).json({
      message: "unable to find platforms",
      error: e,
    });
    return;
  }
  res.json(platforms);
};

const getPlatform = async (req, res, next) => {
  let platformID = req.params.id;

  let platform;

  try {
    platform = await Platform.findByPk(platformID);
  } catch (e) {
    res.status(404).json({
      message: "unable to find platform with that id",
      error: e,
    });
    return;
  }
  res.json(platform);
};

const createPlatform = async (req, res, next) => {};

const updatePlatform = async (req, res, next) => {};

const deletePlatform = async (req, res, next) => {};

module.exports = {
  getPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
