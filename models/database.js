const { Sequelize } = require("sequelize");
const dbName = process.env.DB_NAME;
const db = new Sequelize(dbName, "postgres", "postgres", {
  host: "db", // host is 'db' because of name of linked service in docker-compose
  dialect: "postgres",
});

module.exports = { db };
