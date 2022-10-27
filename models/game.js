const { DataTypes } = require("sequelize");
const { db } = require("./database");

const Game = db.define(
  "Game",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedDate: DataTypes.DATEONLY,
    minPlayers: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    esrbRating: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["e", "e10", "t", "m", "ao", "rp", "unrated"]],
      },
      defaultValue: "rp",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Game };
