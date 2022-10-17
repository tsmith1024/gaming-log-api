const { Category } = require("./category");
const { Game } = require("./game");
const { Rating } = require("./rating");
const { User } = require("./user");
const { Platform } = require("./platform");
const {
  GameCategories,
  UserCategories,
  UserGames,
  GamePlatforms,
  GameDevelopers,
} = require("./associations");
const { Status } = require("./status");
const { Developer } = require("./developer");

async function syncModels() {
  await setupAssociations();

  await Category.sync({ alter: true });
  await Developer.sync({ alter: true });
  await Game.sync({ alter: true });
  await Platform.sync({ alter: true });
  await User.sync({ alter: true });

  await UserCategories.sync({ alter: true });
  await GamePlatforms.sync({ alter: true });
  await UserGames.sync({ alter: true });
  await GameCategories.sync({ alter: true });
  await GameDevelopers.sync({ alter: true });
}

async function setupAssociations() {
  Rating.belongsTo(Game);

  Game.belongsToMany(Category, { through: GameCategories });
  Game.belongsToMany(Developer, { through: GameDevelopers });
  Game.belongsToMany(Platform, { through: GamePlatforms });

  User.belongsToMany(Category, { through: UserCategories });
  User.belongsToMany(Game, { through: UserGames });
}

module.exports = {
  Category,
  Developer,
  Game,
  Platform,
  Rating,
  Status,
  syncModels,
  User,
  UserGames,
};
