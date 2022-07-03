const axios = require("axios");
const ENV = require("../constants/env");

exports.getCatUrl = async () => {
    const { data: catArray } = await axios.get(`https://api.thecatapi.com/v1/images/search?mime_types=${ENV.CATS.IMAGE_TYPES}`);

    if (!catArray?.length) {
        return;
    }

    return catArray[0].url;
};

exports.getCatStream = async () => {
    const url = await exports.getCatUrl();

    if (!url) {
        return;
    }

    const { data: stream } = await axios.get(url, { responseType: "stream" });
    return stream;
};
