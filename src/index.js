const { App } = require("@slack/bolt");
const { CronJob } = require("cron");
const ENV = require("./env");
const { sendCat } = require("./cat-message");

const bot = new App({
    token: ENV.BOT.TOKEN,
    signingSecret: ENV.BOT.SIGNING_SECRET,
    appToken: ENV.BOT.APP_TOKEN,
    socketMode: ENV.BOT.SOCKET_MODE,
});

const cronJob = new CronJob(
    ENV.CATS.CRON_TIME,
    () => sendCat(bot, ENV.CATS.DEFAULT_SEND_CHANNEL_ID, "planned"),
    undefined,
    false,
    ENV.SERVER.TZ,
);

bot.command("/send_a_cat", async ({ command: { text, channel_id }, ack, say, respond }) => {
    await ack({ response_type: "in_channel" });

    switch (text) {
        case "help": {
            return say("Sends a funny cat GIF :smile_cat:");
        }
        case "": {
            return sendCat(bot, channel_id, "asked");
        }
        default: {
            return say("Sorry, didn't understand. Try without any text :smile_cat:");
        }
    }
});

const runCron = async () => cronJob.start();
const runServer = async () => bot.start(ENV.SERVER.PORT);

const main = async () => {
    runCron();
    runServer();
};

main();
