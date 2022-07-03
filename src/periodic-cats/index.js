const { CronJob } = require("cron");
const ENV = require("../constants/env");
const { sendCat } = require("../slack/chat");

const cronMap = new Map();

exports.removeJobIfExists = (channel) => {
    if (cronMap.has(channel)) {
        cronMap.get(channel).stop();
        cronMap.delete(channel);
    }
};

exports.startOrReplaceJob = (periodicCat) => {
    exports.removeJobIfExists(periodicCat.channel);

    const job = new CronJob(
        periodicCat.cronTime,
        () => sendCat(periodicCat.channel, "planned"),
        undefined,
        false,
        ENV.SERVER.TZ,
    );

    job.start();
    cronMap.set(periodicCat.channel, job);
};
