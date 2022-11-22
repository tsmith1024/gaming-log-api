const { DataTypes } = require("sequelize");
const { db } = require("./database");

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // lastName: DataTypes.STRING,
    // steamUsername: DataTypes.STRING,
    // xboxUsername: DataTypes.STRING,
  },
  {
    timestamps: true,
  }
);

module.exports = { User };
