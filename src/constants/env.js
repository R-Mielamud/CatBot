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
    },
    DB: {
        CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    },
    SERVER: {
        PORT: Number(process.env.PORT ?? 3000),
        TZ: "UTC",
    },
    MESSAGES: {
        PLANNED_IMAGE: "I have another funny cat image! :smile_cat:",
        ASKED_IMAGE: "Here you go! :smile_cat:",
        SOMETHING_WRONG: "Oops! Something went wrong... :crying_cat_face:",
        SENDACAT_HELP: "Sends a funny cat image :smile_cat:",
        DIDNT_UNDERSTAND: "Sorry, didn't understand. Try without any text :smile_cat:",
        SEND_PERIODIC_CATS_HELP: `1. Pass a cron time (seconds minutes hours DaysOfMonth Months DaysOfWeek Years) to send cats to this channel periodically or change the cat time
2. Pass 'cancel' (without quotes) to remove periodic cats from this channel.`,
        NOT_IN_CHANNEL: "I'm not in this channel... :crying_cat_face: Add me, please",
        CAT_TIME_SET: "Periodic cats are now in this channel!",
    },
};
