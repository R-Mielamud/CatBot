const ENV = require("../constants/env");
const { bot } = require(".");

exports.respondNotInChannelIfNot = async (channelId, say) => {
    const { channel: { is_member: isMember } } = await bot.client.conversations.info({ channel: channelId });

    if (!isMember) {
        await say(ENV.MESSAGES.NOT_IN_CHANNEL);
    }

    return isMember;
};

exports.handleCommandErrors = (handler) => async (options) => {
    try {
        const result = await handler(options);
        return result;
    } catch (err) {
        await options.say(err.message);
    }
};
