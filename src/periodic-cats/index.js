const { CronJob } = require("cron");
const ENV = require("../constants/env");
const { sendCat } = require("../slack/chat");

const cronMap = new Map();

exports.startOrReplaceJob = (periodicCat) => {
    if (cronMap.has(periodicCat.id)) {
        cronMap.get(periodicCat.id).stop();
    }

    const job = new CronJob(
        periodicCat.cronTime,
        () => sendCat(periodicCat.channel, "planned"),
        undefined,
        false,
        ENV.SERVER.TZ,
    );

    job.start();
    cronMap.set(periodicCat.id, job);
};
