const ENV = require("../constants/env");
const { bot } = require(".");
const { sendCat } = require("./chat");
const { respondNotInChannelIfNot, handleCommandErrors } = require("./helpers");
const { startOrReplaceJob, removeJobIfExists } = require("../periodic-cats");
const { PeriodicCat } = require("../db/models/periodic-cat");

exports.listen = () => {
    bot.command(
        "/send_a_cat",
        handleCommandErrors(
            async ({ command: { text, channel_id }, ack, say }) => {
                await ack({ response_type: "in_channel" });

                switch (text) {
                    case "help": {
                        return say(ENV.MESSAGES.SENDACAT_HELP);
                    }
                    case "": {
                        const isInChannel = await respondNotInChannelIfNot(channel_id, say);

                        if (!isInChannel) {
                            return;
                        }

                        return sendCat(channel_id, "asked");
                    }
                    default: {
                        return say(ENV.MESSAGES.DIDNT_UNDERSTAND);
                    }
                }
            },
        ),
    );

    bot.command(
        "/periodic_cats",
        handleCommandErrors(
            async ({ command: { text, channel_id }, ack, say }) => {
                await ack({ response_type: "in_channel" });

                if (text === "help") {
                    return say(ENV.MESSAGES.SEND_PERIODIC_CATS_HELP);
                }

                const isInChannel = await respondNotInChannelIfNot(channel_id, say);

                if (!isInChannel) {
                    return;
                }

                if (text === "cancel") {
                    await PeriodicCat.all()
                        .where({ channel: channel_id })
                        .delete();

                    removeJobIfExists(channel_id);
                    await say(ENV.MESSAGES.CAT_TIME_REMOVED);
                    return;
                }

                const periodicCatData = { channel: channel_id, cronTime: text.trim() };

                const alreadyExists = (await PeriodicCat.all()
                    .where({ channel: channel_id })
                    .select("*")).length > 0;

                let periodicCat = null;

                if (alreadyExists) {
                    periodicCat = await PeriodicCat.all()
                        .where({ channel: channel_id })
                        .update(new PeriodicCat(periodicCatData).data)
                        .returning("*")
                        .then(rows => rows[0]);
                } else {
                    periodicCat = await (new PeriodicCat(periodicCatData).create());
                }

                if (periodicCat) {
                    startOrReplaceJob(periodicCat);
                    await say(ENV.MESSAGES.CAT_TIME_SET);
                }
            },
        ),
    );
};
