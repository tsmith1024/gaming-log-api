"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // do the change
  async up(queryInterface, Sequelize) {
    // update column name
    await queryInterface.renameColumn("Users", "lastname", "lastName")
  },

  // undo the change
  async down(queryInterface, Sequelize) {
    // revert to the old name
    await queryInterface.renameColumn("Users", "lastName", "lastname")
  },
}
