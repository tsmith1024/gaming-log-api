const { DataTypes } = require("sequelize")
const { db } = require("./database")

const UserGame = db.define("UserGames", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 5,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "toPlay",
    validate: {
      isIn: [["completed", "inProgress", "onHold", "stopped", "toPlay"]],
    },
  },
  GameId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
})

module.exports = {
  UserGame,
}
