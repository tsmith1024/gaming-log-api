const { DataTypes } = require("sequelize");
const { db } = require("./database");

const Status = db.define(
  "Status",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ["completed", "inProgress", "onHold", "stopped", "toPlay"],
      },
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Status };
