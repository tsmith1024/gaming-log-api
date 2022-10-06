const { Sequelize } = require("sequelize");
const db = new Sequelize("dockerExpressDemo", "postgres", "postgres", {
  host: "db", // host is 'db' because of name of linked service in docker-compose
  dialect: "postgres",
});

module.exports = { db };
