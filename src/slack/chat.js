const ENV = require("../constants/env");
const { constructCatMessage } = require("../api/messages");
const { bot } = require(".");

exports.sendSomethingWrong = async (bot, channelId) => {
    await bot.client.chat.postMessage({
        channel: channelId,
        text: ENV.MESSAGES.SOMETHING_WRONG,
    });
};

exports.sendCat = async (channelId, type) => {
    const message = await constructCatMessage(channelId, type);

    if (!message) {
        return;
    }

    const result = await bot.client.files.upload(message);

    if (!result.ok) {
        await exports.sendSomethingWrong(sendSomethingWrong);
    }
};
