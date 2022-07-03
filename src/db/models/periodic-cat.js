const Joi = require("joi");
const { isValidCron } = require("cron-validator");
const { Model } = require("./model");
const { DB_TABLES } = require("../../constants/db");

class PeriodicCat extends Model {
    static getTableName() {
        return DB_TABLES.PERIODIC_CATS;
    }

    static getValidationSchema() {
        return Joi.object({
            channel: Joi
                .string()
                .regex(/^C\d+$/)
                .required()
                .messages({
                    "string.base": "Channel id must be a string",
                    "string.pattern.base": "Must be a valid Slack channel id",
                    "string.empty": "Channel id is required",
                    "any.required": "Channel id is required",
                }),
            cronTime: Joi.string()
                .custom((value, builder) => {
                    if (isValidCron(value)) {
                        builder.error("Cron time must be valid");
                    }
                })
                .required()
                .messages({
                    "string.empty": "Channel id is required",
                    "any.required": "Channel id is required",
                }),
        });
    }
}

module.exports = { PeriodicCat };
