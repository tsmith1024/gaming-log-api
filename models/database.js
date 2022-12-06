const { Sequelize } = require("sequelize")
const { DB_NAME } = require("../utilities/constants")
const db = new Sequelize(DB_NAME, "postgres", "postgres", {
  host: "db", // host is 'db' because of name of linked service in docker-compose
  dialect: "postgres",
})

module.exports = { db }
