const ENV = require("../constants/env");
const { bot } = require(".");

exports.respondNotInChannelIfNot = async (channelId, say) => {
    const { channel: { is_member: isMember } } = await bot.client.conversations.info({ channel: channelId });

    if (!isMember) {
        await say(ENV.MESSAGES.NOT_IN_CHANNEL);
    }

    return isMember;
};
