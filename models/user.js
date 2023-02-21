const { DataTypes } = require("sequelize")
const { db } = require("./database")

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
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [
          "user", // least capable/powerful
          "admin", // most capable/powerful
        ],
      },
    },
    recoveryToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recoveryTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    // steamUsername: DataTypes.STRING,
    // xboxUsername: DataTypes.STRING,
  },
  {
    timestamps: true,
  }
)

module.exports = { User }
