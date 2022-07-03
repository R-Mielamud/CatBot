const knex = require("knex");
const ENV = require("../constants/env");
const config = require("../../knexfile");

const connection = knex(config[ENV.ENV_NAME]);

module.exports = { connection };
