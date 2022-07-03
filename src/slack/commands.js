const ENV = require("../constants/env");
const { bot } = require(".");
const { sendCat } = require("./chat");
const { respondNotInChannel } = require("./helpers");
const { startOrReplaceJob } = require("../periodic-cats");
const { PeriodicCat } = require("../db/models/periodic-cat");

bot.command("/send_a_cat", async ({ command: { text, channel_id }, ack, say }) => {
    await ack({ response_type: "in_channel" });

    switch (text) {
        case "help": {
            return say(ENV.MESSAGES.SENDACAT_HELP);
        }
        case "": {
            const isInChannel = await respondNotInChannel(channel_id, say);

            if (!isInChannel) {
                return;
            }

            return sendCat(channel_id, "asked");
        }
        default: {
            return say(ENV.MESSAGES.DIDNT_UNDERSTAND);
        }
    }
});

bot.command("/periodic_cats", async ({ command: { text, channel_id }, ack, say }) => {
    await ack({ response_type: "in_channel" });

    if (text === "help") {
        return say(ENV.MESSAGES.SEND_PERIODIC_CATS_HELP);
    }

    const isInChannel = await respondNotInChannel(channel_id, say);

    if (!isInChannel) {
        return;
    }

    if (text === "cancel") {
        await PeriodicCat.all()
            .where({ channel: channel_id })
            .delete();

        return;
    }

    const periodicCatData = { channel: channel_id, cronTime: text.trim() };

    const alreadyExists = await PeriodicCat.all()
        .where({ channel: channel_id })
        .exists();

    let periodicCat = null;

    if (alreadyExists) {
        periodicCat = await PeriodicCat.where({ channel: channel_id })
            .update(new PeriodicCat().data);
    } else {
        periodicCat = await (new PeriodicCat(periodicCatData).create());
    }

    if (periodicCat) {
        startOrReplaceJob(periodicCat);
    }
});
