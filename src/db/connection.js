const knex = require("knex");
const ENV = require("../constants/env");

const connection = knex({
    client: "pg",
    connection: ENV.DB.CONNECTION_STRING,
});

module.exports = { connection };
