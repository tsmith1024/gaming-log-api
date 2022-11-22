// const { DataTypes } = require("sequelize");
const { db } = require("./database");

const GameCategories = db.define("GameCategories");
const GameDevelopers = db.define("GameDevelopers");
const GamePlatforms = db.define("GamePlatforms");
const UserCategories = db.define("UserCategories");

module.exports = {
  GameCategories,
  GameDevelopers,
  GamePlatforms,
  UserCategories,
};
