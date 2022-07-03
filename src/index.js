const ENV = require("./constants/env");
const { bot } = require("./slack");
const { startOrReplaceJob } = require("./periodic-cats");
const { PeriodicCat } = require("./db/models/periodic-cat");

const main = () => {
    const cats = await PeriodicCat.all().select("*");
    cats.forEach(startOrReplaceJob);

    await bot.start(ENV.SERVER.PORT);
}

main();
