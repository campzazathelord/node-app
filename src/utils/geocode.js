const requests = require("request");
const addressViaCountry = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiY2FtcHphemF0aGVsb3JkIiwiYSI6ImNrcHdnenloZzBsYWQydnMxOGZsN2cwd3IifQ.q6jvIqIuI56pOrKcu0p0xA";
  requests({ url: url, json: true }, (error, { body: { features } } = {}) => {
    if (features.length != 0) {
      const { center, place_name } = features[0];
      const [Long, Lat] = center;
      callback(undefined, {
        Long,
        Lat,
        Location: place_name,
      });
    } else {
      callback("error", undefined);
    }
  });
};
module.exports = {
  addressViaCountry,
};
