const { DataTypes } = require("sequelize");
const { db } = require("./database");

const Platform = db.define(
  "Platform",
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
      validate: {
        isIn: [
          "pc",
          "xbox-series",
          "xbox-one",
          "ps5",
          "ps4",
          "switch",
          "mobile",
          "vr",
          "other",
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Platform };
