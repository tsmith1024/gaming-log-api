const { DataTypes } = require("sequelize");
const { db } = require("./database");

const Rating = db.define(
  "Rating",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5, // could move this to 10?
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Rating };
