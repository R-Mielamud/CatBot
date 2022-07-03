const ENV = require("../constants/env");
const { getCatStream } = require(".");

exports.getCatMessageText = (type) => {
    return {
        "planned": ENV.MESSAGES.PLANNED_IMAGE,
        "asked": ENV.MESSAGES.ASKED_IMAGE,
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
