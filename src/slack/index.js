const { App } = require("@slack/bolt");

const bot = new App({
    token: ENV.BOT.TOKEN,
    signingSecret: ENV.BOT.SIGNING_SECRET,
    appToken: ENV.BOT.APP_TOKEN,
    socketMode: ENV.BOT.SOCKET_MODE,
});

module.exports = { bot };
