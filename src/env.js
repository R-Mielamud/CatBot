const path = require("path");
const dotenv = require("dotenv");

const dotenvFilePath = path.join(__dirname, "..", ".env");
dotenv.config({ path: dotenvFilePath });

module.exports = {
    BOT: {
        TOKEN: process.env.BOT_TOKEN,
        SIGNING_SECRET: process.env.BOT_SIGNING_SECRET,
        APP_TOKEN: process.env.APP_TOKEN,
        SOCKET_MODE: true,
    },
    CATS: {
        IMAGE_TYPES: "gif",
        CRON_TIME: "0 0 6-20/2 * * *",
        DEFAULT_SEND_CHANNEL_ID: process.env.DEFAULT_SEND_CHANNEL_ID,
    },
    SERVER: {
        PORT: Number(process.env.PORT ?? 3000),
        TZ: "UTC",
    },
};
