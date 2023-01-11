"use strict"

const { UUIDV4, DataTypes } = require("sequelize")

const { faker } = require("@faker-js/faker")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let seedData = []
    for (let i = 0; i < 200; i++) {
      seedData.push({
        id: faker.datatype.uuid(),
        name: faker.music.songName(),
        description: faker.lorem.paragraph(),
        minPlayers: faker.datatype.number({
          min: 1,
          max: 2,
        }),
        esrbRating: faker.helpers.arrayElement([
          "e",
          "e10",
          "t",
          "m",
          "ao",
          "rp",
          "unrated",
        ]),
        online: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert("Games", seedData)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Games", null, {})
  },
}
