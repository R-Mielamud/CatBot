const { getCatStream } = require("./cat-api");

exports.getCatMessageText = (type) => {
    return {
        "planned": "I have another funny cat GIF! :smile_cat:",
        "asked": "Here you go! :smile_cat:",
    }[type];
}

exports.constructCatMessage = async (channelId, type) => {
    const stream = await getCatStream();

    if (!stream) {
        return;
    }

    return {
        channels: channelId,
        initial_comment: exports.getCatMessageText(type),
        file: stream,
        filename: "cat",
    };
};

exports.sendCat = async (bot, channelId, type) => {
    const message = await exports.constructCatMessage(channelId, type);

    if (!message) {
        return;
    }

    await bot.client.files.upload(message);
};