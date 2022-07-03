const path = require("path");
const ENV = require("./src/constants/env");

const migrationDir = path.join(__dirname, "src", "db", "migrations");

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: ENV.DB.HOST,
            port: ENV.DB.PORT,
            user: ENV.DB.USER,
            password: ENV.DB.PASSWORD,
            database: ENV.DB.NAME,
        },
        migrations: {
            directory: migrationDir,
        },
    },
    production: {
        client: "pg",
        connection: {
            host: ENV.DB.HOST,
            port: ENV.DB.PORT,
            user: ENV.DB.USER,
            password: ENV.DB.PASSWORD,
            database: ENV.DB.NAME,
        },
        migrations: {
            directory: migrationDir,
        },
    },
};
