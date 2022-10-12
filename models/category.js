const { DataTypes } = require("sequelize");
const { db } = require("./database");

const Category = db.define(
  "Category",
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
      unique: true,
      validate: {
        isIn: [
          "action",
          "adventure",
          "casual",
          "co-op",
          "farming",
          "fighting",
          "flight",
          "idle",
          "puzzle",
          "racing",
          "rpg",
          "shooter",
          "simulator",
          "sports",
          "strategy",
          "survival",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Category };
