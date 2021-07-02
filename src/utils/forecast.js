const requests = require("request");
const forecast = (Long, Lat, location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e0707c0eeaf0f52cc41cf1d40331497d&query=${Lat},${Long}`;
  requests(
    { url: url, json: true },
    (
      error,
      {
        body: {
          current: { temperature, feelslike },
        },
      }
    ) => {
      callback(undefined, {
        temperature,
        feelslike,
        location,
      });
    }
  );
};
module.exports = {
  forecast,
};
