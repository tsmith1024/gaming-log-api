"use strict"

const { DataTypes } = require("sequelize")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // do the changes
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "lastname", {
      type: DataTypes.STRING,
      allowNull: true,
    })
  },

  // undo the changes
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "lastname")
  },
}
