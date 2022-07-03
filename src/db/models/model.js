const Joi = require("joi");
const { connection } = require("../connection");

class Model {
    constructor(data) {
        const { error, value } = this.constructor.getValidationSchema()
            .validate(data, { convert: false, allowUnknown: false, stripUnknown: true });

        this.data = value;

        Object.entries(value)
            .forEach(([key, value]) => {
                this[key] = value;
            });

        if (error) {
            throw new Error(error.details.map(({ message }) => message).join("\n"));
        }
    }

    static all() {
        return connection(this.getTableName());
    }

    static async create(data) {
        const createdArray = await this.all().insert(data).returning("*");
        return createdArray[0];
    }

    async create() {
        const created = await this.constructor.create(this.data);

        if (created.id !== undefined) {
            this.id = created.id;
            this.data.id = created.id;
        }

        return created;
    }
}

module.exports = { Model };
