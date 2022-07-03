const ENV = require("./constants/env");
const { bot } = require("./slack");
const { startOrReplaceJob } = require("./periodic-cats");
const { PeriodicCat } = require("./db/models/periodic-cat");
const { listen: listenCommands } = require("./slack/commands");

const main = async () => {
    const cats = await PeriodicCat.all().select("*");
    cats.forEach(startOrReplaceJob);

    listenCommands(bot);
    await bot.start(ENV.SERVER.PORT);
}

main();
