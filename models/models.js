const { Category } = require("./category")
const { Game } = require("./game")
const { User } = require("./user")
const { Platform } = require("./platform")
const { UserGame } = require("./userGame")
const { Developer } = require("./developer")

const {
  GameCategories,
  UserCategories,
  GamePlatforms,
  GameDevelopers,
} = require("./associations")

async function syncModels() {
  await setupAssociations()

  await Category.sync({ alter: true })
  await Developer.sync({ alter: true })
  await Game.sync({ alter: true })
  await Platform.sync({ alter: true })
  await User.sync({ alter: true })

  await UserCategories.sync({ alter: true })
  await GamePlatforms.sync({ alter: true })
  await UserGame.sync({ alter: true })
  await GameCategories.sync({ alter: true })
  await GameDevelopers.sync({ alter: true })
}

async function setupAssociations() {
  Game.belongsToMany(Category, { through: GameCategories })
  Game.belongsToMany(Developer, { through: GameDevelopers })
  Game.belongsToMany(Platform, { through: GamePlatforms })

  User.belongsToMany(Category, { through: UserCategories })
  User.belongsToMany(Game, { through: UserGame })
}

module.exports = {
  syncModels,
  Category,
  Developer,
  Game,
  Platform,
  User,
  UserGame,
}
