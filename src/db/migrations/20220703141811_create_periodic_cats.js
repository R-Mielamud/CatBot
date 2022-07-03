const { DB_TABLES } = require("../../constants/db");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema
        .createTableIfNotExists(DB_TABLES.PERIODIC_CATS, (table) => {
            table.string("channel", 32).primary();
            table.string("cronTime", 255).notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists(DB_TABLES.PERIODIC_CATS);
};
